import { weatherApiOptions } from './config.mjs';

async function fetchWeather() {
    const locationData = localStorage.getItem('teamLocation');

    let location = 'Atlanta, Georgia';
    if (locationData) {
        try {
            const parsedLocation = JSON.parse(locationData);
            if (parsedLocation.city && parsedLocation.state) {
                location = `${parsedLocation.city}, ${parsedLocation.state}`;
            }
        } catch (error) {
            console.error('Error parsing location data:', error);
        }
    }

    const encodedLocation = encodeURIComponent(location);
    const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${encodedLocation}&format=json&u=f`;

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
            <h3>Current Weather in ${location.city}</h3>
            <p><strong>Temperature:</strong> ${current.condition.temperature}°F, ${current.condition.text}</p>
            <p><strong>Wind:</strong> ${current.wind.speed} mph ${current.wind.direction}</p>
            <p><strong>Humidity:</strong> ${current.atmosphere.humidity}%</p>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', async () => {
    const weatherHTML = await fetchWeather();
    document.getElementById('weatherDisplay').innerHTML = weatherHTML;
});

export { fetchWeather };
