class Plant {
    constructor(name, price, desc, soilType, sellValue, imageData) {
        this.name = name
        this.price = price
        this.desc = desc
        this.soilType = soilType
        this.sellValue = sellValue
        this.imageData = imageData
    }
}

class seedBag {
    constructor(plant, quantity) {
        this.plant = plant
        this.quantity = quantity
    }

    use(tile) {
        if (this.quantity >= 1) {
            tile.plant = this.plant
            this.quantity -= 1
        }
    }
}

class Tile {
    constructor (soilType, plant, grown) {
        this.plant = plant;
        this.grown = grown;
        this.fertilizerNum = 0;
    }
}

class Inventory {
    constructor() {
        this.data = {}
    }

    initialize() {
        this.selected = null
    }
}

// Game Globals
let money = 0
let inventory = new Inventory()
let started = false
let updateInterval = null;
let soilOrder = ["Basic", "Loam", "Silt"]
let mouseStates = {}
let mousePos = [], prevMouseDown = false;

// Canvas
let canv = document.getElementById("GameCanvas")
let ctx = canv.getContext("2d")
let cw = canv.offsetWidth, ch = canv.offsetHeight

// Game Settings
let gridSize = [5,5]
let gridTiles = []

function fill(canv, color) {
    let cvw = canv.offsetWidth, cvh = canv.offsetHeight
    let context = canv.getContext("2d")
    context.fillStyle = color
    context.fillRect(0, 0, cvw, cvh)
}

function drawGame() {
    cw = canv.getAttribute("width"), ch = canv.getAttribute("height")
    console.log(cw, ch)
    let [gridW, gridH] = gridSize
    let [tileW, tileH] = [cw / gridW, ch / gridH]
    let [dtW, dtH] = [canv.offsetWidth / gridW, canv.offsetHeight / gridH]
    let rect = canv.getBoundingClientRect()
    let [top, left] = [rect.top, rect.left]

    for (let i = 0; i < gridTiles.length; i++) {
        let tile = gridTiles[i]
        let [x, y] = [i % gridW, Math.floor(i / gridH)]
        let [sx, sy] = [x * tileW, y * tileH]
        let color = "#964B00"
        
        let withinX = left + (dtW * x) < mousePos[0] && mousePos[0] < left + (dtW * (x + 1))
        let withinY = top + (dtH * y) < mousePos[1] && mousePos[1] < top + (dtH * (y + 1))
        if (withinX && withinY) {
            color = "#995B09"
        }
        ctx.fillStyle = color
        ctx.fillRect(sx, sy, sx + tileW, sy + tileH)
    }
    prevMouseDown = mouseStates[0]
}

function update() {
    if (!started) {return}
    drawGame()
    
}

function initialize() {
    let [gridW, gridH] = gridSize
    for (let i = 0; i < gridW * gridH; i++) {
        gridTiles.push(new Tile(soilOrder[0], null, false))
    }
    canv.addEventListener("mouseup", (ev) => {
        mouseStates[ev.button] = false
    })
    canv.addEventListener("mousedown", (ev) => {
        mouseStates[ev.button] = true
    })
    document.addEventListener("mousemove", (ev) => {
        mousePos = [ev.clientX, ev.clientY]
    })

    let menuBtnFuncs = {
        "Start" : function() {
            if (started) {return}
            let mbDiv = document.getElementById("MenuUI")
            started = true
            mbDiv.style.display = "none"
            updateInterval = setInterval(update, 60)
        },
    }

    for (let btn of document.getElementsByClassName("MenuBtn")) {
        btn.addEventListener("click", () => {
            menuBtnFuncs[btn.name]()
        })
    }
}

initialize()
