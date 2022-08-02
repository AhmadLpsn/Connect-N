/** #### printGrid  
 * prints the 2D grid of the game
 * @param game game instance
 * 
 * */
export const printGrid = (grid: number[][]) => {
    console.log('\n');
    for (let y = grid[0].length - 1; y >= 0; y--) {
        let line = '';
        for (let x = 0; x < grid.length; x++)
            line += `${grid[x][y]} `;
        console.log(line)
    }
    console.log('\n');
}