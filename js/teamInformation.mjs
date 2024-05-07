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

function formatTeamDetails(data) {
    const team = data.team;
    const links = team.links.filter(link => ['roster', 'stats', 'schedule', 'tickets'].includes(link.rel[1]));
    return `
        <h2>${team.displayName}</h2>
        <img src="${team.logos[0].href}" alt="${team.shortDisplayName}" style="width:100px; height:100px;">
        <p>Color: <span style="display:inline-block; width:20px; height:20px; background-color:#${team.color};"></span> #${team.color}</p>
        <p>Alternate Color: <span style="display:inline-block; width:20px; height:20px; background-color:#${team.alternateColor};"></span> #${team.alternateColor}</p>
        <p>Overall Record: ${team.record.items[0].summary}</p>
        <div>
            <h3>Links</h3>
            ${links.map(link => `<a href="${link.href}" target="_blank">${link.text}</a>`).join('<br>')}
        </div>
        <div>
            <h3>Venue</h3>
            <p>${team.franchise.venue.fullName}</p>
            <img src="${team.franchise.venue.images[0].href}" alt="Venue Image" style="width:200px; height:120px;">
        </div>
        <div>
            <h3>Next Game</h3>
            <p>${team.nextEvent[0].name} ${team.nextEvent[0].date}</p>
        </div>
    `;
}