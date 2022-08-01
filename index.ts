/** function for reading user inputs  */
async function readLine(question: string = ''): Promise<string> {

    return new Promise((res, rej) => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        let answer = ""
        readLine.question(question, (it: string) => {
            answer = it
            readLine.close()
            res(answer)
        })
    })

}

/** 2D grid index  */
interface Index {
    x: number,
    y: number
}

/** #### Game
 * Game required info
 *  
 * @property n : the requird number to be filled in the row
 * @property currPlayer : index of the current player, starts with 1
 * @property numberOfPlayers : number of player in this game, default is 2
 * @property grid : 2D-grid of the game
 * @property lastIndex : stores index of the last filled row in each column
 * */
interface Game {
    n: number; 
    currPlayer?: number;
    numberOfPlayers: number;
    grid: number[][];
    lastIndex: number[];
}

/** #### checker 
 * @param index position of the last filled place in the 2D game-grid
 * @param game game instance
 * @returns True if their are N in the checked row
 * */
type Checker = (index: Index, game: Game) => boolean
const checkers: { [key: string]: Checker } = {}

checkers['MainCross'] = ({ x, y }, game) => {
    let i = 1, count = 1;
    let { grid, n } = game;
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
checkers['SecondCross'] = ({ x, y }, game) => {
    let i = 1, count = 1;
    let { grid, n } = game;
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
checkers['Vertical'] = ({ x, y }, game) => {
    let i = 1, count = 1;
    let { grid, n } = game;
    let target = grid[x][y];
    while (y + i < grid[0].length && grid[x][y + i] == target) {
        count++;
        i++;
    }
    i = 1;
    while (y - i >= 0 && grid[x][y - i] == target) {
        count++;
        i++;
    }

    return count == n;
}
checkers['Horizental'] = ({ x, y }, game) => {
    let i = 1, count = 1;
    let { grid, n } = game;
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

/** #### applyInput 
 * @param x the selected column 
 * @param game game instance
 * @returns index of the last filled place
 * */
const applyInput = (x: number, game: Game): Index => {
    if (x >= game.grid.length || game.lastIndex[x] == game.grid[0].length - 1 || x < 0)
        throw Error("Invalid Move!")
    const y = ++game.lastIndex[x]
    game.grid[x][y] = game.currPlayer;
    return { x, y }
}

/** #### isFinished  
 * @param game game instance
 * @returns True if all the columns were filled
 * */
const isFinished = (game: Game):boolean => {
    let finished = true;
    game.lastIndex.forEach(v => {
        finished &&= (v == (game.grid[0].length - 1))
    })
    return finished
}
/** #### printGrid  
 * prints the 2D grid of the game
 * @param game game instance
 * 
 * */
const printGrid = ({ grid }: Game) => {

    for (let y = grid[0].length - 1; y >= 0; y--) {
        let line = '';
        for (let x = 0; x < grid.length; x++)
            line += `${grid[x][y]} `;
        console.log(line)
    }

}

/** #### gameRunner  
 * starts the game loop
 * @param game game instance
 * 
 * */
const gameRunner = async (game: Game) => {
    
    game.currPlayer = 1;
    game.n = parseInt(await readLine("Enter N: "));
    game.numberOfPlayers = parseInt(await readLine("Number of Players: "));

    printGrid(game)
    console.log(`You are playing Connect ${game.n}! The first player to get ${game.n} pieces of the same color\nvertically, horizontally, or diagonally wins.`)

    while (!isFinished(game)) {
        try {
            const userInput: number = parseInt(await readLine(`Player ${game.currPlayer}'s turn: `))// must be taken from user
            const index = applyInput(userInput, game);
            printGrid(game)
            for (let checker of Object.values(checkers)) {
                if (checker(index, game))
                    return game.currPlayer
            }
            --game.currPlayer
            game.currPlayer = ((game.currPlayer + 1) % game.numberOfPlayers) + 1; /** this line helps to determinate the next player */
        } catch (err) {
            console.log(err.message)
        }
    }
    return 0;
}

const grid = new Array<Array<number>>()
for (let i = 0; i < 6; i++) {
    grid.push(new Array(7).fill(0))
}

gameRunner({
    grid,
    n: 0,
    lastIndex: new Array<number>(6).fill(-1),
    numberOfPlayers: 2,
    currPlayer: 0
}).then(v =>
    console.log(v == 0 ? 'Game ends in a draw!' : `Player ${v} wins!`)
)