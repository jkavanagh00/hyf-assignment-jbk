import express, { request, response } from "express";
import knex from "./database.js";

const app = express();
app.use(express.json());

import snippetsRouter from "./api/snippets.js";
app.use("/api/snippets", snippetsRouter);
import tagsRouter from "./api/tags.js";
app.use("/api/tags", tagsRouter);
import usersRouter from "./api/users.js";
app.use("/api/users", usersRouter);

const port = process.env.PORT || 3000;
const textFilePath =
  "C:/Users/jkava/Documents/coding/hack-your-future/hyf-assignment-jbk/courses/backend/node/nodejs-week1/test.txt";

app.get("/api/search", async (request, response) => {
  const query = request.query.q?.toString().trim();

  if (!query) {
    return response.status(400).json({ error: "Query is required (400)" });
  }

  try {
    const pattern = `%${query.toLowerCase()}%`;
    const [tags, snippets] = await Promise.all([
      knex("tags").whereRaw("LOWER(title) LIKE ?", pattern),
      knex("snippets").whereRaw(
        "LOWER(title) LIKE ? OR LOWER(contents) LIKE ?",
        [pattern, pattern],
      ),
    ]);

    if (tags.length === 0 && snippets.length === 0) {
      return response.status(404).json({ error: "Content not found (404)" });
    }
    response.status(201).json(snippets.concat(tags)); 
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to search content (500)" });
  }
});

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Listening on port ${port}`);
  }
});
