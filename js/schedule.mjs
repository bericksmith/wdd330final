import { apiOptions } from './config.mjs';

const url = 'https://major-league-baseball-mlb.p.rapidapi.com/schedule?year=2022&month=10&day=05';

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
    console.log("Data received:", data);  // Log to see the full structure of the received data
    // First, ensure that the data for the specific date and games exists
    if (!data['20221005'] || !data['20221005'].games) {
        console.error('No games data available for the specific date');
        return 'No games scheduled for this date.';
    }

    let games = data['20221005'].games;

    let formattedHtml = games.map(game => {
        // Check for existence of competitions and venue data before accessing
        if (!game.competitions || !game.competitions[0].venue) {
            return '<p>Competition or venue data missing.</p>';
        }
        let venueInfo = game.competitions[0].venue;
        let gameDetails = `
            <h3>${game.name}</h3>
            <p>Date: ${new Date(game.date).toLocaleString()}</p>
            <p>Venue: ${venueInfo.fullName}, ${venueInfo.address.city}, ${venueInfo.address.state}</p>
            <p>Leaders and Stats:</p>
            <ul>
                ${
                    game.competitions[0].leaders && game.competitions[0].leaders.length > 0 ?
                    game.competitions[0].leaders.map(leader => `
                        <li>${leader.displayName}: ${leader.leaders.map(l => `${l.athlete.displayName} - ${l.displayValue}`).join(', ')}</li>
                    `).join('') :
                    '<li>No leader data available.</li>'
                }
            </ul>
        `;
        return gameDetails;
    }).join('');

    return formattedHtml;
}




fetchSchedule();