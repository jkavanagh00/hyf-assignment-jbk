import express, { request, response } from "express";
import knex from "../database.js";
const router = express.Router();

// Returns all snippets
router.get("/", async (req, res) => {
  let query = knex("snippets").select("*");

  if ("sort" in req.query) {
    const orderBy = req.query.sort.toString();
    if (orderBy.length > 0) {
      query = query.orderByRaw(orderBy); // Vulnerable!
    }
  }

  console.log("SQL", query.toSQL().sql);

  try {
    const data = await query;
    res.json({ data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Adds a new snippet to the database
router.post("/", async (request, response) => {
  const { title, contents } = request.body;
  const is_private = request.body.is_private;
  const rawUserId = request.body.user_id;

  if (rawUserId == null || !title || !contents) {
    return response.status(400).json({
      error: "user_id, title, and contents are required (400)",
    });
  }

  const user_id = Number(rawUserId);
  if (!Number.isInteger(user_id) || user_id < 1) {
    return response
      .status(400)
      .json({ error: "user_id must be a positive integer (400)" });
  }

  try {
    const snippetToInsert = {
      user_id: user_id,
      title,
      contents,
    };

    if (is_private !== undefined) {
      snippetToInsert.is_private = is_private ? 1 : 0;
    }

    const [id] = await knex("snippets").insert(snippetToInsert);
    response.status(201).json({ id });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to create snippet (500)" });
  }
});

// Search snippets by title
router.get("/search", async (request, response) => {
  const query = request.query.q?.toString().trim();

  if (!query) {
    return response.status(400).json({ error: "Query is required (400)" });
  }

  try {
    const snippets = await knex("snippets").whereRaw(
      "LOWER(title) LIKE ? OR LOWER(contents) LIKE ?",
      [`%${query.toLowerCase()}%`, `%${query.toLowerCase()}%`],
    );

    if (snippets.length < 1) {
      return response.status(404).json({ error: "Snippet not found (404)" });
    }

    response.status(201).json(snippets);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to search snippets (500)" });
  }
});

// Returns the snippet by id
router.get("/:id", async (request, response) => {
  try {
    const snippet = await knex("snippets")
      .where({ id: request.params.id })
      .first();

    if (!snippet) {
      return response.status(404).json({ error: "Snippet not found (404)" });
    }

    response.json(snippet);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to fetch snippets (500)" });
  }
});

// Updates the snippet by id
router.put("/:id", async (request, response) => {
  const { title, contents } = request.body;

  if (!title || !contents) {
    return response
      .status(400)
      .json({ error: "Title and contents are required (400)" });
  }

  try {
    const updated = await knex("snippets")
      .where({ id: request.params.id })
      .update({ title, contents });

    if (!updated) {
      return response.status(404).json({ error: "Snippet not found (404)" });
    }

    response
      .status(200)
      .json({ message: "Snippet updated successfully (200)" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to update snippet (500)" });
  }
});

// Deletes the snippet by id
router.delete("/:id", async (request, response) => {
  try {
    const deleted = await knex("snippets")
      .where({ id: request.params.id })
      .delete();

    if (!deleted) {
      return response.status(404).json({ error: "Snippet not found (404)" });
    }

    response
      .status(200)
      .json({ message: "Snippet deleted successfully (200)" });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "Failed to fetch snippets for deletion (500)" });
  }
});

export default router;
