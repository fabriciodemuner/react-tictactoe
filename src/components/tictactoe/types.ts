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
export enum JoinOption {
  Random = "random-room",
  Create = "create-room",
  Join = "join-room",
}
export type GameData = {
  tiles: Tiles;
  currentPlayer: Player;
  role: Role;
  waitingForOpponent: boolean;
  joinOption: JoinOption;
};
export type GameState = {
  score: Score;
  players: { O: string; X: string };
  currentPlayer: Player;
  gameOver: boolean;
  freeze: boolean;
  resetRequest: boolean;
  opponentSurrender: boolean;
  waitingForOpponent: boolean;
  result: Result;
  tiles: Tiles;
};
