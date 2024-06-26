// Using modular code structure
import { apiOptions } from './config.mjs';
import { fetchWeather } from './weather.mjs';
import { fetchBerraJSONData } from './berra.mjs';

// DOM Manipulation using conditional rendering
export async function displayTeamInfo(teamId) {
    const teamInfoDiv = document.getElementById('teamInfo');

    // Handle case where no team is selected
    if (!teamId) {
        teamInfoDiv.innerHTML = '<h2>Please select a team above</h2><div id="weatherDisplay"></div>';
        return;
    }

    const url = `https://major-league-baseball-mlb.p.rapidapi.com/team-info/${teamId}`;
// Using Error Handling with Try/Catch
    try {
        const response = await fetch(url, apiOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch team details: ${response.statusText}`);
        }
        const teamData = await response.json();

        if (teamData && teamData.team) {
            teamInfoDiv.innerHTML = formatTeamDetails(teamData);
            saveTeamColorsToLocalStorage(teamData.team);
            await saveTeamLocationToLocalStorage(teamData.team);
            updateCSSVariables(teamData.team);

            // Fetch and display weather data
            const weatherHTML = await fetchWeather();
            document.getElementById('weatherDisplay').innerHTML = weatherHTML;

            // Fetch and display a quote
            const quoteElement = await fetchBerraJSONData();
            document.getElementById('quoteDisplay').textContent = quoteElement;
        } else {
            teamInfoDiv.textContent = 'Team data not found.';
            document.getElementById('weatherDisplay').textContent = 'Weather data not available.';
        }
    } catch (error) {
        console.error('Failed to fetch team details:', error);
        teamInfoDiv.textContent = 'Failed to load team details.';
        document.getElementById('weatherDisplay').textContent = 'Failed to load weather.';
    }
}

// Save team colors to local storage
function saveTeamColorsToLocalStorage(team) {
    localStorage.setItem('teamColor', team.color);
    localStorage.setItem('alternateColor', team.alternateColor);
}

// Save team location to local storage
async function saveTeamLocationToLocalStorage(team) {
    const location = {
        city: team.franchise.venue.address.city,
        state: team.franchise.venue.address.state
    };
    const locationString = JSON.stringify(location);
    localStorage.setItem('teamLocation', locationString);
}

// Update CSS variables with team colors
function updateCSSVariables(team) {
    document.documentElement.style.setProperty('--primary-color', `#${team.color}`);
    document.documentElement.style.setProperty('--secondary-color', `#${team.alternateColor}`);
}

// Using a utility function to format dates
function formatDate(isoString) {
    const eventDate = new Date(isoString);
    const today = new Date();

    const eventDateString = eventDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const todayString = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    if (eventDateString === todayString) {
        return "Today!";
    } else {
        return eventDateString;
    }
}

// formatting and displaying team details with html output
function formatTeamDetails(teamData) {
    const team = teamData.team;
    const nextEvent = team.nextEvent && team.nextEvent.length > 0 ? team.nextEvent[0] : null;
    const nextEventDate = nextEvent ? formatDate(nextEvent.date) : 'No upcoming game';

    return `
        <div class="flex-container">
            <div class="team-section">
                <h2>${team.displayName}</h2>
                <div class="flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <img src="${team.logos[0].href}" alt="${team.shortDisplayName}" class="team-img">
                        </div>
                        <div class="flip-card-back">
                            <img src="${team.logos[1].href}" alt="${team.shortDisplayName}" class="team-img">
                        </div>
                    </div>
                </div>
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
                    <p><strong>Team Location:</strong> ${team.franchise.venue.address.city}, ${team.franchise.venue.address.state}</p>
                </div>
                <div class="ticket-container">
                    <h3>Next Game - ${nextEventDate}</h3>
                    <p style="margin: 5px; margin-bottom: 10px;"><i><strong>${nextEvent ? nextEvent.name : 'No upcoming game'}</strong></i></p>
                    <div id="weatherDisplay"></div>
                    <p><a href="${team.links[5].href}" class="ticketbutton" target="_blank">Get ${team.displayName} Tickets!</a></p>
                </div>
            </div>
        </div>
    `;
}
