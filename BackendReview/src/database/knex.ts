import knex from "knex";
import config from "../../knexfile.js";

export const knexExecuter = knex(config["development"]!);
