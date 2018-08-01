const sketchBox = document.getElementById('sketch');

changeGrid(5);

function resetSketch() {
    deleteSqaures();
    changeGrid(10);
    appendSquares(10);
}

function changeGrid(n) {
    var gridString = ''
    for (var i = 0; i < n; i++) {
        gridString += '1fr ';
    }
    sketchBox.style.gridTemplateColumns = gridString;
    sketchBox.style.gridTemplateRows = gridString;
    
    for (var i = 0; i < n**2; i++) {
        let square = document.createElement('div');
        sketchBox.appendChild(square);
    }
}

function deleteSqaures() {
    
}

