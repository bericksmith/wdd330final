import { apiOptions } from './config.mjs';

const url = 'https://major-league-baseball-mlb.p.rapidapi.com/news';

export async function fetchNews() {
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
        document.getElementById('newsContent').textContent = 'Failed to load any news items.';
    }
}

function formatNewsItem(item) {
    return `
        <div class="news-item">
            <a href="${item.link}" class="external-link" target="_blank">${item.headline}</a> - ESPN.com <strong> <i> ${new Date(item.published || '').toLocaleString()}</i></strong> 
        </div>
    `;
}

