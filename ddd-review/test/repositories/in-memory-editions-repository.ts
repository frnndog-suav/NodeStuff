import { EditionsRepository } from "@/domain/game/application/repositories/editions-repository.js";
import { Edition } from "@/domain/game/enterprise/entities/edition.js";

export class InMemoryEditionsRepository implements EditionsRepository {
  public items: Edition[] = [];

  async create(edition: Edition): Promise<void> {
    this.items.push(edition);
  }
}
