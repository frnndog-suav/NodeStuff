import { Edition } from "../entities/edition";

type TParams = {
  title: string;
  userId: string;
  description: string;
};

export class CreateEditionUseCase {
  execute({ userId, description, title }: TParams) {
    const edition = new Edition({
      title,
      description,
      createdById: userId,
    });

    return edition;
  }
}
