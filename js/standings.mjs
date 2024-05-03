import { apiOptions } from './config.mjs';

const url = 'https://major-league-baseball-mlb.p.rapidapi.com/standings?year=2024';

async function fetchStandings() {
    try {
        const response = await fetch(url, apiOptions);
        const data = await response.json();
        const display = document.getElementById('standingsContent');
        display.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Failed to fetch data:', error);
        document.getElementById('standingsContent').textContent = 'Failed to load data.';
    }
}

fetchStandings();
