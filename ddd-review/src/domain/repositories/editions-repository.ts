import { Edition } from "../entities/edition";

export interface EditionsRepository {
  create(edition: Edition): Promise<void>;
}
