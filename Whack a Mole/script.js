const holes = document.querySelectorAll(".hole");
const holeArray = Array.from(holes);
holeArray.forEach(hole => {hole.addEventListener("click" , ()=> clickHole(hole))});

const timeText = document.querySelector(".time");
const scoreText = document.querySelector(".score");

const startButton = document.querySelector(".start-btn");
startButton.addEventListener("click", ()=>getStartButton());




const pauseButton = document.querySelector(".pause-btn");
pauseButton.addEventListener("click", ()=>getPauseButton());



const resetButton = document.querySelector(".reset-btn");
resetButton.addEventListener("click", ()=>getResetButton());



let isPunch = false;
let holeIndex =0;
let gamespeed = 1000;
let score =0;
let time = 60;
let isStart = false;



function getRandomHole(){

const randomIndex = Math.floor(Math.random() * holeArray.length);
holeIndex = randomIndex;
holeArray[holeIndex].style.background = "red";

}


function clickHole(hole){
    if(hole.style.background =="red"){
    clearHole();
    score++;
    console.log(score);
    }
   

    }


function clearHole(){
        holeArray[holeIndex].style.background = "black";
    }



    // hole control
    setInterval(() => {
        if(isStart){
        clearHole();
        getRandomHole();
        gamespeed-=10;
        console.log(gamespeed);
        }

    }, 1500);


    // time and score control
    setInterval(() => {
        if(isStart){
            time--;
            console.log(time);
            timeText.textContent = `Time: ${time}`;
        }
        
    }, 1000);


  


function getStartButton(){
    isStart = true;
    startButton.style.opacity = "75%";
    pauseButton.style.opacity = "100%";
}

function getPauseButton(){
    isStart = false;
    pauseButton.style.opacity = "75%";
    startButton.style.opacity = "100%";
}

function getResetButton(){
    window.location.reload();
}


















async function waitFor(second){
    return new Promise(response => setTimeout(() => {}, second))
}