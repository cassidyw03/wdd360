import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders"; 

// we can create collections that load from markdown files...this is an example of how to do that.
const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" })
});
//make sure to export the collection to have it be available to use.
export const collections = { posts };