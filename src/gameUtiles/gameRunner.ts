import { readInt } from "../helpers"
import { DrawChecker, Game, WinningCheckers } from "../types"
import { printGrid } from "./gridPrinter"
import { applyInput } from "./moveApplyer"

/** #### gameRunner  
 * starts the game loop
 * @param game game instance
 * 
 * */

export const gameRunner = async (
    game: Game,
    winningCheckers: WinningCheckers,
    drawChecker: DrawChecker
) => {
    const { state } = game
    printGrid(state.grid)
    console.log(`You are playing Connect ${game.n}! The first player to get ${game.n} pieces of the same color\nvertically, horizontally, or diagonally wins.`)

    while (!drawChecker(game)) {
        try {

            const userInput: number = await readInt(`\nPlayer ${state.currPlayer}'s turn: `)// must be taken from user

            const index = applyInput(userInput, game);

            printGrid(state.grid)
            for (let checker of Object.values(winningCheckers)) {
                if (checker(index, game))
                    return state.currPlayer
            }

            state.currPlayer = ((state.currPlayer) % game.numberOfPlayers) + 1; /** this line helps to determinate the next player */

        } catch (err) {
            console.log(err.message)
        }
    }
    return 0;
}
