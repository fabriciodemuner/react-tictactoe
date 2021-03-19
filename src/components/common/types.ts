import { JoinOption } from "./join-option/SelectJoinOption";

export type Result<T> = T | "D";
export type Tiles<
  T,
  N extends number,
  S extends number[] = [0],
  I extends number = 0,
  R extends Record<number, T | undefined> = I extends N
    ? never
    : Record<S["length"], T | undefined>
> = I extends N
  ? R
  : Tiles<T, N, [0, ...S], S["length"], R & Record<S["length"], T | undefined>>;
export type Score<T extends string> = Record<T | "D", number>;
export type Role<T> = T | "S";
export type GameData<T, N extends number> = {
  tiles: Tiles<T, N>;
  currentPlayer: T;
  role: Role<T>;
  waitingForOpponent: boolean;
  joinOption: JoinOption;
};
export type GameState<T extends string, N extends number> = {
  score: Score<T>;
  players: { O: string; X: string };
  currentPlayer: T;
  gameOver: boolean;
  freeze: boolean;
  resetRequested: boolean;
  opponentSurrender: boolean;
  waitingForOpponent: boolean;
  result: Result<T>;
  tiles: Tiles<T, N>;
};
