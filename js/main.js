import { displayTeamInfo } from './teamInformation.mjs';
import { fetchScores } from './scores.mjs';
import { fetchNews } from './news.mjs';
import { fetchTeamsAndDisplay } from './teams.mjs';


document.addEventListener("DOMContentLoaded", () => {

    fetchScores();
    fetchNews();

    displayTeamInfo('15'); // Start with the Braves cause I like them!
});

document.addEventListener("DOMContentLoaded", () => {
    fetchTeamsAndDisplay();
});