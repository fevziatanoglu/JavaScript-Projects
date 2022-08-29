import getCurrency  from "./getCurrency.js";

const inputSelect = document.querySelector(".input-select");
const outputSelect = document.querySelector(".output-select");

const inputAmounth = document.querySelector(".input-amounth");
const outputAmounth = document.querySelector(".output-amounth");

const enterButton = document.querySelector(".btn-enter");
enterButton.addEventListener("click" , enter)




const swapButton = document.querySelector(".btn-swap");
swapButton.addEventListener("click", swap);
function swap(){
    const inputValue = inputSelect.value;
    const outputValue = outputSelect.value;

    inputSelect.value = outputValue;
    outputSelect.value = inputValue;
}


async function enter(){
     console.log(`${inputAmounth.value} ${inputSelect.value} --> ${outputSelect.value}  ${await getCurrency(inputSelect.value , outputSelect.value,inputAmounth.value)}`);
     outputAmounth.value = await getCurrency(inputSelect.value , outputSelect.value,inputAmounth.value);
    }



      







