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
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
    return date.toLocaleDateString('en-US', options);
}

function formatTeamDetails(data) {
    const team = data.team;
    const links = team.links.filter(link => ['roster', 'stats', 'schedule', 'tickets'].includes(link.rel[1]));
    const nextEventDate = formatDate(team.nextEvent[0].date);

    return `
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <div style="flex: 1; margin-right: 20px;">
                <h2>${team.displayName}</h2>
                <img src="${team.logos[0].href}" alt="${team.shortDisplayName}" style="width:100px; height:100px;">
                <p>Team Colors:<p> 
                <span style="display:inline-block; width:20px; height:20px; background-color:#${team.color};"></span> #${team.color}
                <span style="display:inline-block; width:20px; height:20px; background-color:#${team.alternateColor};"></span> #${team.alternateColor}
                <p>Current Record: ${team.record.items[0].summary}</p>
                <div>
                    <h3>Links</h3>
                    ${links.map(link => `<a href="${link.href}" target="_blank">${link.text}</a>`).join('<br>')}
                </div>
            </div>
            <div style="flex: 1;">
                <div>
                    <h3>Home Field</h3>
                    <p>${team.franchise.venue.fullName}</p>
                    <img src="${team.franchise.venue.images[0].href}" alt="Venue Image" style="width:300px; height:180px;">
                </div>
                <div>
                    <h3>Next Game</h3>
                    <p>${team.nextEvent[0].name} on ${nextEventDate}</p>
                </div>
            </div>
        </div>
    `;
}