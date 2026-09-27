import { EventEmitter } from "eventemitter3";

export function eventSystem(): EventEmitter {
  const emitter = new EventEmitter();
  setTimeout(() => {
    emitter.emit("emitter", true);
  }, 3000);
  return emitter;
}
