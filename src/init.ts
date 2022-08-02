import { readInt, readLine } from "./helpers";
import { Game, GameState } from "./types";

export default async (): Promise<Game> => {

    const n = await readInt("Enter N: "),
        numberOfPlayers = await readInt("Number of Players: "),
        width = await readInt("Number of columns: "),
        hight = await readInt("Number of rows: ");


    const grid = new Array<Array<number>>()
    for (let i = 0; i < width; i++) {
        grid.push(new Array(hight).fill(0))
    }

    const gameState: GameState = {
        grid,
        currPlayer: 1,
        lastIndex: new Array<number>(width).fill(-1),
    }

    return {
        n, width, hight,
        numberOfPlayers,
        state: gameState
    }
}