"use strict";

/* ======================================================================
   This section contains functions that handle the HTML and events.
   ======================================================================
*/

/* Performs the necessary getElementById's and calls the forecast function.
*/
function forecastButtonClick() {
    var zipCode = document.getElementById('zipCode').value;
    saveZipCode(zipCode);
    callWebService(zipCode);
}

/* If the user clicks 'Enter' while typing in the zip code,
   treat this like clicking the button.
*/
function forecastTextBoxTyping(event) {
    if (event.key == 'Enter') {
        forecastButtonClick();
    }
}

function pageLoad() {
    loadZipCode();
    selectZipCodeText();
}

/* Load the saved zip code.
*/
function loadZipCode() {
    var zipCodeValue = '';   // Default to no zip code.
    if (typeof(Storage) !== "undefined") {
        if (localStorage.simpleWeatherZipCode) {
            zipCodeValue = localStorage.simpleWeatherZipCode;
        }
    }
    document.getElementById('zipCode').value = zipCodeValue;
}

/* Save the zip code.
*/
function saveZipCode(zipCode) {
    if (typeof(Storage) !== "undefined") {
        localStorage.simpleWeatherZipCode = zipCode;
    }
}

/* Selects the text in the zip code box.  If users want to enter a new
   zip code, they can simply type and the old zip code gets deleted.
*/
function selectZipCodeText() {
    var zipCode = document.getElementById('zipCode');
    zipCode.setSelectionRange(0, zipCode.value.length);
}

/* ======================================================================
   This section contains functions make the actual web service call.
   ======================================================================
*/

/* Makes the web service call and returns the JSON.
*/
function callWebService(zipCode) {
    var appID = getWeatherKey();
    
    var weather_script = document.createElement('script');
    weather_script.src = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&callback=weatherResponse&appid=${appID}`;
    weather_script.type = 'text/javascript';
    weather_script.async = true;
    weather_script.id = 'scriptForJSONP';
    document.querySelector('head').appendChild(weather_script); 
}

function weatherResponse(response) {
    /* console.log('RESPONSE:', response); */
    
    var currentTemp = response.main.temp.toFixed(0);
    var html = `<p>Current temperature = ${currentTemp}</p>`;
        
    document.getElementById('forecastResults').innerHTML = html;
    
    /* Clean up DOM. */
    var weather_script = document.getElementById('scriptForJSONP');
    if (weather_script != null) {
        weather_script.parentNode.removeChild(weather_script);
    }
}

