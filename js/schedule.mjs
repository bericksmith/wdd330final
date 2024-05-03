import { apiOptions } from './config.mjs';

const url = 'https://major-league-baseball-mlb.p.rapidapi.com/schedule?year=2022&month=10&day=05';

async function fetchSchedule() {
    try {
        const response = await fetch(url, apiOptions);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

fetchSchedule();