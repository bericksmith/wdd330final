import { apiOptions } from './config.mjs';

const url = 'https://major-league-baseball-mlb.p.rapidapi.com/team-info/52';

async function fetchTeamInfo() {
    try {
        const response = await fetch(url, apiOptions);
        const data = await response.json();
        const display = document.getElementById('teamInfoContent');
        display.textContent = JSON.stringify(data, null, 2);  // Displaying formatted JSON data
    } catch (error) {
        console.error('Failed to fetch team info:', error);
        document.getElementById('teamInfoContent').textContent = 'Failed to load team info.';
    }
}


fetchTeamInfo();