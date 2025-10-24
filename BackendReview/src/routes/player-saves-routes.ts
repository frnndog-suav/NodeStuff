import { Router } from "express";
import { knexExecuter } from "../database/knex.js";

export const playerSavesRoutes = Router();

playerSavesRoutes.post("/:id", async (request, response) => {
  const { id } = request.params;

  await knexExecuter("player_saves").insert({ player_id: id });

  return response.status(201).send();
});

playerSavesRoutes.get("/", async (request, response) => {
  const playerSaves = await knexExecuter("player_saves").select();

  return response.status(200).json(playerSaves);
});
