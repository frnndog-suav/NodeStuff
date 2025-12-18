import { EditionsRepository } from "@/domain/game/application/repositories/editions-repository.js";
import { Edition } from "@/domain/game/enterprise/entities/edition.js";

export class InMemoryEditionsRepository implements EditionsRepository {
  public items: Edition[] = [];

  async create(edition: Edition): Promise<Edition> {
    this.items.push(edition);
    return edition;
  }

  async findById(editionId: string): Promise<Edition | null> {
    const edition = this.items.find((item) => item.id === editionId);
    return edition || null;
  }

  async delete(editionId: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== editionId);
  }
}
