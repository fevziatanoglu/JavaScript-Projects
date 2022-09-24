const buttons = document.querySelectorAll(".button");
const buttonArray = Array.from(buttons);

const gameScreen = document.querySelector(".game-container");

const turnText = document.querySelector(".turn-text");
const tourText = document.querySelector(".tour-text");

const startButton = document.querySelector(".start-btn");
startButton.addEventListener("click", () => { if (!isStart) { getStart(); isStart = true; } });

let isStart = false;
let isClick = false;
let isUserTurn = false;
let tour = 1;
let userClickAmount = 0;
let indexArray = [];
let userIndexArray = [];

buttonArray.forEach(button => {
    button.addEventListener("click", () => { userClick(button); })
});

async function turnOnButton(button) {

    button.style = "opacity:100%; border:2px solid; box-shadow: 0 0 50px white;";
    // wait before this button turn off
    await waitFor(500);
    turnOffButton(button);
}

async function userClick(button) {

    if (!isClick && isUserTurn) {

        isClick = true;


        const userIndex = buttonArray.indexOf(button);
        userIndexArray.push(userIndex);



        await turnOnButton(button);

        compareIndex();

        isClick = false;

        userClickAmount++;
    }

    if (userClickAmount >= indexArray.length) {
        console.log("çalış");
        getStart();
        userClickAmount = 0;
        userIndexArray = [];
    }
}

function turnOffButton(button) {
    button.style = "opacity:50%; border:none; box-shadow: none";
}

async function waitFor(second) {
    return new Promise(response => setTimeout(response, second))
}



async function getStart() {


    isUserTurn = false;
    turnText.textContent = "Pc Turn";

    // wait before pc turn
    await waitFor(1000);

    tour++;

    const randomIndex = Math.floor(Math.random() * buttonArray.length);
    indexArray.push(randomIndex);

    for (let i = 0; i < indexArray.length; i++) {

        const index = indexArray[i];

        const randomButton = buttonArray[index];
        await turnOnButton(randomButton);

        // wait before new button turn on
        await waitFor(500);
    }

    console.log("correct indexes : " + indexArray);

    nextTour();
}

function nextTour() {
    tourText.textContent = `Tour: ${indexArray.length}`;
    turnText.textContent = "User Turn";
    isUserTurn = true;
}

function compareIndex() {

    const correctIndex = indexArray[userClickAmount];
    const userCurrentIndex = userIndexArray[userClickAmount];

    console.log("click index:" + userClickAmount + "\n user index :" + userCurrentIndex + "\n correct index :" + correctIndex)

    if (userCurrentIndex == correctIndex) {
        console.log("dogru");
    }
    else {
        gameOver()
    }



}

function gameOver() {


    const gameOverScreen = document.createElement("div");
    gameOverScreen.className = "game-over centered p-5 fw-bold display-2 text-light border border-4 border-dark";

    const gameOverTexts = document.createElement("div");
    gameOverTexts.innerHTML = `Game Over <br><br> Score:${tour} `

    const gameOverRestart = document.createElement("div");
    gameOverRestart.innerHTML = "Play Again";
    gameOverRestart.className = "btn btn-light  px-5 mt-5 fs-1 fw-bold";


    gameOverScreen.appendChild(gameOverTexts);
    gameOverScreen.appendChild(gameOverRestart);

    gameOverRestart.addEventListener("click", () => getRestartButton());

    gameScreen.appendChild(gameOverScreen);


}

function getRestartButton() {
    document.location.reload();
}