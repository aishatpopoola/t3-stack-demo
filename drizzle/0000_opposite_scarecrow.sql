DO $$ BEGIN
 CREATE TYPE "public"."category" AS ENUM('BREAKFAST', 'LUNCH', 'DINNER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "babyRecipe" (
	"fourToSixBabyRecipe_id" serial NOT NULL,
	"sixToEighteenBabyRecipe_id" serial NOT NULL,
	CONSTRAINT "babyRecipe_fourToSixBabyRecipe_id_sixToEighteenBabyRecipe_id_pk" PRIMARY KEY("fourToSixBabyRecipe_id","sixToEighteenBabyRecipe_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fourToSixBabyRecipe" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ingredients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" varchar(100) NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "instructions" (
	"id" serial PRIMARY KEY NOT NULL,
	"recipe_id" integer NOT NULL,
	"step_number" integer,
	"description" text,
	"notes" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipeIngredients" (
	"id" serial PRIMARY KEY NOT NULL,
	"recipe_id" integer NOT NULL,
	"ingredient_id" integer NOT NULL,
	"quantity" integer,
	"unit" varchar(50),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipeTags" (
	"id" serial PRIMARY KEY NOT NULL,
	"recipe_id" integer,
	"tag_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"category" "category",
	"prep_time" integer NOT NULL,
	"cook_time" integer NOT NULL,
	"total_time" integer NOT NULL,
	"servings" integer,
	"date_added" timestamp DEFAULT now() NOT NULL,
	"date_modified" timestamp DEFAULT now() NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sixToEighteenBabyRecipe" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "babyRecipe" ADD CONSTRAINT "babyRecipe_fourToSixBabyRecipe_id_fourToSixBabyRecipe_id_fk" FOREIGN KEY ("fourToSixBabyRecipe_id") REFERENCES "public"."fourToSixBabyRecipe"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "babyRecipe" ADD CONSTRAINT "babyRecipe_sixToEighteenBabyRecipe_id_sixToEighteenBabyRecipe_id_fk" FOREIGN KEY ("sixToEighteenBabyRecipe_id") REFERENCES "public"."sixToEighteenBabyRecipe"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "instructions" ADD CONSTRAINT "instructions_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipeIngredients" ADD CONSTRAINT "recipeIngredients_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipeIngredients" ADD CONSTRAINT "recipeIngredients_ingredient_id_recipes_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipeTags" ADD CONSTRAINT "recipeTags_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipeTags" ADD CONSTRAINT "recipeTags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
