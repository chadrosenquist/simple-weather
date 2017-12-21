# Simple Weather
Simple web page to get the weather.

# Setup
## API Key
Sign up for your API key at:
https://openweathermap.org/api

Then copy:
`cp weather-key.js-TEMPLATE weather-key.js`

Edit `weather-key.js` and add your API key.  `weather-key.js` is in `.gitignore` so you don't accidentally commit your key.


# Design
## Error Handling
If the weather web service is down, or an error occurs, this application displays a meaningful error message to the user.
For security, it is good practice to log a detailed error on the server, and display a generic message on the client.
But this is a simple client-only application with no server, and I am the only user.  So meaningful errors are displayed.

