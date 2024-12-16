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
let correctWord = "";

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
        const checkWord = getCurrentRowLetters().join("");
        
        if (checkIfValidWord(checkWord)) {
            const resultArray = compareArrays();
            updateGridColor(resultArray);

            if (resultArray.every(color => color === "green")) {
                gameWon();
            } else {
                currentRow++;
                currentSquare = 0;
                currentRowSquares = getCurrentRowSquares();
            }
        } else {
            invalidWord();
        }
    } else if (Array.from(currentRowSquares).some(square => square.innerHTML === "")) {
        notEnoughLetters();
    }
}

function compareArrays() {
    const correctWordArray = correctWord.split("");
    const guessedWordArray = getCurrentRowLetters();

    return guessedWordArray.map((letter, index) => {
        if (letter === correctWordArray[index]) {
            return "green";
        } else if (correctWordArray.includes(letter)) {
            return "yellow";
        } else {
            return "grey";
        }
    });
}

function getCurrentRowLetters() {
    const lettersArray = [];
    currentRowSquares.forEach(square => {
        lettersArray.push(square.innerHTML);
    });
    return lettersArray;
}

function updateGridColor(resultArray) {
    currentRowSquares.forEach((square, index) => {
        if (resultArray[index] === "green") {
            square.style.backgroundColor = "#548D4E";
        } else if (resultArray[index] === "yellow") {
            square.style.backgroundColor = "#B59F3A";
        } else {
            square.style.backgroundColor = "#3A3A3C";
        }
    })
}

function checkIfValidWord(checkWord) {
    const lowerCaseWord = checkWord.toLowerCase();
    return wordList.includes(lowerCaseWord);
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
        square.style.backgroundColor = "#121213"
    })
    currentSquare = 0;
    currentRow = 0;
    currentRowSquares = getCurrentRowSquares();
    resetCorrectWord();
}

function resetCorrectWord() {
    correctWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
    correctWordElement.innerHTML = correctWord;
}







// function keyboardColor() {

// }

// function flipSquares() {

// }


/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener("DOMContentLoaded", function () {
    correctWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
    correctWordElement.innerHTML = correctWord;
});

keys.forEach(button => {
    button.addEventListener("click", clickLetterButton)
})

backspaceKey.addEventListener("click", goBackSquare);

enterKey.addEventListener("click", submitWord);

playAgainButton.addEventListener("click", resetGame);
