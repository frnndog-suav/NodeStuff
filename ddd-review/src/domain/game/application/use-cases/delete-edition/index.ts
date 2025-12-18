import { AdminsRepository } from "../../repositories/admin-repository.js";
import { EditionsRepository } from "../../repositories/editions-repository.js";

type TParams = {
  editionId: string;
  adminId: string;
};

export class DeleteEditionUseCase {
  constructor(
    private editionRepository: EditionsRepository,
    private adminRepository: AdminsRepository,
  ) {}

  async execute({ editionId, adminId }: TParams) {
    const admin = await this.adminRepository.findById(adminId);

    if (!admin) {
      throw new Error("Admin not found");
    }

    const edition = await this.editionRepository.findById(editionId);

    if (!edition) {
      throw new Error("Edition not found");
    }

    if (edition.creatorId !== adminId) {
      throw new Error("Only the creator can delete this edition");
    }

    await this.editionRepository.delete(editionId);
  }
}
