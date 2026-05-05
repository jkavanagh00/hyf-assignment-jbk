import express, { request, response } from "express";
import knex from "../database.js";
const router = express.Router();

// Returns all snippets
router.get("/", async (req, res) => {
  let snippets = knex("snippets").select(
    "snippets.id",
    "snippets.created_at",
    "snippets.user_id",
    "snippets.title",
    "snippets.contents",
    "snippets.is_private",
  );
  const snippetMap = {};

  if (req.query) {
    if ("sort" in req.query) {
      const allowedColumns = ["title", "contents", "created_at", "user_id"];
      const allowedDirections = ["ASC", "DESC"];
      const orderBy = req.query.sort.toString().split(" ");

      if (orderBy.length > 2) {
        return res.status(400).json({ error: "Too many ordering terms (400)" });
      } else if (orderBy.length === 1) {
        let column;
        [column] = orderBy;
        if (!allowedColumns.includes(column)) {
          return res.status(400).json({ error: "Invalid column (400)" });
        }
        snippets = snippets.orderBy(orderBy);
      } else if (orderBy.length === 2) {
        let column;
        let direction;
        [column, direction] = orderBy;
        if (
          !allowedColumns.includes(column) ||
          !allowedDirections.includes(direction)
        ) {
          return res
            .status(400)
            .json({ error: "Invalid column and/or direction (400)" });
        }
        snippets = snippets.orderBy(column, direction);
      }
    }

    if ("tag" in req.query) {
      const tag = req.query.tag.toString();
      snippets = await snippets
        .join("snippet_tags", "snippets.id", "=", "snippet_tags.snippet_id")
        .join("tags", "tags.id", "=", "snippet_tags.tag_id")
        .select(
          "snippets.id",
          "snippets.created_at",
          "snippets.user_id",
          "snippets.title",
          "snippets.contents",
          "snippets.is_private",
          "tags.id as tag_id",
          "tags.title as tag_title",
        );

      snippets.forEach((snippet) => {
        if (!(snippet.id in snippetMap)) {
          snippetMap[snippet.id] = {
            id: snippet.id,
            created_at: snippet.created_at,
            user_id: snippet.user_id,
            title: snippet.title,
            contents: snippet.contents,
            is_private: snippet.is_private,
            tags: [],
          };
        }
        if (snippet.tag_id && snippet.tag_title) {
          snippetMap[snippet.id].tags.push({
            tag_id: snippet.tag_id,
            tag_title: snippet.tag_title,
          });
        }
      });
      console.log(snippetMap);
      snippets = Object.values(await snippetMap).filter((snippet) =>
        snippet.tags.some((tag) => tag.tag_title === req.query.tag.toString()),
      );
      console.log(snippets);
    }

    if ("search" in req.query) {
      const search = `%${req.query.search.toString()}%`;
      snippets = snippets
        .whereILike("title", search)
        .orWhereILike("contents", search);
    }
  }
  try {
    let data;
    if (Array.isArray(snippets)) {
      data = snippets;
    } else {
      data = await snippets;
    }
    if (data.length < 1) {
      return res.status(404).json({ message: "Snippet not found (404)" });
    }
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
