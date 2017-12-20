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
    var currentTemp = getCurrentTemperature(zipCode);
    var html = `<p>Current temperature = ${currentTemp}</p>`;
    return html;
}

/* Makes the web service call to return the current temperature. */
function getCurrentTemperature(zipCode) {
    return 50;
}
