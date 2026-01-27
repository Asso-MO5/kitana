import { Schema, type } from "@colyseus/schema";
export class Player extends Schema {
  @type("number") x: number = 0;
  @type("number") y: number = 0;
  @type("boolean") flipX: boolean = false;
  @type("string") anim: string = "stand";
  @type("string") level: string = "museum";
  @type("number") lastActiveAt: number = 0;
}

