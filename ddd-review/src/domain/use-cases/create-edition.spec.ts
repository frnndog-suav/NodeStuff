import { expect, test } from "vitest";
import { CreateEditionUseCase } from "./create-edition";

test("create an edition", () => {
  const userId = "user-123";
  const title = "New Edition";
  const description = "This is a new edition";

  const sut = new CreateEditionUseCase();

  const edition = sut.execute({
    title,
    userId,
    description,
  });

  expect(edition.title).toEqual(title);
  expect(edition.createdById).toEqual(userId);
  expect(edition.description).toEqual(description);
});
