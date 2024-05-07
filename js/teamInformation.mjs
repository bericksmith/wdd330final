export async function displayTeamInfo(teamId) {
    const url = `https://major-league-baseball-mlb.p.rapidapi.com/team-info/${teamId}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b74c0e6687msh81dc7b82824316fp18b727jsn0b2d2b1fa9e0',
            'X-RapidAPI-Host': 'major-league-baseball-mlb.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const teamData = await response.json();

        const teamInfoDiv = document.getElementById('teamInfo');
        teamInfoDiv.innerHTML = formatTeamDetails(teamData);

    } catch (error) {
        console.error('Failed to fetch team details:', error);
        document.getElementById('teamInfo').textContent = 'Failed to load team details.';
    }
}

function formatDate(isoString) {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString('en-US', options);
}

function formatTeamDetails(data) {
    const team = data.team;
    const nextEventDate = formatDate(team.nextEvent[0].date);

    return `
    <div class="flex-container">
    <div class="team-section">
        <h2>${team.displayName}</h2>
        <img src="${team.logos[0].href}" alt="${team.shortDisplayName}" class="team-img">
        <p><strong>Team Colors:</strong><p>
        <span class="team-colors" style="background-color:#${team.color};"></span>
        <span class="team-colors" style="background-color:#${team.alternateColor};"></span>
        <p><strong>Current Record:</strong> ${team.record.items[0].summary}</p>
        <div>
            <h3>Links</h3>
            <p><a href="${team.links[1].href}" target="_blank">Team Roster - 2024</a></p>
            <p><a href="${team.links[2].href}" target="_blank">Team Schedule - 2024</a></p>
        </div>
    </div>
    <div class="venue-section">
        <div>
            <h3>Home Field - <i>${team.franchise.venue.fullName}</i></h3>
            <img src="${team.franchise.venue.images[0].href}" alt="Venue Image" class="venue-img">
            <p>Location: ${team.franchise.venue.address.city}, ${team.franchise.venue.address.state}</p>
        </div>
        <div>
            <h3>Next Game - ${nextEventDate}</h3>
            <p>${team.nextEvent[0].name}</p>
            <p><a href="${team.links[5].href}" target="_blank">Get Tickets!</a></p>
        </div>
    </div>
</div>
    `;
}