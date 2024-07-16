import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";


export const createTable = pgTableCreator((name) => `${name}`);
export const category = pgEnum("category", ["BREAKFAST","LUNCH", "DINNER"]);


export const recipes = createTable(
    "recipes",
   {
    id: serial("id").primaryKey(),
    title: varchar("title", {length: 255}).notNull(),
    desc: text("description"),
    category: category("category"),
    prepTime: integer("prep_time").notNull(),
    cookTime: integer("cook_time").notNull(),
    totalTime: integer("total_time").notNull(),
    servings: integer("servings"),
    dateAdded: timestamp("date_added").defaultNow().notNull(),
    dateModified:  timestamp("date_modified").defaultNow().notNull(),
    notes: text("notes")
   }
     
  )

  export const ingredients = createTable(
    "ingredients",
   {
    id: serial("id").primaryKey(),
    name: varchar("name", {length: 255}).notNull(),
    type: varchar("type", {length: 100}).notNull(),
    notes: text("notes")
   }
     
  )


  export const recipeIngredients = createTable(
    "recipeIngredients",
   {
    id: serial("id").primaryKey(),
    recipeId: integer("recipe_id").references(() => recipes.id).notNull(),
    ingredientId: integer("ingredient_id").references(() => recipes.id).notNull(),
    quantity: integer("quantity"),
    unit: varchar("unit", {length: 50}),
    notes: text("notes")
   }   
  )

  export const instructions = createTable(
    "instructions",
   {
    id: serial("id").primaryKey(),
    recipeId: integer("recipe_id").references(() => recipes.id).notNull(),
    stepNumber: integer("step_number"),
    description: text("description"),
    notes:text("notes").notNull()
   }   
  )

  export const categories = createTable(
    "categories",
   {
    id: serial("id").primaryKey(),
    name: varchar("name", {length: 100}).notNull(),
    description: text("description")
   }   
  )

  export const tags = createTable(
    "tags",
   {
    id: serial("id").primaryKey(),
    name: varchar("name", {length: 100}).notNull()
   }   
  )

  export const recipeTags = createTable(
    "recipeTags",
   {
    id: serial("id").primaryKey(),
    recipeId: integer("recipe_id").references(() => recipes.id),
    tagId: integer("tag_id").references(() => tags.id)
   }   
  )


 export const fourToSixBabyRecipe = createTable(
    "fourToSixBabyRecipe",
   {
    id: serial("id").primaryKey(),
    fruits: varchar("name", {length: 255}).notNull(),
    veggies: varchar("name", {length: 255}).notNull(),
    extras: varchar("name", {length: 255}).notNull(),
   }
     
  )

  export const sixToEighteenBabyRecipe = createTable(
    "sixToEighteenBabyRecipe",
   {
    id: serial("id").primaryKey(),
    fruits: varchar("name", {length: 255}).notNull() ,
    veggies: varchar("name", {length: 255}).notNull(),
    extras: varchar("name", {length: 255}).notNull(),
   }
     
  )


  export const babyRecipe = createTable(
    "babyRecipe",
    {
     fourToSixBabyRecipeId: serial("fourToSixBabyRecipe_id").references(() => fourToSixBabyRecipe.id),
     sixToEighteenBabyRecipeId: serial("sixToEighteenBabyRecipe_id").references(() => sixToEighteenBabyRecipe.id).notNull()
    },
    table => {
      return {
         pk: primaryKey({columns: [table.fourToSixBabyRecipeId, table.sixToEighteenBabyRecipeId]})
      }
    } 
  )


//   RELATIONS

export const recipeRelations = relations(recipes,({ many }) => {
    return {
      tag: many(recipeTags),
      ingredient: many(recipeIngredients),
    //   category: many(categories),
      instruction: many(instructions)
    }
 }
 )

 export const instructionsRelations = relations(instructions,({one}) => {
    return {
      recipe: one(recipes, {
        fields: [instructions.recipeId],
        references: [recipes.id]
      })
    }
  }
  )

 export const recipeTagsRelations = relations(recipeTags,({one}) => {
    return {
       recipe: one(recipes, {
         fields: [recipeTags.recipeId],
         references: [recipes.id]
       }),
       tag: one(tags, {
        fields: [recipeTags.tagId],
        references: [tags.id]
      }),
    }
  }
  )

 export const recipeIngredientsRelations = relations(recipeIngredients,({one}) => {
    return {
       recipe: one(recipes, {
         fields: [recipeIngredients.recipeId],
         references: [recipes.id]
       }),
       ingredient: one(ingredients, {
        fields: [recipeIngredients.ingredientId],
        references: [ingredients.id]
      }),
    }
  }
  )
