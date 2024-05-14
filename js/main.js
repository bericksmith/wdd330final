import { displayTeamInfo } from './teamInformation.mjs';
import { fetchScores } from './scores.mjs';
import { fetchNews } from './news.mjs';
import { fetchTeamsAndDisplay } from './teams.mjs';

document.addEventListener("DOMContentLoaded", () => {
    updateVisitInfo();
    fetchScores().catch(console.error);
    fetchNews().catch(console.error);
    fetchTeamsAndDisplay().catch(console.error);
    displayTeamInfo('15'); // Start with braves if no selection
});

function updateVisitInfo() {
    localStorage.setItem('lastVisit', new Date().toLocaleString()); 
    const lastVisit = localStorage.getItem('lastVisit');
    const footer = document.getElementById('visitInfo');
    footer.textContent = `Last visit: ${lastVisit}`;
}