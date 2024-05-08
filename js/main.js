import { displayTeamInfo } from './teamInformation.mjs';
import { fetchScores } from './scores.mjs';
import { fetchNews } from './news.mjs';
import { fetchTeamsAndDisplay } from './teams.mjs';

document.addEventListener("DOMContentLoaded", () => {
    applyStoredTeamColors();
    fetchScores();
    fetchNews();
    fetchTeamsAndDisplay();
    displayTeamInfo('15'); // ID for the Braves
});

function applyStoredTeamColors() {
    const primaryColor = localStorage.getItem('teamColor');
    const secondaryColor = localStorage.getItem('alternateColor');

    if (primaryColor && secondaryColor) {
        document.documentElement.style.setProperty('--primary-color', `#${primaryColor}`);
        document.documentElement.style.setProperty('--secondary-color', `#${secondaryColor}`);
    }
}
