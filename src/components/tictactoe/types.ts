export type Player = "O" | "X";
export type Result = Player | "D";
export type Tiles = {
  1: Player | undefined;
  2: Player | undefined;
  3: Player | undefined;
  4: Player | undefined;
  5: Player | undefined;
  6: Player | undefined;
  7: Player | undefined;
  8: Player | undefined;
  9: Player | undefined;
};
export type Score = {
  O: number;
  X: number;
  D: number;
};
export type Role = Player | "S";
export type GameData = {
  tiles: Tiles;
  currentPlayer: Player;
  role: Role;
};
export type GameState = {
  score: Score;
  players: { O: string; X: string };
  currentPlayer: Player;
  gameOver: boolean;
  freeze: boolean;
  resetRequest: boolean;
  opponentSurrender: boolean;
  result: Result;
  tiles: {
    1: Player;
    2: Player;
    3: Player;
    4: Player;
    5: Player;
    6: Player;
    7: Player;
    8: Player;
    9: Player;
  };
};
