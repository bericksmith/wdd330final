import { apiOptions } from './config.mjs';

const url = 'https://major-league-baseball-mlb.p.rapidapi.com/scoreboard?year=2024&month=05&day=03';

async function fetchScoreboard() {
    try {
        const response = await fetch(url, apiOptions);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

fetchScoreboard();