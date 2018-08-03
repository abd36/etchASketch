const sketchBox = document.getElementById('sketch');
const footer = document.getElementById('footerDiv');

var n = 20;
var color = false;
var drawMode = false;
var isMouseDown = false;

//footer.textContent = '@abd36  '.repeat(20);
for (let i = 0; i < 20; i++) {
    let name = document.createElement('a');
    name.href = 'https://github.com/abd36/';
    name.target = '_blank';
    name.textContent = '@abd36'
    footer.appendChild(name);
}

window.addEventListener('keydown', keyPress);

function changeGrid(n) {
    let gridString = '';
    for (let i = 0; i < n; i++) {
        gridString += '1fr ';
    }
    sketchBox.style.gridTemplateColumns = gridString;
    sketchBox.style.gridTemplateRows = gridString;
    
    for (let i = 0; i < n**2; i++) {
        let square = document.createElement('div');
        square.setAttribute('rgb', randColor());
        square.setAttribute('grey', randGrey());
        
        square.style.backgroundColor = 'white';
        
        square.classList.add('square');
        square.addEventListener('mouseover', mouseIn);
        
        sketchBox.appendChild(square);   
    }
}

function deleteSquares() {
    /*var squares = document.querySelectorAll('.square')
    for (var i = 0; i < squares.length; i++) {
        squares[i].removeChild;
    }*/
    while (sketchBox.firstChild) {
        sketchBox.removeChild(sketchBox.firstChild);
    }
}

function getRandomInt(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

function randColor() {
    let rgb = [0,0,0];
    for (let i = 0; i < 3; i++) {
        rgb[i] = getRandomInt(100,255);
    }
    return rgb;
}

function randGrey() {
    var n = getRandomInt(100, 255);
    let grey = [];
    for (let i = 0; i < 3; i++) {
        grey.push(Number(n));
    }
    return grey;
}

function mouseIn(e) {
    if (drawMode) {
        if (isMouseDown) {
            console.log('drawing');
            draw(e);
        }
    } else draw(e);
}

function draw(e) {
    if (e.target.style.backgroundColor == 'white') {
        if (color) {
            e.target.style.backgroundColor = `rgb(${e.target.getAttribute('rgb')})`;

        } else {
            e.target.style.backgroundColor = `rgb(${e.target.getAttribute('grey')})`;
        }
    } else {
        if (color) {
            let rgbAtt = e.target.getAttribute('rgb');
            let rgb = extractRGBValues(rgbAtt);
            rgb = darkenRGB(rgb);
            e.target.setAttribute('rgb', rgb);
            e.target.style.backgroundColor = `rgb(${e.target.getAttribute('rgb')})`;
        } else {
            let greyAtt = e.target.getAttribute('grey');
            let grey = extractRGBValues(greyAtt);
            grey = darkenRGB(grey);
            e.target.setAttribute('grey', grey);
            e.target.style.backgroundColor = `rgb(${e.target.getAttribute('grey')})`;
        }
    }
}

function darkenRGB(rgb) {
    if (rgb == [0,0,0]) return rgb;
    newRGB = rgb;
    for (let i = 0; i < 3; i++) {
        newRGB[i] -= rgb[i]/3;
    }
    return newRGB;
}

function extractRGBValues(rgbString){
    return [rgbString.slice(0, rgbString.indexOf(',')), rgbString.slice(rgbString.indexOf(',')+1, rgbString.indexOf(',', rgbString.indexOf(',')+1)), rgbString.slice(rgbString.indexOf(',', rgbString.indexOf(',')+1)+1)];
}

function clearSketch() {
    deleteSquares();
    changeGrid(n);
}

function mouseDown() {
    isMouseDown = true;
    console.log(true);
}

function mouseUp() {
    isMouseDown = false;
    console.log(false);
}

function keyPress(e) {
    if (e.keyCode == 67) clearSketch()
    if (e.keyCode == 78) {
        n = prompt();
        clearSketch();
    }
    if (e.keyCode == 84) {
        if (color) color = false;
        else color = true;
        clearSketch();
    }
    if (e.keyCode == 68) {
        if (drawMode) drawMode = false;
        else drawMode = true;
    }
    console.log(e.keyCode);
}

changeGrid(n);