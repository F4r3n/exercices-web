

class Canvas
{
    constructor(canvas) {
        this._canvas = canvas;
        this._ctx = this._canvas.getContext("2d");
    }

    drawSquare(x, y, width) {
        this._ctx.fillStyle = "black"
        this._ctx.fillRect(x, y, width, width);
    }
    getWidth() {
        return this._canvas.width
    }
    getHeight() {
        return this._canvas.height
    }

    clear() {
        this._ctx.clearRect(0, 0, this.getWidth(), this.getHeight());
    }

}
class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class Mouse {
    constructor()
    {
        this.pos = new Point(0,0)
        this.down = false
    }
}

class Game
{

    constructor(canvas)
    {
        this._canvas = new Canvas(canvas);

        this._elemLeft = canvas.offsetLeft + canvas.clientLeft;
        this._elemTop = canvas.offsetTop + canvas.clientTop;
        this._widthCell = 4
        this._width = this._canvas.getWidth()/this._widthCell
        this._height = this._canvas.getHeight()/this._widthCell



        this._array = new Uint8Array(this._width*this._height).fill(0);
        this._backArray = new Uint8Array(this._array.length).fill(0);
        this._updateFromBack = false

        this._updateTimer = 0

        this._dt = 0
        this._previousTS = 0
        this._TS = 0

        this._mouse = new Mouse()
    }
    init() {}

    mouseDown(event) {
        this._mouse.down = true
    }

    mouseUp(event) {
        this._mouse.down = false
    }

    mouseMove(event) {
        let x = event.pageX - this._elemLeft;
        let y = event.pageY - this._elemTop;
        this._mouse.pos.x = x/this._widthCell
        this._mouse.pos.y = y/this._widthCell
    }
    _updateBoard(from, to) {
        for(let i = 0; i < from.length; ++i) {
            const count = this._getNeighboursCount(from, i)
            if(count == 3) {
                to[i] = 1
            }
            else if(from[i] == 1 && (count == 2 || count == 3)) {
                to[i] = 1
            }
            else {
                to[i] = 0
            }
        }
        this._updateFromBack = !this._updateFromBack

    }

    update(timeStamp) {
        this._previousTS = this._TS
        this._TS = timeStamp
        this._dt = this._TS - this._previousTS

        this._bufferTimer += this._dt
        this._updateTimer += this._dt

        if(this._mouse.down) {
            this._updateTimer = 0
            this._setValue(this._getCurrentArray(), this._mouse.pos.x, this._mouse.pos.y, 1)

        }


        if(this._updateTimer > 100) {
            this._updateBoard(this._getCurrentArray(), this._getBackArray())
            this._updateTimer = 0
        }
    }

    draw() {
        let currentArray = this._getCurrentArray()
        this._canvas.clear()
        for(let i = 0; i < currentArray.length; ++i) {
            if(currentArray[i] === 1) {
                let [x, y] = this._getPos(i)
                    this._canvas.drawSquare(x*this._widthCell, y*this._widthCell, this._widthCell)
            }
        }
    }

    _getCurrentArray() {
        if(this._updateFromBack) {
            return this._backArray;
        }
        else {
            return this._array
        }
    }

    _getBackArray() {
        if(this._updateFromBack) {
            return this._array;
        }
        else {
            return this._backArray
        }
    }

    addCellBuffer(x, y) {
        this._buffer.push(new Point(x, y))
        this._bufferTimer = 0
    }

    _getPos(i) {
        return [Math.floor(i%this._width), Math.floor(i/this._width)]
    }

    _getValue(array, x, y) {
        let xx = Math.floor(x)
        let yy = Math.floor(y)
        if(xx < 0 || xx >= this._width) return 0
        if(yy < 0 || yy >= this._height) return 0

        return array[yy*this._width + xx]
    }

    _setValue(array, x, y, value) {
        let xx = Math.floor(x)
        let yy = Math.floor(y)
        if(xx < 0 || xx >= this._width) return
        if(yy < 0 || yy >= this._height) return

        array[yy*this._width + xx] = value
    }

    _getNeighboursCount(array, i) {
        let [x, y] = this._getPos(i)
        //console.log(x, y, i)
        let count = 0
        for(let ox = -1; ox <= 1; ox++) {
            for(let oy = -1; oy <= 1; oy++) {
                if(!(ox == 0 && oy == 0)) {
                    count += this._getValue(array, x + ox, y + oy)
                }
            }
        }
        return count
    }
}
let game = null
function init()
{
    let c = document.getElementById("canvas")
    game = new Game(c)

    c.addEventListener('mousedown', function(event) {game.mouseDown(event)})
    c.addEventListener('mouseup', function(event) {game.mouseUp(event)})
    c.addEventListener('mousemove', function(event) {game.mouseMove(event)})

    window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp) {
    game.update(timeStamp);
    game.draw();
    window.requestAnimationFrame(gameLoop);
}
