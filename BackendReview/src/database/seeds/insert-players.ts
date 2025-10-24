import { knexExecuter } from "../knex.js";

export async function seed(): Promise<void> {
  await knexExecuter("players").insert([
    {
      name: "Tobias",
      email: "tobias@example.com",
      image_url: "https://example.com/maria.jpg",
    },
  ]);
}
