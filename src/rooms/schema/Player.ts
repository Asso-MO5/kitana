import { Schema, type } from "@colyseus/schema";

// Schéma pour l'état d'un joueur
export class Player extends Schema {
  @type("number") x: number = 0;
  @type("number") y: number = 0;
  @type("boolean") flipX: boolean = false;
  @type("string") anim: string = "stand";
  @type("string") level: string = "museum"; // Niveau actuel du joueur
}

