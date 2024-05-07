import { apiOptions } from './config.mjs';

function buildUrl() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `https://major-league-baseball-mlb.p.rapidapi.com/scoreboard?year=${year}&month=${month}&day=${day}`;
}

async function fetchScores() {
    const url = buildUrl();
    try {
        const response = await fetch(url, apiOptions);
        if (!response.ok) {
            throw new Error('Failed to fetch scores: ' + response.statusText);
        }
        const gameData = await response.json();
        const scoresContainer = document.getElementById("scoresContainer");
        scoresContainer.innerHTML = '';

        if (gameData.events && gameData.events.length > 0) {
            gameData.events.forEach(event => {
                if (event.competitions && event.competitions.length > 0 && event.competitions[0].competitors.length >= 2) {
                    const competition = event.competitions[0];
                    const competitors = competition.competitors;
                    const gameElement = document.createElement('div');
                    gameElement.innerHTML = `
                        <h2>${event.shortName} - ${competition.status.shortDetail || 'No Detail Available'}</h2>
                        <img src="${competitors[0].team.logo}" alt="${competitors[0].team.displayName}" style="height:30px;">
                        <p>${competitors[0].team.displayName} (${competitors[0].team.abbreviation}): ${competitors[0].score}</p>
                        <img src="${competitors[1].team.logo}" alt="${competitors[1].team.displayName}" style="height:30px;">
                        <p>${competitors[1].team.displayName} (${competitors[1].team.abbreviation}): ${competitors[1].score}</p>
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


document.addEventListener("DOMContentLoaded", fetchScores);
