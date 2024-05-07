import { displayTeamInfo } from './teamInformation.mjs';
import { apiOptions } from './config.mjs';

const url = 'https://major-league-baseball-mlb.p.rapidapi.com/team-list';

async function fetchTeamsAndDisplay() {
    try {
        const response = await fetch(url, apiOptions); // ensure you are using the correct variable for options
        const data = await response.json();
        const display = document.getElementById('teamDisplay');

        display.innerHTML = ''; // Clear previous content

        data.sports[0].leagues[0].teams.forEach(team => {
            const teamElement = formatTeam(team.team);
            display.appendChild(teamElement);
        });

        // Re-apply the active class based on local storage after all teams are displayed
        const savedTeamId = localStorage.getItem('selectedTeamId');
        if (savedTeamId) {
            const activeTeamElement = document.querySelector(`.team[data-team-id="${savedTeamId}"]`);
            if (activeTeamElement) {
                activeTeamElement.classList.add('active');
            }
            displayTeamInfo(savedTeamId); // Display the team info for the saved ID
        }
    } catch (error) {
        console.error('Failed to fetch teams:', error);
        document.getElementById('teamDisplay').textContent = 'Failed to load teams.';
    }
}

function formatTeam(team) {
    const teamElement = document.createElement('div');
    teamElement.className = 'team';
    teamElement.setAttribute('data-team-id', team.id);  // Set data attribute
    teamElement.innerHTML = `
        <img src="${team.logos[0].href}" alt="${team.displayName} - ${team.shortDisplayName}" style="width:40px; height:40px;">
    `;

    const storedTeamId = localStorage.getItem('selectedTeamId');
    if (storedTeamId && storedTeamId === team.id) {
        teamElement.classList.add('active');
    }

    teamElement.onclick = () => {
        localStorage.setItem('selectedTeamId', team.id);
        localStorage.setItem('selectedTeamName', team.displayName);
        displayTeamInfo(team.id);
    };

    return teamElement;
}


fetchTeamsAndDisplay();