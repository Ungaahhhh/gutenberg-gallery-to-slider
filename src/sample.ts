import { WpGallery } from './gutenberg-gallery-to-slider';
window.addEventListener('DOMContentLoaded', async () => {
	const response = await fetch(
		'https://pixabay.com/api/?key=28916998-477d57555c1b9cf691a3084d9&category=animals&per_page=8'
	);
	const json = await response.json();
	const sample = document.querySelectorAll<HTMLUListElement>('.sample');
	for (let i = 0; i < sample.length; i++) {
		let HTML = '';
		const target = sample.item(i);
		for (let i = 0; i < json.hits.length; i++) {
			const item = json.hits[i];
			HTML += `<li><img src="${item.largeImageURL}"></li>`;
		}
		target.innerHTML = HTML;
	}
	const scrollConfig = {
		interval: 4000,
		scope: '#scroll',
		target: 'ul',
	};
	new WpGallery(scrollConfig);
	const fadeConfig = {
		scope: '#fade',
		target: 'ul',
		effect: 'fade',
	};
	new WpGallery(fadeConfig);
});
