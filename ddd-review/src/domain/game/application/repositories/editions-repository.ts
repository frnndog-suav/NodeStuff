import { Edition } from "../../enterprise/entities/edition.js";

export interface EditionsRepository {
  create(edition: Edition): Promise<Edition>;
  findById(editionId: string): Promise<Edition | null>;
  delete(editionId: string): Promise<void>;
}
