import { Edition } from "@/domain/game/enterprise/entities/edition.js";
import { EditionsRepository } from "../../repositories/editions-repository.js";
import { CreateEditionUseCase } from "./index.js";

const fakeEditionsRepository: EditionsRepository = {
  async create(edition: Edition): Promise<void> {
    return;
  },
};

test("create an edition", async () => {
  const userId = "user-123";
  const title = "New Edition";
  const description = "This is a new edition";

  const sut = new CreateEditionUseCase(fakeEditionsRepository);

  const edition = await sut.execute({
    title,
    userId,
    description,
  });

  expect(edition.title).toEqual(title);
  expect(edition.creatorId).toEqual(userId);
  expect(edition.description).toEqual(description);
});
