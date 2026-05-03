import express, { request, response } from "express";
import knex from "../database.js";
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const users = await knex("users").select("*");
    response.json(users);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to fetch users (500)" });
  }
});
