import { Schema, MapSchema, type } from "@colyseus/schema";
import { Player } from "./Player";

export class PixelMuseumRoomState extends Schema {
  @type({ map: Player }) players: MapSchema<Player> = new MapSchema<Player>();
  @type("string") currentLevel: string = "museum"; // Niveau actuel de la room (optionnel, pour synchroniser tous les joueurs)
}
