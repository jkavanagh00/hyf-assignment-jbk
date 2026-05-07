import express, { request, response } from "express";
import knex from "../database.js";
import z from "zod";
const router = express.Router();

const createSnippetSchema = z.object({
  user_id: z.number().min(1),
  title: z.string().min(3),
  contents: z.string().min(3),
  is_private: z.union([z.literal(0), z.literal(1)]),
});

const updateSnippetSchema = createSnippetSchema.partial().refine(
  (data) => {
    return Object.keys(data).length > 0;
  },
  { message: "At least one update field must be provided" },
);

const snippetIdSchema = z.object({
  id: z.number().min(1),
});

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

router.post("/", async (request, response) => {
  const newSnippetData = createSnippetSchema.safeParse(request.body);

  if (!newSnippetData.success) {
    return response.status(400).json({ error: newSnippetData.error });
  }

  const { user_id, title, contents } = request.body;
  const is_private = request.body.is_private;

  try {
    const snippetToInsert = {
      user_id,
      title,
      contents,
      is_private,
    };

    const [id] = await knex("snippets").insert(snippetToInsert);
    response.status(201).json({ "created snippet id": id });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to create snippet (500)" });
  }
});

router.get("/:id", async (request, response) => {
  const snippetId = snippetIdSchema.safeParse({
    id: Number(request.params.id),
  });

  if (!snippetId.success) {
    return response.status(400).json({ error: snippetId.error });
  }

  try {
    const snippet = await knex("snippets")
      .where({ id: request.params.id })
      .first();

    if (!snippet) {
      return response.status(404).json({ error: "Snippet not found (404)" });
    }

    response.status(200).json(snippet);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to fetch snippets (500)" });
  }
});

router.put("/:id", async (request, response) => {
  const snippetId = snippetIdSchema.safeParse({
    id: Number(request.params.id),
  });
  const snippetUpdate = updateSnippetSchema.safeParse(request.body);
  console.log(await snippetUpdate.success, request.body);
  if (!snippetId.success) {
    return response.status(400).json({ error: snippetId.error });
  }

  if (!snippetUpdate.success) {
    return response.status(400).json({ error: snippetUpdate.error });
  }

  try {
    const updated = await knex("snippets")
      .where({ id: request.params.id })
      .update(snippetUpdate.data);

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

router.delete("/:id", async (request, response) => {
  const snippetId = snippetIdSchema.safeParse({
    id: Number(request.params.id),
  });

  if (!snippetId.success) {
    return response.status(400).json({ error: snippetId.error });
  }

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
