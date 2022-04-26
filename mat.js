/* ------------------------DEFINITIONS-------------------------*/
//-------------------------------------------------------------
"use strict";
const gridHeight = 500;
const gridWidth = 950;
const size = 30;

const SOURCE = 156;
const DEST = 292;

const source_color = "royalblue";
const dest_color = "red";
const wall_color = "grey";
const original = "white";

// number of rows and columns
const numOfRows = 15;
const numOfCols = 30;

// total number of cells
const totalCells = numOfRows * numOfCols;
// ------------------------------------------------------------

// select the top and the grid divs
let navBar = document.querySelector(".top");
let grid = document.querySelector(".grid");


let matrix = new Array(numOfRows);
let cellPosition = new Map();


var timer = 0;

// BUTTONS


// --------------------------------------------------------------
// --------------------------------------------------------------




// function to clear the grid
function clear_grid() {
    for (let i = 0; i < totalCells; i++) {
        let elemID = "cell" + i;
        let cell = document.getElementById(elemID);
        if (i != SOURCE && i != DEST) {
            if (cell.style.backgroundColor == wall_color)
                cell.style.backgroundColor = original;
            if(cell.style.backgroundColor == "yellow")
                cell.style.backgroundColor = original;
            if(cell.style.backgroundColor == "purple")
                cell.style.backgroundColor = original
        }
    }
    timer=0;
    clearMatrix();
}


function set_cell_color(elemID) {
    let box = document.getElementById(elemID);
    let color = box.style.backgroundColor;
    if (color == original)
        box.style.backgroundColor = wall_color;
    else
        box.style.backgroundColor = original;
}


//  function to set colors to the source cell and the destination cell
function set_source_dest_color(elementID, color) {
    document.getElementById(elementID).style.backgroundColor = color;
}

// setting up the source and destination cells
function set_up_source_destination() {
    let source_element_id = "cell" + SOURCE;
    let dest_element_id = "cell" + DEST;

    console.log(SOURCE, DEST);
    console.log(source_element_id + " " + dest_element_id);

    set_source_dest_color(source_element_id, source_color);
    set_source_dest_color(dest_element_id, dest_color);
};





// adds id and class to the row

function Row_add_id_class(box, i) {
    box.id = "row" + i;
    box.className = "row row" + i;
}

// adds id and class to each passed cell
function Cell_add_id_class(cell, i, j) {
    const cellNumber = i * numOfCols + j;
    cell.id = "cell" + cellNumber;
    cell.className = "cell cell" + cellNumber;
}


// self invoking function setUP
(function() {
    for (let i = 0; i < numOfRows; i++) {
        // create a div for rows
        let row = document.createElement("div");
        Row_add_id_class(row, i);

        // append numOfCols cells into the box

        for (let j = 0; j < numOfCols; j++) {
            let box = document.createElement("div");
            Cell_add_id_class(box, i, j);

            //--------------------------------------------------
            let cellNumber = i * numOfCols + j;
            cellPosition[cellNumber] = [i, j];
            if (cellNumber != SOURCE && cellNumber != DEST) {
                box.style.backgroundColor = original;
                box.ondragenter = function() {
                    set_cell_color(this.id);
                }
            }

            //--------------------------------------------------
            // append the newly created cell or box the the row div
            row.appendChild(box);
        }

        grid.appendChild(row);
    }

    console.log(grid);


    // -----------------------------------------------------------------------
    /* after the grid is compiled set up the source and destination cells

    SOURCE cell No. -> 156
    DESTINATION cell No. -> 292

    */

    set_up_source_destination();
})();











// setUp the grid cells




document.querySelector('.clear').addEventListener('click', clear_grid);

// buttons = document.querySelectorAll('button');
/* 
buttons[0] = start,
buttons[1] = bfs,
buttons[2] = dfs,
buttons[3] = walls,
buttons[4] = clear
*/



// get the grid int he form of a matrix
function setMatrix() {
    for (let row = 0; row < numOfRows; row++) {
        matrix[row] = new Array(numOfCols).fill(0);
    }

    for (let i = 0; i < numOfRows; i++) {
        for (let j = 0; j < numOfCols; j++) {
            const cellNumber = i * numOfCols + j;
            let elemId = "cell" + cellNumber;

            let color = document.getElementById(elemId).style.backgroundColor;
            if (color == wall_color)
                matrix[i][j] = -1;
            else matrix[i][j] = cellNumber;
        }
    }
}

function clearMatrix() {
    for (let i = 0; i < numOfRows; i++) {
        for (let j = 0; j < numOfCols; j++) {
            const cellNumber = i * numOfCols + j;
            matrix[i][j] = cellNumber;
        }
    }
}



document.querySelector('.bfs').addEventListener('click', breath_first_search);

function pulP(sourceNode) {
    document.getElementById("cell" + sourceNode).style.backgroundColor = "purple";
}


// 100% working breadth first search

