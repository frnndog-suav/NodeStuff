import { Edition } from "../../enterprise/entities/edition.js";

export interface EditionsRepository {
  create(edition: Edition): Promise<Edition>;
}
