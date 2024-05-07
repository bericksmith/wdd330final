import { apiOptions } from './config.mjs';

export async function displayTeamInfo(teamId) {
    const url = `https://major-league-baseball-mlb.p.rapidapi.com/team-info/${teamId}`;

    try {
        const response = await fetch(url, apiOptions);  
        const teamData = await response.json();

        const teamInfoDiv = document.getElementById('teamInfo');
        teamInfoDiv.innerHTML = formatTeamDetails(teamData);

    } catch (error) {
        console.error('Failed to fetch team details:', error);
        document.getElementById('teamInfo').textContent = 'Failed to load team details.';
    }
}

function formatDate(isoString) {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatTeamDetails(data) {
    const team = data.team;
    const nextEventDate = formatDate(team.nextEvent[0].date);

    return `
        <div class="flex-container">
            <div class="team-section">
                <h2>${team.displayName}</h2>
                <img src="${team.logos[0].href}" alt="${team.shortDisplayName}" class="team-img">
                <p><strong>Team Colors:</strong>
                    <span class="team-colors" style="background-color:#${team.color};"></span>
                    <span class="team-colors" style="background-color:#${team.alternateColor};"></span>
                </p>
                <p><strong>Current Record:</strong> ${team.record.items[0].summary}</p>
                <div>
                    <h3>Links</h3>
                    <p><a href="${team.links[1].href}" class="external-link" target="_blank" rel="noopener noreferrer">Team Roster - 2024</a></p>
                    <p><a href="${team.links[2].href}" class="external-link" target="_blank" rel="noopener noreferrer">Team Schedule - 2024</a></p>
                </div>
            </div>
            <div class="venue-section">
                <div>
                    <h3>Home Field - <i>${team.franchise.venue.fullName}</i></h3>
                    <img src="${team.franchise.venue.images[0].href}" alt="Venue Image" class="venue-img">
                    <p>Location: ${team.franchise.venue.address.city}, ${team.franchise.venue.address.state}</p>
                </div>
                <div>
                    <h3>Next Game - ${nextEventDate}</h3>
                    <p>${team.nextEvent[0].name}</p>
                    <p><a href="${team.links[5].href}" class="ticketbutton" target="_blank">Get Tickets!</a></p>
                </div>
            </div>
        </div>
    `;
}
