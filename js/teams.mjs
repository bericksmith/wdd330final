import { displayTeamInfo } from './teamInformation.mjs';
import { apiOptions } from './config.mjs';

const url = 'https://major-league-baseball-mlb.p.rapidapi.com/team-list';

export async function fetchTeamsAndDisplay() {
    try {
        const response = await fetch(url, apiOptions);
        const data = await response.json();
        const display = document.getElementById('teamDisplay');

        display.innerHTML = '';

        data.sports[0].leagues[0].teams.forEach(team => {
            const teamElement = formatTeam(team.team);
            display.appendChild(teamElement);
        });

        setActiveClassFromStorage();

    } catch (error) {
        console.error('Failed to fetch teams:', error);
        document.getElementById('teamDisplay').textContent = 'Failed to load any teams.';
    }
}

function setActiveClassFromStorage() {
    const savedTeamId = localStorage.getItem('selectedTeamId');
    if (savedTeamId) {
        const activeTeamElement = document.querySelector(`.team[data-team-id="${savedTeamId}"]`);
        if (activeTeamElement) {
            activeTeamElement.classList.add('active');
            displayTeamInfo(savedTeamId);
        } else {
            console.error('No team element matches the saved ID:', savedTeamId);
        }
    }
}

function formatTeam(team) {
    const teamElement = document.createElement('div');
    teamElement.className = 'team';
    teamElement.setAttribute('data-team-id', team.id);
    teamElement.innerHTML = `
        <img src="${team.logos[0].href}" alt="${team.displayName} - ${team.shortDisplayName}" style="width:40px; height:40px;">
    `;

    teamElement.onclick = () => {
        document.querySelectorAll('.team').forEach(el => el.classList.remove('active'));
        teamElement.classList.add('active');
        localStorage.setItem('selectedTeamId', team.id);
        localStorage.setItem('selectedTeamName', team.displayName);
        displayTeamInfo(team.id);
    };

    return teamElement;
}