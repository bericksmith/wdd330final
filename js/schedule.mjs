import { apiOptions } from './config.mjs';

function generateUrl() {
    const today = new Date(); 
    const year = today.getFullYear();
    const month = today.getMonth() + 1; 
    const day = today.getDate();

    return `https://major-league-baseball-mlb.p.rapidapi.com/schedule?year=${year}&month=${month}&day=${day}`;
}

export async function fetchSchedule() {
    const url = generateUrl();
    try {
        const response = await fetch(url, apiOptions);
        const data = await response.json();
        const display = document.getElementById('scheduleContent');
        display.innerHTML = formatScheduleData(data, url);
    } catch (error) {
        console.error('Failed to fetch schedule:', error);
        document.getElementById('scheduleContent').textContent = 'Failed to load schedule.';
    }
}

function formatScheduleData(data, url) {
    console.log("Data received:", data);
    const dateKey = url.match(/year=(\d+)&month=(\d+)&day=(\d+)/);
    if (!dateKey) {
        console.error('Invalid date format in URL');
        return 'Invalid date format.';
    }

    const date = `${dateKey[1]}${dateKey[2].padStart(2, '0')}${dateKey[3].padStart(2, '0')}`;
    if (!data[date] || !data[date].games) {
        console.error('No games data available for the specific date:', date);
        return 'No games scheduled for this date.';
    }

    let games = data[date].games;

    let formattedHtml = games.map(game => {
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