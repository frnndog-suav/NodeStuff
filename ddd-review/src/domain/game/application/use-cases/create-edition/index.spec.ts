import { makeAdmin } from "test/factories/make-admin.js";
import { makeEdition } from "test/factories/make-edition.js";
import { InMemoryAdminsRepository } from "test/repositories/in-memory-admins-repository.js";
import { InMemoryEditionsRepository } from "test/repositories/in-memory-editions-repository.js";
import { CreateEditionUseCase } from "./index.js";

let sut: CreateEditionUseCase;
let inMemoryEditionsRepository: InMemoryEditionsRepository;
let inMemoryAdminsRepository: InMemoryAdminsRepository;

describe("Create edition use case", () => {
  beforeEach(() => {
    inMemoryEditionsRepository = new InMemoryEditionsRepository();
    inMemoryAdminsRepository = new InMemoryAdminsRepository();

    sut = new CreateEditionUseCase(
      inMemoryEditionsRepository,
      inMemoryAdminsRepository,
    );
  });

  it("should be able to create an edition", async () => {
    const admin = makeAdmin();

    await inMemoryAdminsRepository.create(admin);

    const userId = admin.id;
    const title = "New Edition";
    const description = "This is a new edition";

    const testEdition = makeEdition({ title, creatorId: userId, description });

    const edition = await sut.execute(testEdition);

    expect(edition.title).toEqual(title);
    expect(edition.creatorId).toEqual(userId);
    expect(edition.description).toEqual(description);
  });
});
