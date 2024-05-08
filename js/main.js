import { displayTeamInfo } from './teamInformation.mjs';
import { fetchScores } from './scores.mjs';
import { fetchNews } from './news.mjs';
import { fetchTeamsAndDisplay } from './teams.mjs';

document.addEventListener("DOMContentLoaded", () => {
    fetchScores();
    fetchNews();
    fetchTeamsAndDisplay();
    displayTeamInfo('15'); // ID for the Braves
});