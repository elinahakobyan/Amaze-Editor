import EventEmitter = require("eventemitter3");

const emitter = new EventEmitter();

export function Emitter(): EventEmitter {
  return emitter;
}
export class GameViev {
  public constructor() {
    const emitter = Emitter();
    emitter.emit("arachin", 10);
  }

  private _buildBoard(): void {}
}
