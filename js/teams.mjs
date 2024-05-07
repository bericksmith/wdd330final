const url = 'https://major-league-baseball-mlb.p.rapidapi.com/team-list';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'b74c0e6687msh81dc7b82824316fp18b727jsn0b2d2b1fa9e0',
        'X-RapidAPI-Host': 'major-league-baseball-mlb.p.rapidapi.com'
    }
};

async function fetchTeamsAndDisplay() {
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        const display = document.getElementById('teamDisplay');

        let teamsHTML = data.sports[0].leagues[0].teams.map(team => {
            return formatTeam(team.team);
        }).join('');

        display.innerHTML = teamsHTML;

    } catch (error) {
        console.error('Failed to fetch teams:', error);
        document.getElementById('teamDisplay').textContent = 'Failed to load teams.';
    }
}

function formatTeam(team) {
    return `
        <div class="team">
            <img src="${team.logos[0].href}" alt="${team.displayName}-${team.shortDisplayName}" style="width:40px;height:40px;">
        </div>
    `;
}

fetchTeamsAndDisplay();
