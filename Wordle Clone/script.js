import getWord from "./wordAPI.js";

const gameScreen = document.querySelector(".game-screen");

//keyboard keys
const keys = document.querySelectorAll(".key-btn");
const keyArray = Array.from(keys);

const enterKey = document.querySelector(".enter-btn");
enterKey.addEventListener("click" , ()=>getEnterKey());

const deleteKey = document.querySelector(".delete-btn");
deleteKey.addEventListener("click" , ()=>getDeleteKey());


//rows
const rows = document.querySelectorAll(".word-row");
const rowArray = Array.from(rows);





//api'dan kelime al
//alinan kelimeyi buyuk harf yap
let word = await getWord().then(response => response.toUpperCase());

//alinan kelimenin harflerinden array
const wordArray = word.split("");
console.log(word);




//hangi row'a yazilacagini belirlemek icin
let tour =0;

//ilgili row'da , yazilacak box'u bulmak icin
let boxIndex =0;

//oyunun bitimini sorgulamak icin
let point =0;

//tiklanilan tuslara ulasmak icin
let currentKeyArray =[];






keyArray.forEach(key=> {key.addEventListener("click" , ()=>getKey(key));});





function getKey(key){
    //sirasi gelen row un icindeki , sirasi gelen box'un icine
    //klavyeden tikladiğimiz tusun sahip olduğu harfi , ilgili box'a yazan function


    //5. ve oncesindeki boxlardan sonra yazmaya devam etmememiz icin
    //box index 4 ten buyuk ise box'ların icine yazmaz 
    if(boxIndex<=4){

    //tur sayisi hangi rowda oldugumuzu    
    const currentRow = rowArray[tour];
    //boxindex rowun icinde hangi kutuda oldugumuzu belirtir
    const currentBox = currentRow.children[boxIndex];
    //tikladigimiz tusun sahip olduğu harf currentLetter olarak isaretlenir
    const currentLetter = key.innerHTML;

    //sirasi gelen box'un icine tiklanılan harfi yazar
    currentBox.innerHTML = currentLetter;
    
    //tikladıgımız tus daha sonra kullanılmak icin arraya pushlanır
    currentKeyArray.push(key);

    console.log(boxIndex);

    //islem bittikten sonra diger kutuya gecmek icin 
    //box indexi 1 arttırır
    boxIndex++;
    }
}





function getEnterKey(){
    //enter key'e tikladigimizda
    //girilen kelimeyi sorgulayan funciton

    //eger 5 kutu da dolu ise
    //yani box indexi 5 defa arttirdiysak calisir
if(boxIndex ==5){
    

    //ilgili turdaki row'un icindeki her box'un harfini
    //kelimenin icinde bulunan ayni indexteki harf ile karsilastirir
    for (let index = 0; index < 5; index++) {

        //ilgili turdaki row cagirilir
        const currentRow = rowArray[tour];

        //ilgili turdaki row'un ilgili box'u cagirilir
        const currentBox = currentRow.children[index]
        
        const currentLetter = currentBox.innerHTML;

        //aranan kelimenin ilgili indexteki harfi
        const currentTrueLetter = wordArray[index];
       
        //eger girilen harf , dogru harfe esit ise
        if(currentTrueLetter == currentLetter){

         //harfin parrent'i olan box'un arka plani yesil yapılır
         currentBox.classList.add("bg-success");
         currentBox.classList.add("border-success");

        //point , daha sonra oyunun kazanilip
        //kazanilmadigini sorgulamak icin 1 arttirilir
        point++;
        }
        
        //karsilastirilan harfler eşit değil ise ve
        //aranan kelime , ilgili indexteki kelimeyi iceriyor ise
        else if(wordArray.includes(currentLetter)){

        //ilgili box'un arka planini sari yap
        currentBox.classList.add("bg-warning");

        //getKey() in icinde daha sonra kullanılmak icin alinin keylerden
        //ilgili indextekini cagir ve arka planını beyaz yap
        currentKeyArray[index].classList.add("bg-light");
        

     }
     
       //eger harfler ayni degil ve 
       //aranan kelime girilen harfi icermiyor ise
       else{

        //ilgili indexteki key'in 
        //opacity'sini dusur
         currentKeyArray[index].classList.add("opacity-25");      
     }}
        
    //islem bittikten sonra diger tura
    //yani siradaki row'a geç
    nextTour();}}





