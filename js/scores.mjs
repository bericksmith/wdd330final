const url = 'https://major-league-baseball-mlb.p.rapidapi.com/scoreboard?year=2020&month=10&day=05';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'b74c0e6687msh81dc7b82824316fp18b727jsn0b2d2b1fa9e0',
        'X-RapidAPI-Host': 'major-league-baseball-mlb.p.rapidapi.com'
    }
};

async function fetchScores() {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Failed to fetch scores: ' + response.statusText);
        }
        const gameData = await response.json();

        const scoresContainer = document.getElementById("scoresContainer");
        scoresContainer.innerHTML = ''; // Clear previous content

        gameData.events.forEach(event => {
            const gameElement = document.createElement('div');
            gameElement.innerHTML = `
                <h2>${event.name} - ${event.status.detail}</h2>
                <p>${event.competitors[0].team.displayName} (${event.competitors[0].team.abbreviation}): ${event.competitors[0].score}</p>
                <p>${event.competitors[1].team.displayName} (${event.competitors[1].team.abbreviation}): ${event.competitors[1].score}</p>
            `;
            scoresContainer.appendChild(gameElement);
        });
    } catch (error) {
        console.error(error);
        document.getElementById('scoresContainer').innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    }
}

// Load scores when the document is ready
document.addEventListener("DOMContentLoaded", fetchScores);
