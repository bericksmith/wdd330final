import { apiOptions } from './config.mjs';

function buildUrl() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `https://major-league-baseball-mlb.p.rapidapi.com/scoreboard?year=${year}&month=${month}&day=${day}`;
}

export async function fetchScores() {
    const url = buildUrl();
    try {
        const response = await fetch(url, apiOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch scores: ${response.statusText}`);
        }
        const gameData = await response.json();

        const scoresContainer = document.getElementById("scoresContainer");
        scoresContainer.innerHTML = '';

        const logo = document.createElement('img');
        logo.src = "https://a.espncdn.com/i/teamlogos/leagues/500/mlb.png";
        logo.alt = "MLB Logo";
        logo.style = "width: 85px; height: 85px; display: block; margin: 0 auto 10px auto;";
        scoresContainer.appendChild(logo);

        if (gameData.events && gameData.events.length > 0) {
            gameData.events.forEach(event => {
                if (event.competitions && event.competitions.length > 0 && event.competitions[0].competitors.length >= 2) {
                    const competition = event.competitions[0];
                    const competitors = competition.competitors;
                    const statusDetail = competition.status.type.shortDetail || 'No Detail Available';
                    const gameElement = document.createElement('div');
                    gameElement.classList.add('game-element');
                    gameElement.innerHTML = `
                        <p><strong>${statusDetail}</strong></p>
                        <div class="score-line">
                            <img src="${competitors[0].team.logo}" alt="${competitors[0].team.displayName}" style="height:20px; margin-right: 10px;">
                            <span><strong>${competitors[0].team.abbreviation}</strong>: ${competitors[0].score}</span>
                        </div>
                        <div class="score-line">
                            <img src="${competitors[1].team.logo}" alt="${competitors[1].team.displayName}" style="height:20px; margin-right: 10px;">
                            <span><strong>${competitors[1].team.abbreviation}</strong>: ${competitors[1].score}</span>
                        </div>
                    `;
                    scoresContainer.appendChild(gameElement);
                } else {
                    console.warn('Competitors data is missing or incomplete for:', event);
                }
            });
        } else {
            scoresContainer.innerHTML = `<p>No game events found for today.</p>`;
        }
    } catch (error) {
        console.error(error);
        document.getElementById('scoresContainer').innerHTML = `<p>Error fetching data: ${error.message}</p>`; 
    }
}
