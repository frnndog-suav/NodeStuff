import { Player } from "../../enterprise/entities/player.js";

export interface PlayersRepository {
  create(user: Player): Promise<void>;
}
