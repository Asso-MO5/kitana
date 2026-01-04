import { Room, Client } from "@colyseus/core";
import { PixelMuseumRoomState } from "./schema/pixel-museum.state";
import { Player } from "./schema/Player";
import { MapSchema } from "@colyseus/schema";

export class PixelMuseumRoom extends Room<PixelMuseumRoomState> {
  maxClients = 20;
  patchRate = 50;

  onCreate(options: any) {
    this.state = new PixelMuseumRoomState()

    if (options?.initialLevel)
      this.state.currentLevel = options.initialLevel;

    this.onMessage("playerMove", (client, message) => {
      const player = this.state.players.get(client.sessionId);
      if (player) {
        if (message.x !== undefined) player.x = message.x;
        if (message.y !== undefined) player.y = message.y;
        if (message.flipX !== undefined) player.flipX = message.flipX;
        if (message.anim !== undefined) player.anim = message.anim;
      }
    });

    this.onMessage("changeLevel", (client, message) => {
      const player = this.state.players.get(client.sessionId);
      if (player && message.level) {
        player.level = message.level;
      }
    });
  }

  onJoin(client: Client) {

    if (!this.state.players) {
      console.error("ERROR: this.state.players n'existe pas!");
      return;
    }

    if (!(this.state.players instanceof MapSchema)) {
      console.error("ERROR: this.state.players n'est pas un MapSchema!");
      console.error("Type:", typeof this.state.players, (this.state.players as any).constructor?.name);
      return;
    }

    const player = new Player();
    player.x = 810;
    player.y = 120;
    player.flipX = false;
    player.anim = "stand";
    player.level = this.state.currentLevel;

    this.state.players.set(client.sessionId, player);
  }

  onLeave(client: Client) {
    this.state.players.delete(client.sessionId);
  }

  onDispose() {
    // console.log("Room", this.roomId, "disposing...");
  }
}
