import { Player } from "../../enterprise/entities/player";

export interface PlayersRepository {
  create(user: Player): Promise<void>;
}
