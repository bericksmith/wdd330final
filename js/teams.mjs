import { displayTeamInfo } from './teamInformation.mjs';
import { apiOptions } from './config.mjs';

const url = 'https://major-league-baseball-mlb.p.rapidapi.com/team-list';

async function fetchTeamsAndDisplay() {
    try {
        const response = await fetch(url, apiOptions);
        const data = await response.json();
        const display = document.getElementById('teamDisplay');

        display.innerHTML = ''; 

        data.sports[0].leagues[0].teams.forEach(team => {
            const teamElement = formatTeam(team.team);
            display.appendChild(teamElement);
        });

        // Check for a previously selected team and display it LocalStorage
        const savedTeamId = localStorage.getItem('selectedTeamId');
        if (savedTeamId) {
            displayTeamInfo(savedTeamId);
        }

    } catch (error) {
        console.error('Failed to fetch teams:', error);
        document.getElementById('teamDisplay').textContent = 'Failed to load teams.';
    }
}

function formatTeam(team) {
    const teamElement = document.createElement('div');
    teamElement.className = 'team';
    teamElement.innerHTML = `
        <img src="${team.logos[0].href}" alt="${team.displayName} - ${team.shortDisplayName}" style="width:40px; height:40px;">
    `;

    // Check if this team's ID is the one stored in local storage and set it as active
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