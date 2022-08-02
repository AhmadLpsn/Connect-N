import { drawChecker, gameRunner, winningCheckers } from "./gameUtiles"
import init from "./init"

export const start = async () => {
    const game = await init()
    const result = await gameRunner(game, winningCheckers, drawChecker);
    console.log(result == 0 ? 'Game ends in a draw!' : `Player ${result} wins!`)
}

