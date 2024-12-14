/*-------------------------------- Constants --------------------------------*/
const correctWordElement = document.querySelector(".correctWord");
const hideWord = document.querySelector(".hideWord");
const playAgainButton = document.querySelector(".playAgain");
const hideButton = document.querySelector(".hideButton");
const squares = document.querySelectorAll(".square");
const keys = document.querySelectorAll(".key");
const backspaceKey = document.querySelector("#backspace")


/*-------------------------------- Variables --------------------------------*/
// let correctWord = "";
// let gussedWord = "";
let currentSquare = 0;
// let currentLetter = "";





/*-------------------------------- Functions --------------------------------*/
function getCurrentSquare() {
    return squares[currentSquare];
}

function moveToNextSquare() {
    if (currentSquare < squares.length - 1) {
        currentSquare++;
    }
}

function goBackSquare() {
    if (currentSquare === 0) {
        return;
    }
    currentSquare--
    squares[currentSquare].innerHTML = "";
}

function updateCurrentSquare(letter) {
    if (currentSquare < squares.length) {
        squares[currentSquare].innerHTML = letter;
        squares[currentSquare].style.color = "white";
        squares[currentSquare].style.fontWeight = "bold";
        squares[currentSquare].style.fontSize = "30px";
    }
}


function clickButton(event) {
    const letter = event.target.getAttribute("data-letter");
    updateCurrentSquare(letter);
    moveToNextSquare();
}


keys.forEach(button => {
    button.addEventListener("click", clickButton)
})

// function gameWon() {

// }

// function resetGame() {

// }



// function clearLetter() {

// }

// function submitWord() {

// }

// function compareArrays() {

// }

// function checkIfValid() {

// }

// function squareColor() {

// }

// function keyboardColor() {

// }

// function flipSquares() {

// }

/*----------------------------- Event Listeners -----------------------------*/
backspaceKey.addEventListener("click", goBackSquare);