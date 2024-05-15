function fetchJSONData() {
    console.log("Starting fetch operation...");  // Check if the function is called
    fetch("./json/yogi-berra.json")
        .then((res) => {
            console.log("Fetch completed, response received.");  // Check the fetch response
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log("Data parsed successfully:", data);  // See the data
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
    console.log("Displaying quote:", quote);  // Check what is being sent to display
    const quoteElement = document.getElementById('quoteDisplay');
    if (quoteElement) {
        quoteElement.innerHTML = `<p>"${quote.text}" - ${quote.author}</p>`;
    } else {
        console.error("No element with id 'quoteDisplay' found in HTML.");
    }
}

// Call the function to ensure it runs
fetchJSONData();

