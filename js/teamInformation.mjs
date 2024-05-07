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
    const links = team.links.filter(link => ['roster', 'stats', 'schedule', 'tickets'].includes(link.rel[1]));
    const nextEventDate = formatDate(team.nextEvent[0].date);

    return `
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <div style="flex: 1; margin-right: 20px;">
                <h2>${team.displayName}</h2>
                <img src="${team.logos[0].href}" alt="${team.shortDisplayName}" style="width:100px; height:100px;">
                <p><strong>Team Colors:</strong><p> 
                <span style="display:inline-block; width:20px; height:20px; background-color:#${team.color};"></span>
                <span style="display:inline-block; width:20px; height:20px; background-color:#${team.alternateColor};"></span>
                <p><strong>Current Record:</strong> ${team.record.items[0].summary}</p>
                <div>
                    <h3>Links</h3>
                    ${links.map(link => `<a href="${link.href}" target="_blank">${link.text}</a>`).join('<br>')}
                </div>
            </div>
            <div style="flex: 1;">
                <div>
                    <h3>Home Field - <i>${team.franchise.venue.fullName}</i></h3>
                    <img src="${team.franchise.venue.images[0].href}" alt="Venue Image" style="width:300px; height:180px;">
                </div>
                <div>
                    <h3>Next Game - ${nextEventDate}</h3>
                    <p>${team.nextEvent[0].name}</p>
                </div>
            </div>
        </div>
    `;
}