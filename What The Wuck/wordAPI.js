
// https://random-turkish-word-api.herokuapp.com/words?/number=5
// https://random-word-api.herokuapp.com/word?length=5
export default async function getWord(){

return await fetch("https://random-word-api.herokuapp.com/word?length=5")
.then(response => response.json())
.then(response => response[0]);
}
