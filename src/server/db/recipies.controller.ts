import { recipes } from './schema';
import { eq } from 'drizzle-orm';
import {  users } from '~/server/db/schema.mock';
import { db } from ".";

export async function main() {
    // this is use to create a post data
  //  await db.insert(posts).values({
  //       name: "kyle"
  //   })
    // this is use to find the first user inthe database
  // const recipes = await db.query.recipes.findMany({
  //   // columns: { name: true, id: true},
  //   orderBy: (table, func) => func.asc(table.name)
  // })

  //  to update= use update, set and where func also to delete use delete and where func
  const user = await db.update(users).set({
    age: 30
  }).where(eq(users.age, 29)) 
  
}

export async function getAllRecipies() {
return await db.query.recipes.findMany({
  // columns: { name: true, id: true},
  orderBy: (table, func) => func.asc(table.id)
})
}

