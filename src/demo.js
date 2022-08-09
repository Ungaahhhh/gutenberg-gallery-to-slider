import { GGToSlider } from '../prod/gutenberg-gallery-to-slider';

window.addEventListener('DOMContentLoaded', () => {
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
		scope: '#gutenbergGalleryToSlider',
		target: '.wp-block-gallery',
	};
	new GGToSlider(gutenbergGalleryToSliderConfig);
});
