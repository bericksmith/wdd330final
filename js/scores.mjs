import { apiOptions } from './config.mjs';

const url = 'https://major-league-baseball-mlb.p.rapidapi.com/scoreboard?year=2024&month=05&day=07';

async function fetchScores() {
    try {
        const response = await fetch(url, apiOptions);
        if (!response.ok) {
            throw new Error('Failed to fetch scores: ' + response.statusText);
        }
        const gameData = await response.json();

        const scoresContainer = document.getElementById("scoresContainer");
        scoresContainer.innerHTML = ''; // Clear previous content

        if (gameData.events && gameData.events.length > 0) {
            gameData.events.forEach(event => {
                if (event.competitions && event.competitions.length > 0 && event.competitions[0].competitors.length >= 2) {
                    const competitors = event.competitions[0].competitors;
                    const gameElement = document.createElement('div');
                    gameElement.innerHTML = `
                        <h2>${event.shortname}</h2>
                        <p>${event.competitions.status.type.shortDetail}</>
                        <p>${competitors[0].team.logo} ${competitors[0].team.abbreviation}: ${competitors[0].score}</p>
                        <p>${competitors[1].team.logo} ${competitors[1].team.abbreviation}: ${competitors[1].score}</p>
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

// Load scores when the document is ready
document.addEventListener("DOMContentLoaded", fetchScores);