import { apiOptions } from './config.mjs';

function generateUrl() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `https://major-league-baseball-mlb.p.rapidapi.com/scoreboard?year=${year}&month=${month}&day=${day}`;
}

export async function fetchScoreboard() {
    const url = generateUrl();
    try {
        const response = await fetch(url, apiOptions);
        const data = await response.json();
        const display = document.getElementById('scoreboardContent');
        display.innerHTML = formatScoreboardData(data);
    } catch (error) {
        console.error('Failed to fetch scoreboard:', error);
        document.getElementById('scoreboardContent').textContent = 'Failed to load scoreboard.';
    }
}

function formatScoreboardData(data) {
    if (!data.leagues || data.leagues.length === 0) {
        return 'No league data available.';
    }

    const league = data.leagues[0];
    let eventsFormatted = league.events.map(event => {
        const competition = event.competitions && event.competitions[0];
        const venue = competition && competition.venue ? competition.venue : { fullName: 'Unknown Venue', address: {} };
        const teamInfo = competition && competition.competitors ? competition.competitors.map(team => 
            `<li>${team.team.displayName} (Score: ${team.score})</li>`).join('') : '<li>No team info available.</li>';

        return `
            <div>
                <h3>${event.name} - ${new Date(event.date).toLocaleDateString()}</h3>
                <p>Venue: ${venue.fullName}, ${venue.address.city}, ${venue.address.state}</p>
                <ul>${teamInfo}</ul>
            </div>
        `;
    }).join('');

    return `<h2>${league.name}</h2><div>${eventsFormatted}</div>`;
}

fetchScoreboard(); 
