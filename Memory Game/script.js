
// local storage
const myLocalStorage = window.localStorage;

// to sign clicked cards
let selectedCards = [];

// to check game over
let score = 0;

// to check click
let flipCounter = 0;

// levels
let rowAmount = myLocalStorage.getItem("rowAmount");
let cardAmount = myLocalStorage.getItem("cardAmount");
// if local storage is empty , fiil it with 4x4 as deafult
if (!myLocalStorage.getItem("rowAmount") && !myLocalStory.getItem("cardAmount")) {
    rowAmount = 4;
    cardAmount = 4;
}

// level text container
const levelText = document.querySelector(".level-text");
levelText.textContent = `${rowAmount}x${cardAmount}`



// gamecontainer to add row and cards
const gameScreen = document.querySelector(".game-container");

// BUTTONS

// start button
let isStart = false;
const startButton = document.querySelector(".start-btn");
startButton.addEventListener("click", () => {
    // if game not started
    if (!isStart) {
        getStartButton();
    }
});



// restart button
const restartButton = document.querySelector(".restart-btn");
restartButton.addEventListener("click", () => getRestartButton());



// level buttons
const button4x3 = document.querySelector(".btn-4x3");
const button4x4 = document.querySelector(".btn-4x4");
const button6x6 = document.querySelector(".btn-4x5");
const levelButtonArray = [button4x3, button4x4, button6x6];

levelButtonArray.forEach(
    levelbutton => {
        levelbutton.addEventListener("click", () => {
            myLocalStorage.setItem("rowAmount", levelbutton.textContent.charAt(0));
            myLocalStorage.setItem("cardAmount", levelbutton.textContent.charAt(2))

            getRestartButton();

        })
    });


// github button
const githubButton = document.querySelector(".github-btn");
githubButton.addEventListener("click", () => window.open("https://github.com/fevziatanoglu/JavaScript-Projects/tree/main/Memory%20Game"));






// start game
function getStartButton() {


    for (let rowIndex = 0; rowIndex < rowAmount; rowIndex++) {
        // create row
        const row = document.createElement("div");
        row.className = "memory-card-row pagination justify-content-center";

        for (let cardIndex = 0; cardIndex < cardAmount; cardIndex++) {
            // create card
            const card = document.createElement("div");
            card.className = "memory-card rounded  m-1 fw-bold fs-2 text-secondary  border border-4 d-flex justify-content-center align-items-center";
            // define an id as first number row index , second number card index
            card.setAttribute("id", `${rowIndex}${cardIndex}`);

            // create faces

            // front face
            const frontFace = document.createElement("div");
            frontFace.textContent += "?";
            frontFace.className = "front-face";
            // back face
            const backFace = document.createElement("div");
            backFace.textContent += "a";
            backFace.className = "back-face";

            // append faces
            card.appendChild(backFace);
            card.appendChild(frontFace);



            // append card in row
            row.appendChild(card);

        }

        // append row in gameScreen
        gameScreen.appendChild(row);

    }

    // define all cards in array
    const cards = document.querySelectorAll(".memory-card");
    let cardArray = Array.from(cards);

    // add event all cards 
    cardArray.forEach(card => { card.addEventListener("click", () => { flipCard(card); }); });

    // to not can click click start button many times
    isStart = true;
}


function flipCard(card) {

    // sign clicked card
    selectedCards.push(card);

    // if card already correct
    if (card.style.background == "green") {

        // unsing
        return selectedCards.pop();
    }

    // if it's first click and card is not correct before
    if (flipCounter == 0 && card.style.background != "green") {

        flipCounter++;
        //toggle : if class name exist => remove , if not exist add it
        card.classList.toggle("flip");
        // flip => rotatey(180deg)

    }

    // if it's second click and same card not clicked and card is not correct before
    else if (flipCounter == 1 && selectedCards[0].id != selectedCards[1].id && card.style.background != "green") {

        flipCounter++;

        // flip it as well
        card.classList.toggle("flip");

        // compare cards
        compareCards();
    }








}



function compareCards() {
    console.log("to compare")

    // define cards with sign array
    // const card1Content = selectedCards[0].children[1].innerHTML;
    // const card2Content = selectedCards[1].children[1].innerHTML;
    const card1 = selectedCards[0];
    const card2 = selectedCards[1];

    const card1Content = card1.children[0].textContent;
    const card2Content = card2.children[0].textContent;

    

    // if cards content is same
    if (card1Content == card2Content) {
        

        setTimeout(() => {

            
            card1.style = `animation: card-correct 0.35s ease-in-out`;
            card2.style = `animation: card-correct 0.35s ease-in-out`;

            card1.style.background = "green";
            card2.style.background = "green";

            flipCounter = 0;
            selectedCards = [];

            score++;

            if(score == rowAmount*cardAmount/2){
                gameOver();
            }

        }, 1000);

    }

    // if they not same
    else {
        

        setTimeout(() => {
            card1.classList.toggle("flip");
            card2.classList.toggle("flip");


            selectedCards = [];
            flipCounter = 0;
        }, 1000);

    }


}

// gameover
function gameOver(){
    console.log("game over");
}

// restart
function getRestartButton() {
    window.location.reload();
}

