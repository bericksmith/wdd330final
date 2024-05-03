import { apiOptions } from './config.mjs';

const url = 'https://major-league-baseball-mlb.p.rapidapi.com/schedule?year=2024&month=05&day=03';

export async function fetchSchedule() {
    try {
        const response = await fetch(url, apiOptions);
        const data = await response.json();
        const display = document.getElementById('scheduleContent');
        display.innerHTML = formatScheduleData(data);
    } catch (error) {
        console.error('Failed to fetch schedule:', error);
        document.getElementById('scheduleContent').textContent = 'Failed to load schedule.';
    }
}

function formatScheduleData(data) {
    let games = data['20240503'].games;
    let formattedHtml = games.map(game => {
        let venueInfo = game.competitions[0].venue;
        let gameDetails = `
            <h3>${game.name}</h3>
            <p>Date: ${new Date(game.date).toLocaleString()}</p>
            <p>Venue: ${venueInfo.fullName}, ${venueInfo.address.city}, ${venueInfo.address.state}</p>
            <p>Leaders and Stats:</p>
            <ul>
                ${game.competitions[0].leaders.map(leader => `
                    <li>${leader.displayName}: ${leader.leaders.map(l => `${l.athlete.displayName} - ${l.displayValue}`).join(', ')}</li>
                `).join('')}
            </ul>
        `;
        return gameDetails;
    }).join('');

    return formattedHtml;
}



fetchSchedule();