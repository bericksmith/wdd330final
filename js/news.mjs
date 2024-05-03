import { apiOptions } from './config.mjs';

const url = 'https://major-league-baseball-mlb.p.rapidapi.com/news';

async function fetchNews() {
    try {
        const response = await fetch(url, apiOptions);
        const data = await response.json();
        const display = document.getElementById('newsContent');
        display.innerHTML = formatNews(data);
    } catch (error) {
        console.error('Failed to fetch news:', error);
        document.getElementById('newsContent').textContent = 'Failed to load news.';
    }
}

function formatNews(data) {
    const htmlContent = `
        <h2>${data.headline}</h2>
        <p>${data.description}</p>
        <a href="${data.link}" target="_blank">Read more</a>
        <p><strong>Published:</strong> ${new Date(data.published).toLocaleString()}</p>
        <p><strong>Last Modified:</strong> ${new Date(data.lastModified).toLocaleString()}</p>
        <div>
            <h3>Categories:</h3>
            <ul>
                ${data.categories.map(cat => `<li>${cat.description} (${cat.type})</li>`).join('')}
            </ul>
        </div>
    `;
    return htmlContent;
}

fetchNews();
fetchNews();
