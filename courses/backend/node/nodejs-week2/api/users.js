import express, { request, response } from "express";
import knex from "../database.js";
import z from "zod";
const router = express.Router();

const createUserSchema = z.object({
  first_name: z.string().max(64).min(1),
  last_name: z.string().max(64).min(1),
  email: z.email(),
});

const updateUserSchema = createUserSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one update field must be provided",
  });

const userIdSchema = z.object({
  id: z.number().min(1),
});

router.get("/", async (request, response) => {
  try {
    const users = await knex("users").select("*");
    response.json(users);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to fetch users (500)" });
  }
});

router.get("/:id", async (request, response) => {
  const idResult = userIdSchema.safeParse({ id: Number(request.params.id) });

  if (!idResult.success) {
    return response.status(400).json({
      error: idResult.error,
    });
  }

  try {
    const user = await knex("users")
      .where("id", "=", request.params.id)
      .first();
    if (!user) {
      return response.status(404).json({ error: "User does not exist (404)" });
    }
    response.status(200).json(user);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to fetch user (500)" });
  }
});

router.put("/:id", async (request, response) => {
  const idResult = userIdSchema.safeParse({ id: Number(request.params.id) });
  const userResult = updateUserSchema.safeParse(request.body);

  if (!idResult.success) {
    return response.status(400).json({
      error: idResult.error,
    });
  }
  if (!userResult.success) {
    return response.status(400).json({
      error: userResult.error,
    });
  }

  console.log(userResult, idResult);

  try {
    const userToUpdate = await knex("users")
      .where("id", "=", request.params.id)
      .update(userResult.data);
    if (!userToUpdate) {
      return response.status(404).json({ error: "User does not exist (404)" });
    }
    response.status(201).json(userToUpdate);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to update user (500)" });
  }
});

router.post("/", async (request, response) => {
  const userResult = createUserSchema.safeParse(request.body);

  if (!userResult.success) {
    return response.status(400).json({
      error: userResult.error,
    });
  }

  try {
    const userToCreate = await knex("users").insert(userResult.data);
    response.status(201).json({ message: "User created successfully (201)" })
  } catch(error) {
    console.error(error);
    response.status(500).json({ error: "Failed to update user (500)" });
  }
});

export default router;
