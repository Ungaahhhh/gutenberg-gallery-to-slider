const fs = require('fs');
const getAnimals = async () => {
	const response = await fetch('https://pixabay.com/api/?key=28916998-477d57555c1b9cf691a3084d9&category=animals&per_page=8');
	const json = await response.json();
	for (let i = 0; i < json.hits.length; i++) {
		const item = json.hits[i];
		await saveImage(item.largeImageURL, i);
	}
};

const saveImage = async (url, index) => {
	await fetch(url).then(async (response) => {
		const arrayBuffer = await response.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		fs.writeFileSync(`./0${index + 1}.jpg`, buffer);
	});
};

getAnimals();
