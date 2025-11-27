import { Edition } from "../../enterprise/entities/edition";

export interface EditionsRepository {
  create(edition: Edition): Promise<void>;
}
