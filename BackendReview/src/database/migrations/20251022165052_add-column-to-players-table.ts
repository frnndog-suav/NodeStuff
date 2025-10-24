import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("players", (table) => {
    table.text("image_url").nullable().after("name");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("players", (table) => {
    table.dropColumn("image_url");
  });
}
