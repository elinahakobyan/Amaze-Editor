import { lego } from "@armathai/lego";
import { CELL_STATUS } from "../constatnts";
import { CellViewEvent, UIViewEvent } from "../events/view";
import { ActorView } from "./actor-view";

export class CellView {
  private _view: HTMLDivElement;
  private _uuid: string;
  private _row: number;
  private _col: number;
  private _status: string;
  private _actor: ActorView;

  public constructor(row: number, col: number, uuid: string) {
    this._uuid = uuid;
    this._row = row;
    this._col = col;
    this._status = CELL_STATUS.unknow;
    this._build();
    lego.event.on(UIViewEvent.gameBoardReddy, this._removeEvent, this);

    this._addEvent();
  }

  public get view(): HTMLDivElement {
    return this._view;
  }

  public get status(): string {
    return this._status;
  }

  public get uuid(): string {
    return this._uuid;
  }

  private _kayPlay(): void {
    //
  }

  private _addEvent(): void {
    this.view.addEventListener("pointerdown", this._selected);
  }

  private _removeEvent(): void {
    this.view.removeEventListener("pointerdown", this._selected);
  }

  private _selected = (): void => {
    switch (this._status) {
      case CELL_STATUS.way:
        this._status = CELL_STATUS.actor;
        this._actor = new ActorView(this._row, this._col);
        this._view.appendChild(this._actor.view);

        break;
      case CELL_STATUS.actor:
        this._status = CELL_STATUS.unknow;
        this._view.style.backgroundColor = "#BBADA0";
        this._view.style.borderRadius = "10px";
        break;
      case CELL_STATUS.unknow:
        this._status = CELL_STATUS.way;
        this._view.style.backgroundColor = "#30BBF0";
        this._view.style.borderRadius = "10px";
        break;
    }
    lego.event.emit(CellViewEvent.cellClick, this.uuid, this.status);
  };

  private _build(): void {
    this._view = document.createElement("div");
    this._view.className = "cell";
    // this._view.crea = "cell";
    this._view.style.backgroundColor = "#BBADA0";
  }
}
