export class WpGallery {
	constructor(config) {
		this.init(config);
		if (this.storage.target) {
			this.storage.target.outerHTML = `<div class="wp_gallery"><div class="wp_gallery_inner">${this.storage.target.outerHTML}</div></div>`;
			this.init();
			this.storage.gallery = this.getSelector(this.storage.scope, '.wp_gallery');
			this.storage.gallery.classList.add(this.config.effect);
			this.wpGalleryInner = this.getSelector(this.storage.gallery, '.wp_gallery_inner');
			this.storage.wpBlockImage = this.storage.target.childElementCount;
			if (this.config.thumb === 'dot') {
				const wpGalleryThumbTemp = this.getTemp(this.storage.temp, 'wp_gallery_thumb_temp');
				const wpGalleryThumb = this.getSelector(wpGalleryThumbTemp, '.wp_gallery_thumb');
				if (this.config.thumb) wpGalleryThumb.classList.add(this.config.thumb);
				for (let i = 0; i < this.storage.wpBlockImage; i++) {
					const wpGalleryThumbItemTemp = this.getTemp(this.storage.temp, 'wp_gallery_thumb_item_temp');
					const wpGalleryThumbItem = this.getSelector(wpGalleryThumbItemTemp, '.wp_gallery_thumb_item');
					wpGalleryThumb.appendChild(wpGalleryThumbItem);
					wpGalleryThumbItem.addEventListener('click', (e) => {
						this.setIndex(i, 'order');
					});
				}
				this.wpGalleryInner.appendChild(wpGalleryThumb);
				this.storage.thumbItem = this.getSelectorAll(this.storage.gallery, '.wp_gallery_thumb_item');
			} else {
				const wpGalleryThumbTemp = this.getTemp(this.storage.temp, 'wp_gallery_thumb_temp');
				const wpGalleryThumb = this.getSelector(wpGalleryThumbTemp, '.wp_gallery_thumb');
				if (this.config.thumb) wpGalleryThumb.classList.add(this.config.thumb);
				for (let i = 0; i < this.storage.wpBlockImage; i++) {
					const image = this.storage.target.children[i];
					const wpGalleryThumbItemTemp = this.getTemp(this.storage.temp, 'wp_gallery_thumb_item_temp');
					const wpGalleryThumbItem = this.getSelector(wpGalleryThumbItemTemp, '.wp_gallery_thumb_item');
					const wpGalleryThumbImgTemp = this.getTemp(this.storage.temp, 'wp_gallery_thumb_img_temp');
					const img = this.getSelector(wpGalleryThumbImgTemp, 'img');
					img.src = this.getSelector(image, 'img').src;
					wpGalleryThumbItem.appendChild(img);
					wpGalleryThumb.appendChild(wpGalleryThumbItem);
					wpGalleryThumbItem.addEventListener('click', (e) => {
						this.setIndex(i, 'order');
					});
				}
				const wpGalleryControlTemp = this.getTemp(this.storage.temp, 'wp_gallery_control_temp');
				const prev = this.getSelector(wpGalleryControlTemp, '.prev');
				const next = this.getSelector(wpGalleryControlTemp, '.next');
				prev.addEventListener('click', (e) => {
					this.setIndex(-1);
				});
				next.addEventListener('click', (e) => {
					this.setIndex(1);
				});
				this.storage.gallery.appendChild(wpGalleryThumb);
				this.wpGalleryInner.appendChild(wpGalleryControlTemp);
				this.storage.thumbItem = this.getSelectorAll(this.storage.gallery, '.wp_gallery_thumb_item');
			}
			if (this.config.effect === 'fade') {
				for (let i = 0; i < this.storage.wpBlockImage; i++) {
					const element = this.storage.target.children[i];
					if (i === 0) {
						element.classList.add('current');
					}
					element.addEventListener('animationend', (e) => {
						const target = e.target;
						if (target.classList.contains('fadeOut')) target.classList.remove('fadeOut');
						if (target.classList.contains('current')) target.classList.remove('current');
						if (target.classList.contains('fadeIn')) {
							target.classList.remove('fadeIn');
							target.classList.add('current');
						}
					});
				}
			}
			this.setIndex(0, 'order');
			if (this.config.interval) {
				this.setInterval();
				this.storage.gallery.addEventListener('mouseenter', () => {
					this.abortInterval();
				});
				this.storage.gallery.addEventListener('mouseleave', () => {
					this.setInterval();
				});
			}
		}
	}
	config = {
		effect: null,
		interval: null,
		scope: null,
		target: null,
		thumb: null,
	};
	storage = {
		target: null,
		current: 0,
		currentNext: 1,
		gallery: null,
		interval: null,
		isEffectFirst: true,
		scope: null,
		temp: null,
		thumbItem: null,
		wpBlockImage: null,
		wpGalleryInner: null,
		wpGalleryThumbTemp: null,
	};
	init = (config) => {
		if (config) {
			for (const key in config) {
				if (Object.hasOwnProperty.call(config, key)) {
					this.config[key] = config[key];
				}
			}
		}
		this.storage.temp = this.getTemp(document, 'wp_gallery_temp');
		this.storage.scope = this.getSelector(document, this.config.scope);
		this.storage.target = this.getSelector(this.storage.scope, this.config.target);
	};
	getTemp = (parent, id) => {
		return parent.getElementById(id).content.cloneNode(true);
	};
	getSelector = (parent, query) => {
		return parent.querySelector(query);
	};
	getSelectorAll = (parent, query) => {
		return parent.querySelectorAll(query);
	};
	setIndex = (num, mode) => {
		const last = this.storage.current;
		if (mode) {
			switch (mode) {
				case 'reverse':
					this.storage.current -= num;
					break;
				case 'order':
					this.storage.current = num;
					break;
				default:
					this.storage.current += num;
					break;
			}
		} else {
			this.storage.current += num;
		}
		if (this.storage.current >= this.storage.wpBlockImage) {
			this.storage.current = 0;
		} else if (this.storage.current < 0) {
			this.storage.current = this.storage.wpBlockImage - 1;
		}
		switch (this.config.effect) {
			case 'fade':
				if (!this.storage.isEffectFirst) {
					this.storage.target.children(last).classList.remove('fadeIn');
					this.storage.target.children(last).classList.add('fadeOut');
					this.storage.target.children(this.storage.current).classList.remove('fadeOut');
					this.storage.target.children(this.storage.current).classList.add('fadeIn');
				}
				this.storage.isEffectFirst = false;
				break;
			default:
				this.storage.target.scrollLeft = this.storage.target.offsetWidth * this.storage.current;
				break;
		}
		if (this.config.thumb) {
			for (let i = 0; i < this.storage.thumbItem.length; i++) {
				this.storage.thumbItem.item(i).classList.remove('active');
			}
			this.storage.thumbItem.item(this.storage.current).classList.add('active');
		}
	};
	setInterval = () => {
		this.storage.interval = setInterval(() => {
			this.setIndex(1);
		}, this.config.interval);
	};
	abortInterval = () => {
		clearInterval(this.storage.interval);
	};
}
