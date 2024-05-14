import { apiOptions } from './config.mjs';

export async function displayTeamInfo(teamId) {
    const url = `https://major-league-baseball-mlb.p.rapidapi.com/team-info/${teamId}`;

    try {
        const response = await fetch(url, apiOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch team details: ${response.statusText}`);
        }
        const teamData = await response.json();

        const teamInfoDiv = document.getElementById('teamInfo');
        if (teamData && teamData.team) {
            teamInfoDiv.innerHTML = formatTeamDetails(teamData);
            saveTeamColorsToLocalStorage(teamData.team);
            saveTeamLocationToLocalStorage(teamData.team);
            updateCSSVariables(teamData.team);
        } else {
            teamInfoDiv.textContent = 'Team data not found.';
        }
    } catch (error) {
        console.error('Failed to fetch team details:', error);
        document.getElementById('teamInfo').textContent = 'Failed to load team details.';
    }
}

function saveTeamColorsToLocalStorage(team) {
    localStorage.setItem('teamColor', team.color);
    localStorage.setItem('alternateColor', team.alternateColor);
}

function saveTeamLocationToLocalStorage(team) {
    const location = {
        city: team.franchise.venue.address.city,
        state: team.franchise.venue.address.state
    };
    const locationString = JSON.stringify(location);
    localStorage.setItem('teamLocation', locationString);
}

function updateCSSVariables(team) {
    document.documentElement.style.setProperty('--primary-color', `#${team.color}`);
    document.documentElement.style.setProperty('--secondary-color', `#${team.alternateColor}`);
}

function formatDate(isoString) {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatTeamDetails(data) {
    const team = data.team;
    const nextEventDate = team.nextEvent && team.nextEvent.length > 0 ? formatDate(team.nextEvent[0].date) : 'No upcoming game';

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
                <p><strong>Division Standing:</strong> ${team.standingSummary}</p>
                <div>
                    <h3>2024</h3>
                    <p><strong><a href="${team.links[1].href}" class="external-link" target="_blank" rel="noopener noreferrer">Team Roster</a></strong></p>
                    <p><strong><a href="${team.links[3].href}" class="external-link" target="_blank" rel="noopener noreferrer">Team Schedule</a></strong></p>
                    <p><strong><a href="${team.links[2].href}" class="external-link" target="_blank" rel="noopener noreferrer">Statistics</a></strong></p>
                    <p><strong><a href="${team.links[7].href}" class="external-link" target="_blank" rel="noopener noreferrer">Injuries</a></strong></p>
                </div>
            </div>
            <div class="venue-section">
                <div>
                    <h2><i>${team.franchise.venue.fullName}</i></h2>
                    <img src="${team.franchise.venue.images[0].href}" alt="Venue Image" class="venue-img">
                    <p><strong>Location:</strong> ${team.franchise.venue.address.city}, ${team.franchise.venue.address.state}</p>
                </div>
                <div class="ticket-container">
                    <h3>Next Game - ${nextEventDate}</h3>
                    <p>${team.nextEvent[0].name}</p>
                    <p><a href="${team.links[5].href}" class="ticketbutton" target="_blank">Get ${team.displayName} Tickets!</a></p>
                </div>
            </div>
        </div>
    `;
}
