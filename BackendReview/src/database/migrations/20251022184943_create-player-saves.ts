import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("player_saves", (table) => {
    table.increments("id").primary(),
      table
        .integer("player_id")
        .references("id")
        .inTable("players")
        .notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()),
      table.timestamp("updated_at").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("player_saves");
}
