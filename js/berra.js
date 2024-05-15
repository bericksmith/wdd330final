function fetchJSONData() {
    fetch("/json/yogi-berra.json")
        .then((res) => {
            if (!res.ok) {
                // Corrected the use of 'new Error'
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => 
              console.log(data))
        .catch((error) => 
               console.error("Unable to fetch data:", error));
}
fetchJSONData();