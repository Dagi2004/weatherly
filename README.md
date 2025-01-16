# Weatherly Dashboard 🌦️

A simple and intuitive weather dashboard built with **HTML**, **CSS**, and **JavaScript** that allows users to search and view current weather conditions in any city. The application fetches real-time weather data from the **OpenWeatherMap API**, displaying information such as temperature, humidity, wind speed, and a 5-day forecast.

## Features

- **City Search Functionality**: Enter any city name to view current weather conditions.
- **Real-Time Weather Data**: Displays current temperature, humidity, wind speed, and weather condition with an icon.
- **5-Day Forecast**: Shows a daily forecast with temperature and weather conditions for the next five days.
- **Auto-Refresh**: Weather data automatically refreshes every 5 minutes to keep information up to date.
- **Geolocation**: Option to automatically fetch weather for the user’s current location (if permissions are granted).
- **Responsive Design**: Optimized for mobile, tablet, and desktop screens using vanilla CSS.

## Technologies Used

- **HTML**: For creating the structure of the application.
- **CSS**: Vanilla CSS for styling and layout.
- **JavaScript**: Fetch API to handle API requests and dynamic content updates.
- **OpenWeatherMap API**: For fetching real-time weather data.
- **Netlify**: Used for deployment.

## How It Works

1. **Search**: Users can search for any city worldwide by typing in the search bar and pressing "Search."
2. **Weather Display**: The app displays the current weather, including temperature, humidity, wind speed, and weather condition icon.
3. **Forecast**: A 5-day forecast is shown, with details for each day like the expected temperature and weather conditions.
4. **Error Handling**: If an invalid city is entered, or there’s an issue fetching data, the app will show a user-friendly error message.
5. **Geolocation**: Users can allow the app to detect their current location and display the weather for that area automatically.

## Setup Instructions

1. Clone this repository:
   ```bash
   git clone https://github.com/AsratY/weatherly.git
   ```

2. Navigate into the project directory:
   ```bash
   cd weather-dashboard
   ```

3. Open the `index.html` file in your preferred browser.

## Deployment

This project is deployed and hosted on **Netlify**. You can view the live version of the weather dashboard here: https://weatherly-dashboard.netlify.app/

## API Key

This project uses the **OpenWeatherMap API**. To use the project locally, you need to obtain an API key:
1. Sign up for an account at [OpenWeatherMap](https://home.openweathermap.org/users/sign_up).
2. Generate an API key from your account.
3. Replace the API key in the `script.js` file:
   ```javascript
   const apiKey = 'your-api-key';
   ```

## Issues Faced

- **Deprecated API Endpoints**: Initially faced issues using outdated endpoints of the OpenWeatherMap API, which required switching to newer API versions.
- **Deployment Security**: Encountered security warnings due to HTTP weather icon URLs, which was fixed by using HTTPS for secure content delivery.

## Future Improvements

- **Weekly Forecast**: Expand the app to display a 7-day forecast.(now it displays 5-days)
- **Enhanced Design**: Implement additional styling using a CSS framework like Tailwind CSS for faster development and a more modern UI.

