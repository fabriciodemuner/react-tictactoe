import {
  GameData,
  GameState,
  Result,
  Role,
  Score,
  Tiles,
} from "../common/types";

export const CheckersTilesPerRow = 8;
export const CheckersRows = 8;
export type CheckersGameData = GameData<
  CheckersPlayer,
  typeof CheckersTilesPerRow
>;
export type CheckersGameState = GameState<
  CheckersPlayer,
  typeof CheckersTilesPerRow
>;
export type CheckersPlayer = "W" | "B";
export type CheckersResult = Result<CheckersPlayer> | undefined;
export type CheckersRole = Role<CheckersPlayer>;
export type CheckersScore = Score<CheckersPlayer>;
export type CheckersTiles = Tiles<CheckersPlayer, typeof CheckersTilesPerRow>;
