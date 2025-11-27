import { Admin } from "@/domain/game/enterprise/entities/admin.js";
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
      inMemoryAdminsRepository
    );
  });

  it("should be able to create an edition", async () => {
    const admin = Admin.create({
      email: "admin@example.com",
      username: "adminuser",
    });

    await inMemoryAdminsRepository.create(admin);

    const userId = admin.id;
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
