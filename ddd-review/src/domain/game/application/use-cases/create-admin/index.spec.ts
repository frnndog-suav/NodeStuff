import { makeAdmin } from "test/factories/make-admin.js";
import { InMemoryAdminsRepository } from "test/repositories/in-memory-admins-repository.js";
import { CreateAdminUseCase } from "./index.js";

let sut: CreateAdminUseCase;
let inMemoryRepository: InMemoryAdminsRepository;

describe("Create edition use case", () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAdminsRepository();
    sut = new CreateAdminUseCase(inMemoryRepository);
  });

  it("should be able to create an admin", async () => {
    const email = "test@example.com";
    const username = "testuser";
    const imageUrl = "http://example.com/image.png";

    const testAdmin = makeAdmin({ email, username, imageUrl });

    const admin = await sut.execute(testAdmin);

    expect(admin.email).toEqual(email);
    expect(admin.username).toEqual(username);
  });
});
