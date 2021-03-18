import { lego } from "@armathai/lego";
import { CELL_STATUS, Direction } from "../constatnts";
import { CellViewEvent } from "../events/view";
import { BoardConfig } from "../type";
import { CellModel } from "./cell-model";
import { ObservableModel } from "./observable-model";

export class BoardModel extends ObservableModel {
  private _cells: CellModel[][] = [];
  private _matrix: string[][] = [];
  private _direction: string;

  public constructor(private _config: BoardConfig) {
    super("BoardModel");
    // console.warn(this._config);
    lego.event.on(CellViewEvent.cellClick, this._updateCellStatus.bind(this));

    this.makeObservable();
  }

  public get cells(): CellModel[][] {
    return this._cells;
  }

  public initialize(): void {
    this._buildCells();
  }

  public _updateCellStatus(uuid: string, newStatus: string): void {
    this._cells.forEach((cells) => {
      cells.forEach((cell) => {
        if (cell.uuid === uuid) {
          cell.setStatus(newStatus);
        }
      });
    });
  }

  private _buildCells(): void {
    const { x, y } = this._config.size;
    const cells = [];

    for (let i = 0; i < y; i++) {
      cells[i] = [];

      for (let j = 0; j < x; j++) {
        cells[i][j] = new CellModel(i, j);
      }
    }

    this._cells = cells;
  }

  private _getMatrix(): string[][] {
    for (let i = 0; i < this._cells.length; i++) {
      this._matrix[i] = [];
      for (let j = 0; j < this._cells[i].length; j++) {
        const cell = this._cells[i][j];
        switch (cell.status) {
          case CELL_STATUS.way:
            this._matrix[i][j] = "1";
            break;
          case CELL_STATUS.unknow:
            this._matrix[i][j] = "0";
            break;
        }
      }
    }

    return this._matrix;
  }

  private _onKeyDown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case "ArrowLeft":
        this._direction = Direction.west;
        break;
      case "ArrowRight":
        this._direction = Direction.east;
        break;
      case "ArrowUp":
        this._direction = Direction.north;
        break;
      case "ArrowDown":
        this._direction = Direction.south;
        break;
    }
  };

  private getpath(): {};
}
