export function displayTeamInfo(team) {
    const teamInfoDiv = document.getElementById('teamInfo');
    teamInfoDiv.innerHTML = `
        <h2>${team.displayName}</h2>
        <p>Short Name: ${team.shortDisplayName}</p>
        <!-- Add more team details here -->
    `;
}
