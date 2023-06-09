let cells = []
let timerId = null

function createGrid() {
    const grid = document.querySelector('#grid')
    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
            let cell = document.createElement('div')
            cell.setAttribute('id', i + '_' + j)
            cell.classList.add('cell')
            cell.style.top = `${i * 20}px`
            cell.style.left = `${j * 20}px`
            cell.addEventListener('click', toggleCell)
            grid.appendChild(cell)
        }
    }
}

function toggleCell() {
    this.classList.toggle('alive')
    let id = this.getAttribute('id').split('_')
    let i = parseInt(id[0])
    let j = parseInt(id[1])
    cells[i][j] = !cells[i][j]
}

function randomize() {
    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
            cells[i][j] = Math.random() >= 0.5
            let cell = document.getElementById(i + '_' + j)
            if (cells[i][j]) {
                cell.classList.add('alive')
            } else {
                cell.classList.remove('alive')
            }
        }
    }
}

function nextGeneration() {
    let copy = cells.map((arr) => [...arr])
    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
            let count = 0
            for (let x = Math.max(i - 1, 0); x <= Math.min(i + 1, 29); x++) {
                for (let y = Math.max(j - 1, 0); y <= Math.min(j + 1, 29); y++) {
                    if (x !== i || y !== j) {
                        count += cells[x][y] ? 1 : 0
                    }
                }
            }
            if (cells[i][j] && (count < 2 || count > 3)) {
                copy[i][j] = false
                document.getElementById(i + '_' + j).classList.remove('alive')
            } else if (!cells[i][j] && count === 3) {
                copy[i][j] = true
                document.getElementById(i + '_' + j).classList.add('alive')
            }
        }
    }
    cells = copy
}

function startGame() {
    if (!timerId) {
        timerId = setInterval(nextGeneration, 200)
    }
}

function stopGame() {
    if (timerId) {
        clearInterval(timerId)
        timerId = null
    }
}

window.onload = function () {
    for (let i = 0; i < 30; i++) {
        cells[i] = []
        for (let j = 0; j < 30; j++) {
            cells[i][j] = false
        }
    }

    createGrid()

    document.getElementById('start').addEventListener('click', startGame)
    document.getElementById('stop').addEventListener('click', stopGame)
    document.getElementById('randomize').addEventListener('click', randomize)
}
