import { Edition } from "@/domain/game/enterprise/entities/edition.js";
import { AdminsRepository } from "../../repositories/admin-repository.js";
import { EditionsRepository } from "../../repositories/editions-repository.js";

type TParams = {
  title: string;
  userId: string;
  description: string;
  imageUrl?: string | undefined;
};

export class CreateEditionUseCase {
  constructor(
    private editionRepository: EditionsRepository,
    private adminRepository: AdminsRepository
  ) {}

  async execute({ userId, description, title, imageUrl }: TParams) {
    const admin = await this.adminRepository.findById(userId);

    if (!admin) {
      throw new Error("Admin not found");
    }

    const edition = Edition.create({
      title,
      imageUrl,
      description,
      creatorId: userId,
    });

    const createdEdition = await this.editionRepository.create(edition);

    return createdEdition;
  }
}
