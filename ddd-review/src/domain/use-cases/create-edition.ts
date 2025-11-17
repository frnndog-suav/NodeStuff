import { Edition } from "../entities/edition";
import { EditionsRepository } from "../repositories/editions-repository";

type TParams = {
  title: string;
  userId: string;
  description: string;
};

export class CreateEditionUseCase {
  constructor(private repository: EditionsRepository) {}

  async execute({ userId, description, title }: TParams) {
    const edition = new Edition({
      title,
      description,
      creatorId: userId,
    });

    await this.repository.create(edition);

    return edition;
  }
}
