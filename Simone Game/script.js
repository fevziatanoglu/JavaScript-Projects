// game buttons
const buttons = document.querySelectorAll(".button");
const buttonArray = Array.from(buttons);

// game screen
const gameScreen = document.querySelector(".game-container");

// game data 
const turnText = document.querySelector(".turn-text");
const tourText = document.querySelector(".tour-text");
const accordingText = document.querySelector(".according-text");

// start button navbar
const startButtonNavbar = document.querySelector(".start-btn-navbar");
startButtonNavbar.addEventListener("click", () => { if (!isStart) { getStart(); isStart = true; } });

// start button
const startButton = document.querySelector(".start-btn");
startButton.addEventListener("click", () => { if (!isStart) { getStart(); isStart = true; startButton.style.opacity = "50%"; turnText.style = "animation:none"; clearInterval(changeColorsIntervial)} });

// restart button
const restartButton = document.querySelector(".restart-btn");
restartButton.addEventListener("click", getRestartButton);

// github button
const githubButton = document.querySelector(".github-btn");
githubButton.addEventListener("click", () => { window.open("https://github.com/fevziatanoglu/JavaScript-Projects") })

// variables
let isStart = false;
let isClick = false;
let isUserTurn = false;
let tour = 1;
let userClickAmount = 0;
let indexArray = [];
let userIndexArray = [];
let buttonColorsArray = [];
let isAccordingColor = false;

// buttons events
buttonArray.forEach(button => {
    button.addEventListener("click", () => { userClick(button); })
});

// before the start of game
// constantly change colors
// and light up click to start text
let changeColorsIntervial =  setInterval(() => {
    changeColors();
}, 1000);

clickToStartText();


// light up related button
async function turnOnButton(button) {

    const buttonColor = window.getComputedStyle(button).backgroundColor;
    console.log(buttonColor);

    button.style.boxShadow = `0px 0px 50px 20px ${buttonColor}`;
    button.style.opacity = "100%";
    button.style.border = "2px solid";
    //wait before this button turn off
    await waitFor(700);
    turnOffButton(button);
}





async function userClick(button) {

    // if a button've not already clicked and this is user turn
    if (!isClick && isUserTurn) {

        isClick = true;

        // get index of button that clicked by user
        // and push this index in userIndexArray
        const userIndex = buttonArray.indexOf(button);
        userIndexArray.push(userIndex);


        // light up this button
        await turnOnButton(button);

        // compare it with correct index or correct color
        compareIndex(button);

        isClick = false;
        userClickAmount++;
    }

    // if user turn is over get next function
    if (userClickAmount >= indexArray.length) {
        getStart();
        userClickAmount = 0;
        userIndexArray = [];
        buttonColorsArray = [];
    }
}




// light of related button
function turnOffButton(button) {
    button.style.boxShadow = "none";
    button.style.opacity = "50%";
    button.style.border = "none";

}

// wait for related second
async function waitFor(second) {
    return new Promise(response => setTimeout(response, second))
}





async function getStart() {


    isUserTurn = false;
    turnText.textContent = "Pc Turn";
    accordingText.textContent = "According to ...";

    // wait before pc turn
    await waitFor(1000);

    tour++;

    // get a randomIndex between 0- lenght of button array and push it in indexArray to get random button light up
    // put one more random index at every tour
    const randomIndex = Math.floor(Math.random() * buttonArray.length);
    indexArray.push(randomIndex);

    for (let i = 0; i < indexArray.length; i++) {


        const index = indexArray[i];

        // get random button and light up it
        const randomButton = buttonArray[index];
        await turnOnButton(randomButton);

        buttonColorsArray.push(randomButton.style.backgroundColor);


        // wait before new button turn on
        await waitFor(1000);
    }



    // get next tour
    nextTour();
}

function nextTour() {
    // game datas
    tourText.textContent = `Tour: ${indexArray.length}`;
    turnText.textContent = "User Turn";
    isUserTurn = true;
    changeColors();

    // get random according to (as color or as place);
    isAccordingColor = Math.floor(Math.random() * 2);

    if (isAccordingColor) {
        accordingText.textContent = "According to Color!";

    } else {
        accordingText.textContent = "According to place!";
    }
}

function compareIndex(button) {


    const correctIndex = indexArray[userClickAmount];
    const userCurrentIndex = userIndexArray[userClickAmount];

    const correctButton = buttonArray[correctIndex];
    const userButton = button;

    // if it looking for accorting to color
    if (isAccordingColor) {

        // compare colors
        if (buttonColorsArray[userClickAmount] == userButton.style.backgroundColor) {
            console.log("correct");
        } else {
            gameOver();
        }
    }
    // if it's not according to color( according to place)
    else {


        // compare indexes
        if (userCurrentIndex == correctIndex) {
            console.log("correct");
        }
        else {
            gameOver();
        }



    }







}

// game over screen
function gameOver() {

    isUserTurn = false;

    const gameOverScreen = document.createElement("div");
    gameOverScreen.className = "game-over centered p-5 my-5 fw-bold display-2 text-light bg-success  border border-4 border-light";

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

function changeColors() {
    let colorArray = ["rgb(255,0,0)", "rgb(0,128,0)", "rgb(255,255,0)", "rgb(0,0,255)"];

    buttonArray.forEach(button => {
        const randomIndex = Math.floor(Math.random() * colorArray.length);
        const randomColor = colorArray[randomIndex];
        button.style.backgroundColor = randomColor;

        colorArray.splice(randomIndex, 1);
    });
}

function clickToStartText() {
        turnText.style = "animation: click-to-start 2s infinite"
}




    

   

    



