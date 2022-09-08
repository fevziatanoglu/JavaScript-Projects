let flipCounter = 0;

// cards
const cards = document.querySelectorAll(".memory-card");
let cardArray = Array.from(cards);
let selectedCards = [];
cardArray.forEach(card => {card.addEventListener("click" , ()=> {flipCard(card);});});

 // buttons
// restart button
const restartButton = document.querySelector(".restart-btn");
restartButton.addEventListener("click" , ()=> getRestartButton());




function flipCard(card){

    selectedCards.push(card);

    if(card.style.background == "green"){
        return selectedCards.pop();
    }

    if(flipCounter == 0 && card.style.background != "green"){

        flipCounter++;
        //toggle : varsa cıkar yoksa ekle
        card.classList.toggle("flip");

    }
    
    else if(flipCounter == 1 && selectedCards[0].id != selectedCards[1].id && card.style.background != "green"){
        flipCounter++;
        //toggle : varsa cıkar yoksa ekle
        card.classList.toggle("flip");
    }

    else{
        selectedCards.pop();
    }



    if(flipCounter == 2){
        compareCards();
    }
    
}



 function compareCards(){
    const card1Content = selectedCards[0].children[1].innerHTML;
    const card2Content = selectedCards[1].children[1].innerHTML;

    if(card1Content == card2Content){
        console.log("ayni");

        setTimeout(() => {

         
        selectedCards[0].style = `animation: card-correct 0.35s ease-in-out`;
        selectedCards[1].style = `animation: card-correct 0.35s ease-in-out`;

        selectedCards[0].style.background = "green";
        selectedCards[1].style.background = "green";

        selectedCards = [];
        flipCounter = 0;

        }, 1000);

    }

    else{
        console.log("farkli");


        setTimeout(() => {
        selectedCards[0].classList.toggle("flip");
        selectedCards[1].classList.toggle("flip");


        selectedCards = [];
        flipCounter = 0;
        }, 1000);
        
    }



    }




    function getRestartButton(){
        window.location.reload();
    }

