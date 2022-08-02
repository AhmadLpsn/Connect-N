import { Game, WinningCheckers } from "../types";

/**
 * each winning Checker trys to count number of sequential indexes that filled with the same target sign
 * which will the number of the current player 
 * in try to find N sequential indexes with that target
 * starting form the last filled index of the gird
 */

export const winningCheckers: WinningCheckers = {}

winningCheckers['MainCross'] = ({ x, y }, game) => {

    let i = 1, count = 1;
    let { state: { grid }, n } = game;

    let target = grid[x][y];

    while (x + i < grid.length && y - i >= 0 && grid[x + i][y - i] == target) {
        count++;
        i++;
    }
    i = 1;
    while (y + i < grid[0].length && x - i >= 0 && grid[x - i][y + i] == target) {
        count++;
        i++;
    }

    return count == n;
}

winningCheckers['SecondCross'] = ({ x, y }, game) => {

    let i = 1, count = 1;
    let { state: { grid }, n } = game;

    let target = grid[x][y];

    while (x + i < grid.length && y + i < grid[0].length && grid[x + i][y + i] == target) {
        count++;
        i++;
    }
    i = 1;
    while (x - i >= 0 && y - i >= 0 && grid[x - i][y - i] == target) {
        count++;
        i++;
    }

    return count == n;
}

winningCheckers['Vertical'] = ({ x, y }, game) => {

    let i = 1, count = 1;
    let { state: { grid, lastIndex }, n } = game;

    let target = grid[x][y];

    /**
     * in Vertical checker no needs for check ubove the last index
     * and if the number of the filled index in the column is less then N no needs for count
     */
    if (lastIndex[x] >= (n - 1))
        while (y - i >= 0 && grid[x][y - i] == target) {
            count++;
            i++;
        }

    return count == n;
}

winningCheckers['Horizental'] = ({ x, y }, game) => {

    let i = 1, count = 1;
    let { state: { grid }, n } = game;

    let target = grid[x][y];

    while (x + i < grid.length && grid[x + i][y] == target) {
        count++;
        i++;
    }
    i = 1;
    while (x - i >= 0 && grid[x - i][y] == target) {
        count++;
        i++;
    }

    return count == n;
}

/** #### drawChecker 
 * draw checker succeeds only if all the column filled
 */

export const drawChecker = ({ hight, state: { lastIndex } }: Game) => {

    for (let i of lastIndex)
        if (i != (hight - 1))
            return false

    return true
}