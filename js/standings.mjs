import { apiOptions } from './config.mjs';

const url = 'https://major-league-baseball-mlb.p.rapidapi.com/standings?year=2024';

async function fetchStandings() {
    try {
        const response = await fetch(url, apiOptions);
        const data = await response.json();
        displayStandings(data);
    } catch (error) {
        console.error('Failed to fetch data:', error);
        document.getElementById('standingsContent').textContent = 'Failed to load data.';
    }
}

function displayStandings(data) {
    const standingsContent = document.getElementById('standingsContent');
    if (!data || !data.standings || !data.standings.entries) {
        standingsContent.textContent = 'No data available';
        return;
    }

    const entries = data.standings.entries;
    let tableHTML = '<table border="1">';
    tableHTML += '<tr><th>Team</th><th>Wins</th><th>Losses</th><th>Win %</th><th>Games Back</th><th>Streak</th></tr>';

    entries.forEach(entry => {
        tableHTML += `
            <tr>
                <td>${entry.team.displayName}</td>
                <td>${entry.stats.find(stat => stat.name === 'wins').displayValue}</td>
                <td>${entry.stats.find(stat => stat.name === 'losses').displayValue}</td>
                <td>${entry.stats.find(stat => stat.name === 'winPercent').displayValue}</td>
                <td>${entry.stats.find(stat => stat.name === 'gamesBehind').displayValue}</td>
                <td>${entry.stats.find(stat => stat.name === 'streak').displayValue}</td>
            </tr>
        `;
    });

    tableHTML += '</table>';
    standingsContent.innerHTML = tableHTML;
}

fetchStandings();

