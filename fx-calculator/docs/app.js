// JavaScript source code
document.querySelectorAll('select').forEach(element => {
    element.innerHTML = `
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="CHF">CHF</option>
        <option value="SEK">SEK</option>
        <option value="BTC">BTC</option>
    `;
    // forEach -> interiert durch die Ergebnismenge
    // innerHTML -> damit kann der HTML-Inhalt des entsprechenden Elements angegeben werden
});

// const fixerUri = https://data.fixer.io/api/latest?base=EUR&symbols=USD,SEK,CHF&access_key=API_KEY
const fixerUri = 'fixer.json';

// inputValue -> Ausgabewert, inputCurrency -> Ausgabewährung, outputCurrency -> Zielwährung
async function convert(inputValue, inputCurrency, outputCurrency) {
    const response = await fetch(fixerUri);   // Währungskurs über die Fixer API abfragen
    const data = await response.json();   // Response Body
    // Währungsumrechnung:
    const rates = data['rates'];
    rates['EUR'] = 1.;
    return inputValue / rates[inputCurrency] * rates[outputCurrency];
}

// Runden von Währungen auf fixe Dezimalstellen
function round(value, decimals) {
    return (Math.round(value * 100) / 100).toFixed(decimals);
}

// Button Click -> anonymer EventListener für das Click-Event
// zur Selektierung aller wichtigen Werte aus dem DOM, welche zur Berechnung wichtig sind (inputValue, inputCurrency, outputCurrency)
document.querySelector('button').addEventListener('click', async () => {
    const inputCurrency = document.querySelector('[name="input-currency"]').value;
    const outputCurrency = document.querySelector('[name="output-currency"]').value;
    const inputValue = document.querySelector('[name="input-value"]').value;
    const outputValue = await convert(inputValue, inputCurrency, outputCurrency);
    document.querySelector('[name="output-value"]').value = round(outputValue, 2);   // round als schönere Darstellung zum Runden auf 2 Dezimalstellen
});