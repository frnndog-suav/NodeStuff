import { InMemoryEditionsRepository } from "test/repositories/in-memory-editions-repository.js";
import { CreateEditionUseCase } from "./index.js";

let sut: CreateEditionUseCase;
let inMemoryRepository: InMemoryEditionsRepository;

describe("Create edition use case", () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryEditionsRepository();
    sut = new CreateEditionUseCase(inMemoryRepository);
  });

  it("should be able to create an edition", async () => {
    const userId = "user-123";
    const title = "New Edition";
    const description = "This is a new edition";

    const edition = await sut.execute({
      title,
      userId,
      description,
    });

    expect(edition.title).toEqual(title);
    expect(edition.creatorId).toEqual(userId);
    expect(edition.description).toEqual(description);
  });
});
