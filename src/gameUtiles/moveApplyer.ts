import { Game, Index } from "../types";

/** #### applyInput 
 * @param x the selected column 
 * @param state GameState instance
 * @returns index of the last filled place
 * */
export const applyInput = (x: number, { state, width, hight }: Game): Index => {

    if (x >= width || state.lastIndex[x] == hight - 1 || x < 0)
        throw Error("Invalid Move!")

    const y = ++state.lastIndex[x]

    state.grid[x][y] = state.currPlayer;

    return { x, y }
}