
export default async function getWord(language){

     const randomIndex = Math.floor(Math.random() * 10);

     const data = await fetch(`./words/${language}.json`)
     .then(response=>response.json())
     .then(response=>response.words[randomIndex])
     .then(word=>JSON.stringify(word)
     .replace(/"/g,'')
     .replace(/ç/g,"c")
     .replace(/ö/g,"o")
     .replace(/ş/g,"s")
     .replace(/ı/g,"i")
     .replace(/ğ/g,"g")
     .replace(/ü/g,"u")
     .toUpperCase());
     return data;
}