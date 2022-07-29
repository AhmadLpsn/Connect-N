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

interface Index {
    x: number,
    y: number
}
interface Game {
    n: number;
    currPlayer?: number;
    numberOfPlayers: number;
    grid: number[][];
    lastIndex: number[];
}
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

const applyInput = (x: number, game: Game): Index => {
    if (x >= game.grid.length || game.lastIndex[x] == game.grid[0].length - 1 || x < 0)
        throw Error("Invalid Move!")
    const y = ++game.lastIndex[x]
    game.grid[x][y] = game.currPlayer;
    return { x, y }
}
const isFinished = (game: Game) => {
    let finished = true;
    game.lastIndex.forEach(v => {
        finished &&= (v == (game.grid[0].length - 1))
    })
    return finished
}

const printGrid = ({ grid }: Game) => {

    for (let y = grid[0].length - 1; y >= 0; y--) {
        let line = '';
        for (let x = 0; x < grid.length; x++)
            line += `${grid[x][y]} `;
        console.log(line)
    }

}

const gameRunner = async (game: Game) => {
    printGrid(game)
    game.currPlayer = 1;
    game.n = parseInt(await readLine("Enter N: "));
    game.numberOfPlayers = parseInt(await readLine("Number of Players: "));
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
            game.currPlayer = ((game.currPlayer + 1) % game.numberOfPlayers) + 1;
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
}).then(console.log)