function breath_first_search() {


    setMatrix();
    console.log(cellPosition);

    // let tracer = new Array(numOfRows);
    // for (let i = 0; i < numOfRows; i++)
    //     tracer[i] = new Array(numOfCols);
    let parent = new Array(totalCells + 1).fill(-1);
    let distance = new Array(totalCells + 1).fill(1e9);
    let queue = [];
    queue.push(SOURCE);
    parent[SOURCE] = -1;
    distance[SOURCE] = 0;
    // perform_breath_first_search();
    console.log(grid);
    while (queue.length > 0) {
        let node = queue.shift();
        let list = cellPosition[node];

        if (node == DEST) {
            break;
        }
        console.log("hi");
        let dx = [-1, 0, 1, 0];
        let dy = [0, 1, 0, -1];
        console.log(node);
        for (let i = 0; i < dx.length; i++) {

            let nx = list[0] + dx[i];
            let ny = list[1] + dy[i];

            if (nx < 0 || nx >= numOfRows || ny < 0 || ny >= numOfCols)
                continue;
            let sourceNode = matrix[nx][ny];
            // alert(sourceNode);
            if(sourceNode!=156  && sourceNode!=292)
            {
                setTimeout(pulP, timer * 5, sourceNode);
                timer++;
            }

            if (matrix[nx][ny] == -1)
                continue;
            if (parent[matrix[nx][ny]] != -1 || matrix[nx][ny] == SOURCE) continue;
            console.log(nx + " " + ny + " " + matrix[nx][ny] + "\n");
            const newNode = matrix[nx][ny];
            if (distance[node] + 1 < distance[newNode]) {
                distance[newNode] = distance[node] + 1;
                parent[newNode] = node;
                queue.push(newNode);

            }
        }
    }

    console.log(matrix);
    // console.log(parent);
    // console.log(distance);
    let found = false;
    // alert('comp');
    clearTimeout(pulP);
    if (parent[DEST] != -1) found = true;
    // alert('found value');
    if (found == false) {
        console.log("path Not Found");
        alert("Path not found 😒");
        return;
    }
    let reversePath = [];
    let value = parent[DEST];
    while (parent[value] != SOURCE) {
        reversePath.push(value);
        value = parent[value];
    }
    reversePath.push(value);
    reversePath.reverse();
    console.log(reversePath);

    // use setOutTime function for a smooth animation
    // alert(timer);
    if(found == true)
    {
        for (let i = 0; i < reversePath.length; i++) {
        var cell = "cell" + reversePath[i];
        // alert(timer +' A timer');
        setTimeout(fun, timer*5, cell);
        timer+=20;
        }
    }


}


function fun(cell) {
    document.getElementById(cell).style.backgroundColor = "yellow";

}
// ---------------------------------------------------------------------------------------






// Depth First Search Algorithm

document.querySelector('.dfs').addEventListener('click', depth_first_search);


function depth_first_search() {
    setMatrix();

    let parent = new Array(totalCells + 1);
    let visited = new Set();
    let src = cellPosition[SOURCE];
    let end = cellPosition[DEST];


    let found = depth_first_search_algo(matrix, src, end, visited, parent, -1);
    if (found == false) {
        console.log("not found\n");
        return;
    }

    let reversePath = [];
    let value = parent[DEST];
    while (parent[value] != SOURCE) {
        reversePath.push(value);
        value = parent[value];
    }
    reversePath.push(value);
    reversePath.reverse();
    console.log(reversePath)

    for (let i = 0; i < reversePath.length; i++) {
        var cell = "cell" + reversePath[i];
        // document.getElementById(cell).style.backgroundColor = "yellow";
        // setDelay("cell" + reversePath[i])
        setTimeout(fun, timer * 100, cell);
        timer++;
    }
}

function setDelay(i) {
    setTimeout(() => {
        document.getElementById(i).style.backgroundColor = "yellow";
    }, 100);
}

function notValid(x, y) {
    return (x < 0 || y < 0 || x >= numOfRows || y >= numOfCols);
}


function depth_first_search_algo(matrix, source, destination, visited, parentArray, parent) {

    let sourceNode = matrix[source[0]][source[1]];

    if (source[0] == destination[0] && source[1] == destination[1]) {
        parentArray[DEST] = parent;
        return true;
    }
    if (visited.has(sourceNode)) return false;

    if (sourceNode != SOURCE) {

        setTimeout(pulP, timer * 100, sourceNode);
        timer++;
    }
    visited.add(sourceNode);
    parentArray[sourceNode] = parent;




    let dx = [-1, 0, 1, 0];
    let dy = [0, 1, 0, -1];

    for (let i = 0; i < dx.length; i++) {
        let nx = source[0] + dx[i];
        let ny = source[1] + dy[i];


        if (notValid(nx, ny)) continue;
        if (matrix[nx][ny] == -1) continue;

        if (depth_first_search_algo(matrix, [nx, ny], destination, visited, parentArray, sourceNode) == true)
            return true;
    }
    parentArray[source] = -1;
    return false;
}

