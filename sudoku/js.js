window.onload = () => {
    generateGame();
}

var puzzle, puzzleCopy;

puzzle = [
    [0, 3, 0, 0, 1, 0, 0, 6, 0], 
    [7, 5, 0, 0, 3, 0, 0, 4, 8], 
    [0, 0, 6, 9, 8, 4, 3, 0, 0], 
    [0, 0, 3, 0, 0, 0, 8, 0, 0], 
    [9, 1, 2, 0, 0, 0, 6, 7, 4], 
    [0, 0, 4, 0, 0, 0, 5, 0, 0], 
    [0, 0, 1, 6, 7, 5, 2, 0, 0], 
    [6, 8, 0, 0, 9, 0, 0, 1, 5], 
    [0, 9, 0, 0, 4, 0, 0, 3, 0]
]

puzzleCopy = [...puzzle];
console.log(`copy ${puzzleCopy}`)

function sudokuSolver(puzzle){
    var nonPossibilities = {}, impossibleNumbers, emptySpaces = 81;
    
    while (emptySpaces > 0){
        
        emptySpaces = 0;

        for(var vert = 0; vert < puzzle.length; vert++){
            for (var horz = 0; horz < puzzle.length; horz++) {
                if(puzzle[vert][horz] === 0){
                    // needs to a be an obj (not arr) bc i just want all the #s that it can't be. as an obj, the same numbers can be re-written over each other (if there's a 3 in the row and a 3 in the column, as an obj, it'll only be listed once )
                    nonPossibilities = {};
    
                    // once we find 0, we're going to check the row, column
                    for (var i = 0; i< 9; i++){
                        // console.log(puzzle[vert][i]);
                        
                        // for every 0 I find, look thru 1) the row first
                        if(puzzle[vert][i] > 0){
                            nonPossibilities[puzzle[vert][i]] = true
                        }
    
                        // 2) then look thru the column
                        if(puzzle[i][horz] > 0){
                            nonPossibilities[puzzle[i][horz]] = true
                        }
                    }
                    // 3) for every box 
                    for (var vertBox = Math.floor(vert / 3) * 3; vertBox < Math.floor(vert / 3) * 3 + 3; vertBox++){
                        for (var horzBox = Math.floor(horz / 3) * 3; horzBox < Math.floor(horz / 3) * 3 + 3; horzBox++){
                            if (puzzle[vertBox][horzBox]){
                                nonPossibilities[puzzle[vertBox][horzBox]] = true
                            }
                        }
                    }
                    // console.log(nonPossibilities)
    
                    impossibleNumbers = Object.keys(nonPossibilities);
                    if(impossibleNumbers.length === 8){
                        for( var i = 1; i< 10; i++){
                            if (impossibleNumbers.indexOf(String(i)) < 0){
                                // console.log(vert,horz, i)
                                puzzle[vert][horz] = i
                            }
                        }
                    } else {
                        emptySpaces ++;
                    }
                }
            }   
        }
        // console.log(emptySpaces)
    }
    
    return puzzle;
}


function generateGame(){
    for(let row = 0; row < puzzle.length; row++){
        var rowHTML = `<div class="row" id="row-${row}"></div>`
        document.querySelector('#game').insertAdjacentHTML('beforeend', rowHTML)
        for(let cell = 0; cell < puzzle.length; cell++){
            if(puzzle[row][cell]===0){
                var html = `
                    <div class="cell">0</div>
                `  
            } else{
                var html= `<div class="cell">${puzzle[row][cell]}</div>`
            }
            document.querySelector(`#row-${row}`).insertAdjacentHTML('beforeend', html)
        }
    }
}






console.log(puzzle)
console.log(`copy ${puzzleCopy}`)
sudokuSolver(puzzle);
// console.log(puzzleAnswer)


// youtube
// var puzzle = [
//     [5, 3, 0, 0, 7, 0, 0, 0, 0], 
//     [6, 0, 0, 1, 9, 5, 0, 0, 0], 
//     [0, 9, 8, 0, 0, 0, 0, 6, 0], 
//     [8, 0, 0, 0, 6, 0, 0, 0, 3],
//     [4, 0, 0, 8, 0, 3, 0, 0, 1], 
//     [7, 0, 0, 0, 2, 0, 0, 0, 6], 
//     [0, 6, 0, 0, 0, 0, 2, 8, 0], 
//     [0, 0, 0, 4, 1, 9, 0, 0, 5], 
//     [0, 0, 0, 0, 8, 0, 0, 7, 9]
// ]

// DONT USE! will run an infinite loop
// var puzzle = [
//     [3, 0, 0, 0, 0, 0, 0, 0, 0], 
//     [6, 5, 0, 0, 1, 0, 0, 7, 0],
//     [0, 0, 4, 2, 0, 7, 5, 0, 0], 
//     [0, 0, 0, 9, 0, 0, 0, 0, 0], 
//     [0, 0, 0, 7, 0, 0, 0, 0, 9], 
//     [0, 9, 0, 0, 6, 3, 0, 4, 2], 
//     [1, 7, 5, 0, 3, 0, 0, 6, 4], 
//     [0, 4, 0, 0, 0, 0, 0, 0, 5],
//     [0, 0, 8, 0, 0, 0, 0, 0, 0]
// ]