let canvas = document.getElementById('canvas')
let c = canvas.getContext("2d")


var mouseX = 0;
var mouseY = 0;

var currentBrush = [undefined, undefined]
var lastPos = [undefined, undefined]
var rect = []
var lines = []
var circle = []
var currMouse = "Circle"
var start = 0
var saved = false

addEventListener('mousemove', (e) => {
    mouseX = e.clientX - 247;
    mouseY = e.clientY - 98;
    document.getElementById("mouseCondition").innerText = mouseY + "," + mouseX;

    if (start) {
        c.clearRect(0, 0, 1024, 576);

        for (let i = 0; i < rect.length; i++) {
            const element = rect[i];
            c.beginPath();
            c.rect(element.x, element.y, element.xl, element.yl);
            c.stroke();
        }
        for (let i = 0; i < circle.length; i++) {
            const element = circle[i];
            c.beginPath();
            c.arc(element.x, element.y, Math.sqrt(Math.pow(element.xl, 2) + Math.pow(element.yl, 2)), 0, 2 * Math.PI)
            c.stroke();
        }

        for (let i = 0; i < lines.length; i++) {
            const element = lines[i];
            c.beginPath();
            c.moveTo(element.x, element.y)
            c.lineTo(element.x+element.xl, element.y+element.yl)
            c.stroke();
        }

        if (currMouse == "Rect" && saved) {
            c.beginPath();
            c.rect(currentBrush[0], currentBrush[1], mouseX - currentBrush[0], mouseY - currentBrush[1]);
            c.stroke();
        } else if (currMouse == "Circle" && saved) {
            c.beginPath();
            c.arc(currentBrush[0], currentBrush[1], Math.sqrt(Math.pow(mouseX - currentBrush[0], 2) + Math.pow(mouseY - currentBrush[1], 2)), 0, 2 * Math.PI)
            c.stroke();
        } else if (currMouse == "Brush" && saved) {
            c.beginPath();
            c.moveTo(currentBrush[0], currentBrush[1])
            c.lineTo(mouseX, mouseY)
            c.stroke();
        }
    }
});

addEventListener('click', (e) => {
    if (mouseX > 0 && mouseX < 1024 && mouseY > 0 && mouseY < 576) {
        if (currMouse == "Rect") {
            if (!saved) {
                currentBrush[0] = mouseX;
                currentBrush[1] = mouseY;
                saved = 1;
            } else {
                rect.push({ x: currentBrush[0], y: currentBrush[1], xl: mouseX - currentBrush[0], yl: mouseY - currentBrush[1] });
                saved = 0;
                currentBrush[0] = undefined;
                currentBrush[1] = undefined;
            }
        } else if (currMouse == "Circle") {
            if (!saved) {
                currentBrush[0] = mouseX;
                currentBrush[1] = mouseY;
                saved = 1;
            } else {
                circle.push({ x: currentBrush[0], y: currentBrush[1], xl: mouseX - currentBrush[0], yl: mouseY - currentBrush[1] });
                saved = 0;
                currentBrush[0] = undefined;
                currentBrush[1] = undefined;
            }
        } else if (currMouse == "Brush") {
            if (!saved) {
                currentBrush[0] = mouseX;
                currentBrush[1] = mouseY;

                saved = 1;
            } else {
                lines.push({ x: currentBrush[0], y: currentBrush[1], xl: mouseX - currentBrush[0], yl: mouseY - currentBrush[1] });
                saved = 0;
                currentBrush[0] = undefined;
                currentBrush[1] = undefined;
            }
        }
        start = !start;
    }
});


let x = 0



function selectRect() {
    currMouse = "Rect"
}

function selectCircle() {
    currMouse = "Circle"
}


function Clear() {
    rect = []
    circle = []
    lines = []
    c.clearRect(0, 0, canvas.width, canvas.height)
}

function selectBrush() {
    currMouse = "Brush"
}



