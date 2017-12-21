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
    var html = getForecastHtml(zipCode);
    document.getElementById('forecastResults').innerHTML = html;
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

/* Returns an HTML table of the forecast.
*/
function getForecastHtml(zipCode) {
    try {
        var currentTemp = getCurrentTemperature(zipCode);
        var html = `<p>Current temperature = ${currentTemp}</p>`;
    }
    catch (err) {
        var html = `<p class="weatherError">Failed to get the weather.  ${err}</p>`;
    }
    return html;
}

/* Makes the web service call to return the current temperature.
*/
function getCurrentTemperature(zipCode) {
    var forecastText = callWebService(zipCode);
    var forecastJson = JSON.parse(forecastText);
    return forecastJson.main.temp.toFixed(0);
}

/* Makes the web service call and returns the JSON.
*/
function callWebService(zipCode) {
    var forecast = `
{
    "coord":{
        "lon":-122.08,
        "lat":37.39
    },
    "weather":[
        {
            "id":500,
            "main":"Rain",
            "description":"light rain",
            "icon":"10n"
        }
    ],
    "base":"stations",
    "main":{
        "temp":34.7,
        "pressure":1025,
        "humidity":86,
        "temp_min":275.15,
        "temp_max":279.15
    },
    "visibility":16093,
    "wind":{
        "speed":1.67,
        "deg":53.0005
    },
    "clouds":{
        "all":1
    },
    "dt":1485788160,
    "sys":{
        "type":1,
        "id":471,
        "message":0.0116,
        "country":"US",
        "sunrise":1485789140,
        "sunset":1485826300
    },
    "id":5375480,
    "name":"Mountain View",
    "cod":200
}`
    var appID = getWeatherKey();
    console.log('KEY: ', appID);
    
    var weather_script = document.createElement('script');
    weather_script.src = `http://samples.openweathermap.org/data/2.5/weather?q=London,uk&callback=test&appid=${appID}`;
    weather_script.type = 'text/javascript';
    weather_script.async = true;
    weather_script.id = 'scriptForJSONP';
    document.querySelector('head').appendChild(weather_script);
    return 'yo';
    //return xhttp.responseText;
}

function test(response) {    
    console.log('RESPONSE:', response);
    
    /* Clean up DOM. */
    var weather_script = document.getElementById('scriptForJSONP');
    if (weather_script != null) {
        //weather_script.parentNode.removeChild(weather_script);
    }
}

