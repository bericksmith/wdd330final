import { apiOptions } from './config.mjs';

const url = 'https://major-league-baseball-mlb.p.rapidapi.com/news';

async function fetchNews() {
    try {
        const response = await fetch(url, apiOptions);
        const data = await response.json();
        console.log('Data received:', data);

        const display = document.getElementById('newsContent');
        if (Array.isArray(data)) {
            display.innerHTML = data.map(item => formatNewsItem(item)).join('');
        } else {
            display.textContent = 'No news items found.';
        }
    } catch (error) {
        console.error('Failed to fetch news:', error);
        document.getElementById('newsContent').textContent = 'Failed to load news.';
    }
}

function formatNewsItem(item) {
    const categories = Array.isArray(item.categories) ? item.categories : [];
    return `
        <div class="news-item">
            <h2>${item.headline}</h2>
            <p>${item.description}</p>
            <a href="${item.link}" target="_blank">Read more</a>
            <p><strong>Published:</strong> ${new Date(item.published || '').toLocaleString()}</p>
            <p><strong>Last Modified:</strong> ${new Date(item.lastModified || '').toLocaleString()}</p>

            <div>
                <h3>Categories:</h3>
                <ul>
                    ${categories.map(cat => `<li>${cat.description} (${cat.type})</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

fetchNews();
