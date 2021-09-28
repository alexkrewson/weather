import "./sassystyle.scss";

let unit = 'F';
let high, low, unitText;

const img = document.querySelector('img');
const text = document.getElementById('h2Text');
const btn = document.getElementById('btn')
btn.addEventListener('click', loadJson)
const unitBtn = document.getElementById('units')
unitBtn.addEventListener('click', toggleUnits)

function toggleUnits() {
    if (unit == 'F') { unit = 'C' }
    else { unit = 'F' }
    loadJson()
}

async function loadJson() {
    const city = document.getElementById('city').value
    const state = document.getElementById('state').value
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + state + '&APPID=a9fec7b30dcd9fdba9ec7e45820f9cad';
    try {

        const weatherResponse = await fetch(url, { mode: 'cors' });
        const weatherData = await weatherResponse.json();

        if (unit == 'F') {
            high = Math.round(weatherData.main.temp_max * 9 / 5 - 459.67);
            low = Math.round(weatherData.main.temp_min * 9 / 5 - 459.67);
            unitText = ' &deg;F'
        } else {
            high = Math.round(weatherData.main.temp_max - 273.15);
            low = Math.round(weatherData.main.temp_min - 273.15);
            unitText = ' &deg;C'
        }
        text.innerHTML = weatherData.weather[0].description + ', high of ' + high + unitText + ', low of ' + low + unitText;

        const weatherText = weatherData.weather[0].main;
        const catResponse = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=ACl5wuZRck8a8B3i0G4xaYyo9nEUp2N8&s=' + weatherText, { mode: 'cors' });
        const catData = await catResponse.json();

        img.src = catData.data.images.original.url;

    } catch (err) {
        console.log('error error error')
        console.log(err);
    }



}
