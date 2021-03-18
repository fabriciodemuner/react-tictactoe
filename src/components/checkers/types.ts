import {
  GameData,
  GameState,
  Result,
  Role,
  Score,
  Tiles,
} from "../common/types";
import { CheckersTilesPerRow } from "./constants";

type ExtraGameDataProps = Record<"pieces", CheckersPiece[]>;
export type CheckersGameData = GameData<
  CheckersPlayer,
  typeof CheckersTilesPerRow
> &
  ExtraGameDataProps;

type ExtraGameStateProps = Record<"pieces", CheckersPiece[]>;

export type CheckersGameState = GameState<
  CheckersPlayer,
  typeof CheckersTilesPerRow
> &
  ExtraGameStateProps;

export type CheckersPlayer = "W" | "B";
export type CheckersResult = Result<CheckersPlayer> | undefined;
export type CheckersRole = Role<CheckersPlayer>;
export type CheckersScore = Score<CheckersPlayer>;
export type CheckersTiles = Tiles<CheckersPlayer, typeof CheckersTilesPerRow>;

export type CheckersPiece = {
  id: number;
  role: CheckersPlayer;
  crown: boolean;
  pos: RowCol;
  alive: boolean;
};

type RowCol = { row: number; col: number };
