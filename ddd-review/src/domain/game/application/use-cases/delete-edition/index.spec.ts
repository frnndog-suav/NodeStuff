import { makeAdmin } from "test/factories/make-admin.js";
import { makeEdition } from "test/factories/make-edition.js";
import { InMemoryAdminsRepository } from "test/repositories/in-memory-admins-repository.js";
import { InMemoryEditionsRepository } from "test/repositories/in-memory-editions-repository.js";
import { DeleteEditionUseCase } from "./index.js";

let sut: DeleteEditionUseCase;
let inMemoryEditionsRepository: InMemoryEditionsRepository;
let inMemoryAdminsRepository: InMemoryAdminsRepository;

describe("Delete edition use case", () => {
  beforeEach(() => {
    inMemoryEditionsRepository = new InMemoryEditionsRepository();
    inMemoryAdminsRepository = new InMemoryAdminsRepository();

    sut = new DeleteEditionUseCase(
      inMemoryEditionsRepository,
      inMemoryAdminsRepository,
    );
  });

  it("should be able to delete an edition", async () => {
    const admin = makeAdmin();

    await inMemoryAdminsRepository.create(admin);

    const testEdition = makeEdition({ creatorId: admin.id });

    await inMemoryEditionsRepository.create(testEdition);

    await sut.execute({
      adminId: admin.id,
      editionId: testEdition.id,
    });

    expect(inMemoryEditionsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete and edition from another user", async () => {
    const admin = makeAdmin();

    await inMemoryAdminsRepository.create(admin);

    const testEdition = makeEdition({ creatorId: admin.id });

    await inMemoryEditionsRepository.create(testEdition);

    await expect(async () => {
      await sut.execute({
        adminId: "another-admin-id",
        editionId: testEdition.id,
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
