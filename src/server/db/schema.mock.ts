// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  real,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `${name}`);
export const userRole = pgEnum("userRole", ["ADMIN","BASIC"]);



export const posts = createTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);

export const users = createTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", {length: 255}).notNull(),
    age: integer("age").notNull(),
    email: varchar("email", {length: 255}).notNull(),
    role: userRole("userRole").default("BASIC").notNull()
  },
  // a constraint for unique values
  table => {
    return {
      eamilIndex: uniqueIndex("emailIndex").on(table.email)
    }
  }
)


export const userPreferences = createTable(
  "userPreferences",
  {
    id: serial("id").primaryKey(),
  emailUpdates: boolean("emailUpdates").notNull().default(false),
  // foriegn key setup btwn two tables(userprefernce and users)
  userId: serial("userID").references(() => users.id).notNull() 
  }
   
)

// one to many relationship i.e the user.id is to many authorid and userid
export const post = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", {length: 255}).notNull(),
    averageRating: real("averageRating").notNull().default(0) ,
    createdAt: timestamp("created_At").defaultNow().notNull(),
    updatedAt: timestamp("updated_At").defaultNow().notNull(), 
    authorId: serial("author_Id").references(() => users.id).notNull()
  }
)

// many to many realtionship i.e a post can have many categories and a category can have many post
export const category = createTable(
  "category",
  {
     id: serial("id").primaryKey(),
  name: varchar("name", {length: 255}).notNull()
  } 
)

export const postCategory = createTable(
  "postCategory",
  {
    postId: serial("post_Id").references(() => post.id),
  categoryId: serial("category_Id").references(() => category.id) .notNull()
  },
  table => {
    return {
       pk: primaryKey({columns: [table.postId, table.categoryId]})
    }
  } 
)

// RELATIONS

export const userRelations = relations(users,({one, many}) => {
   return {
     preference: one(userPreferences),
     posts: many(post)
   }
}
) 

export const userPreferencesRelations = relations(userPreferences,({one}) => {
  return {
    user: one(users, {
      fields: [userPreferences.userId],
      references: [users.id]
    })
  }
}
)

export const postRelations = relations(post,({one, many}) => {
  return {
    // if we are doing the one side of the table we will specify the field and reference
     author: one(users, {
       fields: [post.authorId],
       references: [users.id]
     }),
     postCategory: many(postCategory)
  }
}
)

export const categoryRelations = relations(category,({ many }) => {
  return {
     posts: many (post)
  }
}
)

export const postCategoryRelations = relations(postCategory,({one}) => {
  return {
     post: one(post, {
       fields: [postCategory.postId],
       references: [post.id]
     }),
     category: one(category, {
      fields: [postCategory.categoryId],
      references: [category.id]
    }),
  }
}
)