function fetchJSONData() {
    fetch("./json/yogi-berra.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            if (data.length > 0) {
                // Select a random quote from the array
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
    // Assuming there's a div with id="quoteDisplay" in your HTML
    const quoteElement = document.getElementById('quoteDisplay');
    if (quoteElement) {
        quoteElement.innerHTML = `<p>"${quote.text}" - ${quote.author}</p>`;
    } else {
        console.error("No element with id 'quoteDisplay' found in HTML.");
    }
}
