import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./src/database/database.db",
    },
    useNullAsDefault: true,
    migrations: {
      extension: "ts",
      directory: "./src/database/migrations",
    },
    seeds: {
      extension: "ts",
      directory: "./src/database/seeds",
    },
    pool: {
      afterCreate: (connection: any, done: any) => {
        connection.run("PRAGMA foreign_keys = ON");
        done();
      },
    },
  },
};

export default config;
