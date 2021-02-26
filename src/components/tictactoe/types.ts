import {
  GameData,
  GameState,
  Result,
  Role,
  Score,
  Tiles,
} from "../common/types";

type TTTNumOfTiles = 9;
export type TTTGameData = GameData<TTTPlayer, TTTNumOfTiles>;
export type TTTGameState = GameState<TTTPlayer, TTTNumOfTiles>;
export type TTTPlayer = "O" | "X";
export type TTTResult = Result<TTTPlayer> | undefined;
export type TTTRole = Role<TTTPlayer>;
export type TTTScore = Score<TTTPlayer>;
export type TTTTiles = Tiles<TTTPlayer, TTTNumOfTiles>;
