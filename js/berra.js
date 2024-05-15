function fetchBerraJSONData() {
    fetch("./json/yogi-berra.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            if (data.length > 0) {
                const randomQuote = data[Math.floor(Math.random() * data.length)];
                displayQuote(randomQuote);
            } else {
                console.log("No quotes available");
            }
        })
        .catch((error) => 
               console.error("Unable to fetch data:", error));
}

function displayQuote(quote) {
    const quoteElement = document.getElementById('quoteDisplay');
    if (quoteElement) {
        quoteElement.innerHTML = `<p>"${quote.text}" - ${quote.author}</p>`;
    } else {
        console.error("No element with id 'quoteDisplay' found in HTML.");
    }
}

fetchJSONData();

