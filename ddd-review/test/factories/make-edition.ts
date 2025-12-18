import {
    Edition,
    TEditionProps,
} from "@/domain/game/enterprise/entities/edition.js";

export function makeEdition(override: Partial<TEditionProps> = {}) {
  const edition = Edition.create({
    title: "Example Edition",
    creatorId: "creator-123",
    description: "This is an example edition.",
    ...override,
  });

  return edition;
}
