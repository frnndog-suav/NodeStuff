import { Edition } from "@/domain/game/enterprise/entities/edition.js";
import { EditionsRepository } from "../../repositories/editions-repository.js";

type TParams = {
  title: string;
  userId: string;
  description: string;
  imageUrl?: string | undefined;
};

export class CreateEditionUseCase {
  constructor(private repository: EditionsRepository) {}

  async execute({ userId, description, title, imageUrl }: TParams) {
    const edition = Edition.create({
      title,
      imageUrl,
      description,
      creatorId: userId,
    });

    const createdEdition = await this.repository.create(edition);

    return createdEdition;
  }
}
