# Simple Weather
I got tired of going to heavy duty, CPU intensive websites to get the weather forecast.
This is a simple website that retrieves the forecast using only HTML and Javascript.  A server is not required.
There are no ads.

# Requirements
* Requires browser to support HTML5 and ECMAScript 6.
* Only US zip codes are supported.
* Temperature is displayed in Fahrenheit.

# Setup
## API Key
Sign up for your API key at:
https://openweathermap.org/api

Then copy:
`cp weather-key.js-TEMPLATE weather-key.js`

Edit `weather-key.js` and add your API key.  `weather-key.js` is in `.gitignore` so you don't accidentally commit your key.


# Design
## `weather.html`
Basic HTML.  Loads scripts `weather-key.js` and `weather.js`.

Contains a textbox for the end-user to enter the zip code, a butto to click, and a `<div>` to display the results.

## `weather.css`
Basic CSS.

## `weather-key.js`
Contains function `getWeatherKey()`, which returns the key required to make the web service call.

## `weather.js`
When the page loads, the zip code is retrieved from local storage.
If no local storage, or the end-user's first time here, default to an empty string.
The cursor is placed in the zip code textbox with the zip code highlighted.

When the end-user clicks the "Get Forecast" button, or hits "Enter" while typing the zip code,
the open weather map API is invoked.  A `<script>` element is added to the HTML `<head>` section
that runs Javascript (JSONP) from open weather map.  Then the function `test()` is called with the
results.  The results are displayed in the `<div>` element.

# Testing
Currently, there are no automated tests.

