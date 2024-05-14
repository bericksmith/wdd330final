import { weatherApiOptions } from './config.mjs';

// Function to fetch current weather data for Boston, Massachusetts
async function fetchWeather() {
    const url = 'https://yahoo-weather5.p.rapidapi.com/weather?location=Boston%2C%20Massachusetts&format=json&u=f';
    try {
        const response = await fetch(url, weatherApiOptions);
        const weatherData = await response.json();
        return formatWeatherData(weatherData);
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        return `<p>Error fetching weather data: ${error.message}</p>`;
    }
}

function formatWeatherData(data) {
    const location = data.location;
    const current = data.current_observation;
    return `
        <div class="weather-report">
            <h2>Current Weather in ${location.city}, ${location.country}</h2>
            <p><strong>Temperature:</strong> ${current.condition.temperature}°F, ${current.condition.text}</p>
            <p><strong>Wind:</strong> ${current.wind.speed} mph ${getWindDirection(current.wind.direction)}</p>
            <p><strong>Humidity:</strong> ${current.atmosphere.humidity}%</p>
            <p><strong>Pressure:</strong> ${current.atmosphere.pressure} mb</p>
            <p><strong>Visibility:</strong> ${current.atmosphere.visibility} miles</p>
            <p><strong>Sunrise:</strong> ${current.astronomy.sunrise}</p>
            <p><strong>Sunset:</strong> ${current.astronomy.sunset}</p>
        </div>
    `;
}

function getWindDirection(degree) {
    const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
    const index = Math.round(((degree % 360) / 45)) % 8;
    return directions[index];
}

document.addEventListener('DOMContentLoaded', async () => {
    const weatherHTML = await fetchWeather();
    document.getElementById('weatherDisplay').innerHTML = weatherHTML;
});

export { fetchWeather };
