const url = 'https://major-league-baseball-mlb.p.rapidapi.com/scoreboard?year=2020&month=10&day=05';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b74c0e6687msh81dc7b82824316fp18b727jsn0b2d2b1fa9e0',
		'X-RapidAPI-Host': 'major-league-baseball-mlb.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}