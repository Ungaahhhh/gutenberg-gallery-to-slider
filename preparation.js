const getAnimals = async () => {
	const response = await fetch(
		'https://pixabay.com/api/?key=28916998-477d57555c1b9cf691a3084d9&category=animals&per_page=8'
	);
	const json = await response.json();
	for (let j = 0; j < json.hits.length; j++) {
		const item = json.hits[j];
		console.log(item.largeImageURL);
	}
};

getAnimals();
