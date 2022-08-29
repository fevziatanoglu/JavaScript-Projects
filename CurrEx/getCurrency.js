// fetch("https://api.exchangerate.host/latest").then(response =>response.json()).then(response => console.log(response.rates.TRY));

export default async function getCurrency(baseCurrency , outputCurrency , amounth){
    const currency = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
    .then(response =>response.json())
    .then(response => eval(`response.rates.${outputCurrency}`));
    return currency*amounth;
}






