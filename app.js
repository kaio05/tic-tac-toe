const winCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const cells = document.querySelectorAll('.cell')
let currentTurn
let xTurn
const message = document.querySelector('.win-message')
const text = document.querySelector('.text')

start()

function start() {
    xTurn = true
    cells.forEach(cell => {
        cell.classList.remove('x')
        cell.classList.remove('o')
        cell.addEventListener('click', handleClick, {once: true})
    })
    message.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    currentTurn = xTurn ? 'x': 'o'
    cell.classList.add(currentTurn)
    if (checkWin()) {
        endGame(false)
    } else if (isTie()) {
        endGame(true)
    } else {
        switchTurns()
    }
}

function switchTurns() {
    xTurn = !xTurn
}

function isTie() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o')
    })
}

function checkWin() {
    return winCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentTurn)
        })
    })
}

function endGame(tie) {
    if (tie) {
        text.innerHTML = "It's a Tie!"
    } else {
        text.innerHTML = `${currentTurn} wins!`
    }
    message.classList.add('show')
}

