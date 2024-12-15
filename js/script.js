/*-------------------------------- Constants --------------------------------*/
const correctWordElement = document.querySelector(".correctWord");
const hideWord = document.querySelector(".hideWord");
const playAgainButton = document.querySelector(".playAgain");
const hideButton = document.querySelector(".hideButton");
const notEnoughLtrs = document.querySelector(".notEnoughLetters");
const notAWord = document.querySelector(".notAWord")
const squares = document.querySelectorAll(".square");
const keys = document.querySelectorAll(".key");
const backspaceKey = document.querySelector("#backspace");
const enterKey = document.querySelector("#enter");
const rows = [
    document.querySelector("#row1"),
    document.querySelector("#row2"),
    document.querySelector("#row3"),
    document.querySelector("#row4"),
    document.querySelector("#row5"),
    document.querySelector("#row6")
];


/*-------------------------------- Variables --------------------------------*/
let currentSquare = 0;
let currentRow = 0;
let currentRowSquares = getCurrentRowSquares();
/*-------------------------------- Functions --------------------------------*/

function getCurrentSquare() {
    return squares[currentSquare];
}

function getCurrentRowSquares() {
    return rows[currentRow].querySelectorAll(".square");
}

function clickLetterButton(event) {
    const letter = event.target.getAttribute("data-letter");
    updateCurrentSquare(letter);
}

function updateCurrentSquare(letter) {
    if (currentRowSquares[4].innerHTML !== "") {
        return;
    }
    if (currentRowSquares[currentSquare].innerHTML !== "") {
        moveToNextSquare();
    }
    if (currentRowSquares[currentSquare].innerHTML === "") {
        currentRowSquares[currentSquare].innerHTML = letter;
        currentRowSquares[currentSquare].style.color = "white";
        currentRowSquares[currentSquare].style.fontWeight = "bold";
        currentRowSquares[currentSquare].style.fontSize = "30px";

        moveToNextSquare();
    }
}

function moveToNextSquare() {
    if (currentSquare < currentRowSquares.length - 1) {
        currentSquare++;
    }
}

function goBackSquare() {
    if (currentSquare === 0) {
        currentRowSquares[currentSquare].innerHTML = "";
    } else if (currentRowSquares[currentSquare].innerHTML !== "") {
        currentRowSquares[currentSquare].innerHTML = "";
        currentSquare--
    } else {
        currentSquare--;
        currentRowSquares[currentSquare].innerHTML = "";
    }
}

function submitWord() {
    if (currentRow < rows.length && currentRowSquares[4].innerHTML !== "") {
        const lettersArray = [];
        const currentLetters = getCurrentRowLetters(lettersArray);
        const checkWord = currentLetters.join("");

        if (checkIfValidWord(checkWord)) {
            console.log("Word is valid");
            currentRow++;
            currentSquare = 0;
            currentRowSquares = getCurrentRowSquares()
        } else {
            console.log("Word is not valid");
            invalidWord();
        }
    } else if (Array.from(currentRowSquares).some(square => square.innerHTML === "")) {
        notEnoughLetters();
    }
}

function checkIfValidWord(checkWord) {
    const lowerCaseWord = checkWord.toLowerCase();
    return wordList.includes(lowerCaseWord);
}

function getCurrentRowLetters(lettersArray) {
    currentRowSquares.forEach(square => {
        lettersArray.push(square.innerHTML);
    });
    return lettersArray;
}

function invalidWord() {
    notAWord.classList.remove("hideNotAWordAlert");
    setTimeout(function () {
        notAWord.classList.add("hideNotAWordAlert");
    }, 3000);
}

function notEnoughLetters() {
    notEnoughLtrs.classList.remove("hideShortWordAlert");
    setTimeout(function () {
        notEnoughLtrs.classList.add("hideShortWordAlert");
    }, 3000);
}


function gameWon() {
    hideButton.classList.remove("hideButton");
}

function gameLost() {
    hideWord.classList.remove("hideWord");
    hideButton.classList.remove("hideButton");
}

function resetGame() {
    hideButton.classList.add("hideButton");
    hideWord.classList.add("hideWord");
    squares.forEach((square) => {
        square.innerHTML = "";
    })
    currentSquare = 0;
}




// function compareArrays() {

// }

// function squareColor() {

// }

// function keyboardColor() {

// }

// function flipSquares() {

// }


/*----------------------------- Event Listeners -----------------------------*/
keys.forEach(button => {
    button.addEventListener("click", clickLetterButton)
})
backspaceKey.addEventListener("click", goBackSquare);
enterKey.addEventListener("click", submitWord);
playAgainButton.addEventListener("click", resetGame);