function getDeleteKey(){
    //yazilan harfi silen func

    //eger herhangi bir harf yazılıysa
    //yani boxIndex en az 1 kere arttirilmis ise
    if(boxIndex>0){
        
        const currentRow = rowArray[tour];
        const currentBox = currentRow[boxIndex]; 

        //ilgili kutunun icindeki harfi sil
        currentBox.textContent = "";
        //getKey'de isaretlenen keyi arrayden sil
        currentKeyArray.pop();
        //silinen box'un indexine geri donmek icin
        //box indexi 1 azalt
        boxIndex--;
    }}





function nextTour(){
    //enterKey den sonra diger rowa gecmeyi saglayan func


    //diger tura gecmeden once 
    //oyunun bitip bitmedigini sorgular

    //point 5 ise yani tum harfler dogru bulunmus ise
    //veya tum turlar(rowlar) bitmis ise oyunu bitir
    if(point === 5 || tour >=4){

        //eger oyun bittiyse
        //1 saniye sonra
        //endGame func'u cagir
        setTimeout(() => {
            endGame();
        }, 1000);
        
        //eger oyun devam ediyor ise 
    }else{

        //siradaki row'a gecmek icin tour'u 1 arttır
        tour++;

        //diger turda oyunun kazanilmasini
        //sorgulamak icin pointi 0 yap
        point =0;

        //en bastaki box'un icine
        //yazmak icin boxIndex'i 0 yap
        boxIndex =0;

        //isaretlenen key'lerin arrayini bosalt
        currentKeyArray = [];
        
        //ilgili turdaki row'un box'larinin
        //border'ini beyaz yap
        for (let index = 0; index < 5; index++) {
        const currentRow = rowArray[tour];
        const currentBox = currentRow.children[index];

        currentBox.classList.add("border-light");
       }}}





function endGame(){
    
    //eger 5 harf'de bulunmus ise
    //yani 1 turda point 5 defa arttirilmis ise
    if(point ==5){

    //kazanma ekrani
    const youWinScreen = document.createElement("div");
    youWinScreen.innerHTML = `<div class=" opacity-100 bg-success centered fw-bold  text-center border border-5 rounded fixed display-2 p-5">
    <div>YOU WIN!! <br> Congratulation<br><p class="text-light display-1 fw-bold">"${word}"</p> </div>
    <hr class="m-5 opacity-100">
    <div class="opacity-100 btn bg-dark text-light fw-bold fs-1 p-5" style="height: 20vh; width: 50vw;;">Play Again</div>
    </div>`;

    //ekranin icindeki butona tekrar basşatma func'u ata
   youWinScreen.children[0].children[2].addEventListener("click" , ()=>{window.location.reload()});

   //ilgili ekrani oyun ekranina ekle
   gameScreen.appendChild(youWinScreen);
    }
    

    //eger tur sayisi bitmis ise
    else if(tour =>4){

    //gameover ekrani
    const gameOverScreen = document.createElement("div");

    gameOverScreen.innerHTML = `<div class=" opacity-75 bg-secondary centered fw-bold display-2 text-center border border-5 rounded fixed">
    <div class="opacity-100">Game Over <br>Your word was <br><p class="text-light display-1 fw-bold">${word}</p> </div>
    <hr class="m-5 opacity-100">
    <div class="opacity-100 btn bg-dark text-light fw-bold fs-1 p-5" style="height: 20vh; width: 50vw;;">Play Again</div>
    </div>`;
    //ilgili ekrani oyun ekranina ekle
    //gameover ekraninin icindeki buttona tekrar baslatan func'u ata
   gameOverScreen.children[0].children[2].addEventListener("click" , ()=>{window.location.reload()});

   //ilgili ekrani oyun ekranina ekle
   gameScreen.appendChild(gameOverScreen);
    }}





