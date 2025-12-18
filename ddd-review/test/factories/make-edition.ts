import {
  Edition,
  TEditionProps,
} from "@/domain/game/enterprise/entities/edition.js";
import { faker } from "@faker-js/faker";

export function makeEdition(override: Partial<TEditionProps> = {}) {
  const edition = Edition.create({
    title: faker.lorem.sentence({ min: 6, max: 15 }),
    creatorId: faker.string.uuid(),
    description: faker.lorem.text(),
    ...override,
  });

  return edition;
}
