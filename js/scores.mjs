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
                if (event.competitors && event.competitors.length >= 2) {
                    const gameElement = document.createElement('div');
                    gameElement.innerHTML = `
                        <h2>${event.name} - ${event.status.detail}</h2>
                        <p>${event.competitors[0].team.displayName} (${event.competitors[0].team.abbreviation}): ${event.competitors[0].score}</p>
                        <p>${event.competitors[1].team.displayName} (${event.competitors[1].team.abbreviation}): ${event.competitors[1].score}</p>
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
