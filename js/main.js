import { apiOptions } from './config.mjs';

// Example of fetching and displaying the MLB logo
async function fetchMLBLogo() {
    const url = 'your-api-url-to-fetch-league-details'; // Adjust URL to where you're fetching data from
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Assuming the first logo is what you want
        const logoUrl = data.leagues[0].logos[0].href;
        const logoElement = document.createElement('img');
        logoElement.src = logoUrl;
        logoElement.alt = "MLB Logo";
        logoElement.width = 100;  // Set width as needed
        logoElement.height = 100; // Set height as needed

        document.body.appendChild(logoElement); // Append where it needs to be in the DOM
    } catch (error) {
        console.error('Failed to fetch MLB logo:', error);
    }
}

// Call the function when appropriate
fetchMLBLogo();