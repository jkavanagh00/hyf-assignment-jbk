import express, { request, response } from "express";
import knex from "../database.js";
const router = express.Router();

// Returns all tags
router.get("/", async (request, response) => {
  try {
    const tags = await knex("tags").select("*");
    response.json(tags);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to fetch tags (500)" });
  }
});

// Adds a new tag to the database
router.post("/", async (request, response) => {
  const { title } = request.body;

  if (!title) {
    return response.status(400).json({ error: "Title is required (400)" });
  }

  try {
    const [id] = await knex("tags").insert({ title });
    response.status(201).json({ id });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to add tag (500)" });
  }
});

// Search tags by title
router.get("/search", async (request, response) => {
  const query = request.query.q?.toString().trim();

  if (!query) {
    return response.status(400).json({ error: "Query is required (400)" });
  }

  try {
    const tags = await knex("tags").whereRaw("LOWER(title) LIKE ?", [
      `%${query.toLowerCase()}%`,
    ]);

    if (tags.length < 1) {
      return response.status(404).json({ error: "Tag not found (404)" });
    }

    response.json(tags);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to search tags (500)" });
  }
});

// Returns a tag by id
router.get("/:id", async (request, response) => {
  try {
    const tag = await knex("tags").where({ id: request.params.id }).first();

    if (!tag) {
      return response.status(404).json({ error: "Tag not found (404)" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to get tag (500)" });
  }
});

// Updates a tag by id
router.put("/:id", async (request, response) => {
  const { title } = request.body;

  if (!title) {
    console.error(error);
    return response.status(400).json({ error: "Title is required (400)" });
  }

  try {
    const updated = await knex("tags")
      .where({ id: request.params.id })
      .update({ title });

    if (!updated) {
      return response.status(404).json({ error: "Tag not found (404)" });
    }

    response
      .status(200)
      .json({ message: "Snippet updated successfully (200)" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to update tag (500)" });
  }
});

// Deletes the snippet by id
router.delete("/:id", async (request, response) => {
  try {
    const deleted = await knex("tags")
      .where({ id: request.params.id })
      .delete();

    if (!deleted) {
      return response.status(404).json({ error: "Tag not found (404)" });
    }

    response.status(200).json({ message: "Tag deleted successfully (200)" });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "Failed to fetch tags for deletion (500)" });
  }
});

export default router;
