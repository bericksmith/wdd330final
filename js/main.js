import { displayTeamInfo } from './teamInformation.mjs';
import { fetchScores } from './scores.mjs';
import { fetchNews } from './news.mjs';
import { fetchTeamsAndDisplay } from './teams.mjs';
import { fetchWeather } from './weather.mjs';
import { fetchBerraJSONData } from './berra.js';

document.addEventListener("DOMContentLoaded", () => {
    updateVisitInfo();
    fetchScores();
    fetchNews();
    fetchTeamsAndDisplay();
    fetchWeather();
    displayTeamInfo(); // Start with braves if no selection
    fetchBerraJSONData();
});

function updateVisitInfo() {
    localStorage.setItem('lastVisit', new Date().toLocaleString()); 
    const lastVisit = localStorage.getItem('lastVisit');
    const footer = document.getElementById('visitInfo');
    footer.textContent = `Last visit: ${lastVisit}`;
}