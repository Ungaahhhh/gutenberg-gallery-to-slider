import { GGToSlider } from './gutenberg-gallery-to-slider';
window.addEventListener('DOMContentLoaded', async () => {
	const response = await fetch('https://pixabay.com/api/?key=28916998-477d57555c1b9cf691a3084d9&category=animals&per_page=8');
	const json = await response.json();
	const sample = document.querySelectorAll<HTMLUListElement>('.sample');
	const gutenbergGalleryToSlider = document.querySelector<HTMLDivElement>('#gutenbergGalleryToSlider');
	const wpBlockGalleryTemp = (document.getElementById('wp-block-gallery_temp') as HTMLTemplateElement).content.cloneNode(true) as HTMLElement;
	const wpBlockImageTemp = document.getElementById('wp-block-image_temp') as HTMLTemplateElement;
	const figure = wpBlockGalleryTemp.querySelector('figure');
	for (let i = 0; i < sample.length; i++) {
		let HTML = '';
		const target = sample.item(i);
		for (let j = 0; j < json.hits.length; j++) {
			const item = json.hits[j];
			HTML += `<li><img src="${item.largeImageURL}"></li>`;
			target.innerHTML = HTML;
			if (i === 0) {
				const temp = wpBlockImageTemp.content.cloneNode(true) as HTMLElement;
				const img = temp.querySelector('img');
				if (img) img.src = item.largeImageURL;
				if (figure) figure.appendChild(temp);
			}
		}
	}
	if (figure) gutenbergGalleryToSlider?.appendChild(figure);
	const scrollConfig = {
		interval: 4000,
		scope: '#scroll',
		target: 'ul',
	};
	new GGToSlider(scrollConfig);
	const fadeConfig = {
		effect: 'fade',
		interval: 4000,
		scope: '#fade',
		target: 'ul',
		control: { adjacent: true, thumb: 'image' },
	};
	new GGToSlider(fadeConfig);
	const gutenbergGalleryToSliderConfig = {
		effect: 'fade',
		interval: 4000,
		scope: '#gutenbergGalleryToSlider',
		target: '.wp-block-gallery',
		control: { adjacent: true, thumb: 'image' },
	};
	new GGToSlider(gutenbergGalleryToSliderConfig);
});
