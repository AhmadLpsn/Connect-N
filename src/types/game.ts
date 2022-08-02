import { type } from "os";
import { Index } from "./commen";

/** #### Game
 * Game required info
 * 
 * @property n : the requird number to be filled in the row
 * @property currPlayer : index of the current player, starts with 1
 * @property numberOfPlayers : number of player in this game, default is 2
 * @property width : number of game-grid columns
 * @property hight : number of game-grid rows
 * @property grid : 2D-grid of the game
 * @property lastIndex : stores index of the last filled row in each column
 * */
export interface Game {
    readonly n: number;
    readonly numberOfPlayers: number;
    readonly width: number;
    readonly hight: number;
    readonly state: GameState
}

/** #### Game
 * running game state
 * 
 * @property currPlayer : index of the current player, starts with 1
 * @property numberOfPlayers : number of player in this game, default is 2
 * @property grid : 2D-grid of the game
 * @property lastIndex : stores index of the last filled row in each column
 */
export interface GameState {
    currPlayer?: number;
    lastIndex: number[];
    grid: number[][]
}

/** #### GameChecker 
* @param index position of the last filled place in the 2D game-grid
* @param game game instance
* @returns True if their are N in the checked row
* */
export type GameChecker = (index: Index, game: Game) => boolean

export type WinningCheckers = { [key: string]: GameChecker }

export type DrawChecker = (game: Game) => boolean