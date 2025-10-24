import { Router } from "express";
import { knexExecuter } from "../database/knex.js";

export const playersRoutes = Router();

playersRoutes.post("/", async (request, response) => {
  const { name, email } = request.body;

  //   await knexExecuter("players").insert({ name, email });
  await knexExecuter.raw(`INSERT INTO players (name, email) VALUES (?, ?)`, [
    name,
    email,
  ]);

  response.send("Criando um jogador");
});

playersRoutes.get("/", async (request, response) => {
  //   const players = await knexExecuter.raw(`SELECT * FROM players`);
  const players = await knexExecuter("players").select().orderBy("name", "asc");
  response.send(players);
});

playersRoutes.put("/:id", async (request, response) => {
  const { id } = request.params;
  const { name, email } = request.body;

  await knexExecuter("players").where({ id }).update({ name, email });

  return response.json();
});

playersRoutes.delete("/:id", async (request, response) => {
  const { id } = request.params;

  await knexExecuter("players").where({ id }).delete();

  return response.json();
});
