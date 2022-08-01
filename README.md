# Connect N

start playing with the following commands in the project folder

```npm i```

```npm start```

## runTime of the game-winner checker

I have 4 checker each checker in worst case has runtime of O(N)

checkers run in sequence

If the checker succeeds in finding N in the row, the game ends, and the winner will be the last player, and no needs to run the remaining checkers 

that leads to ``` O(4N) ``` in worst case and ``` O(N) ``` in good case as the runtime of the algorithm that I used to determine if a player has won at the end of each turn.

## runTime of the whole game

if players end the game with a draw result that's led to complexity in the form of O(4*N*A*B) for the ``` gameRunner (game: Game ) ```.
