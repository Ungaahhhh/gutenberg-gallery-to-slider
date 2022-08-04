export class WpGallery {
	constructor(config) {
		this.init(config);
		if (this.storage.target && this.storage.target.length > 0) {
			for (let i = 0; i < this.storage.target.length; i++) {
				let targetItem = this.storage.target.item(i);
				if (targetItem) {
					targetItem.outerHTML = `<div class="wp_gallery"><div class="wp_gallery_inner">${targetItem.outerHTML}</div></div>`;
					this.init();
					targetItem = this.storage.target.item(i);
					if (targetItem) {
						if (this.storage.scope) this.storage.gallery = this.getSelector(this.storage.scope, '.wp_gallery');
						if (this.storage.gallery) this.storage.gallery.classList.add(this.config.effect);
						const wpGalleryInner = this.getSelector(this.storage.gallery, '.wp_gallery_inner');
						targetItem.classList.add('wp_target');
						this.storage.itemCount = targetItem.childElementCount;
						if (this.config.thumb === 'dot') {
							const wpGalleryThumbTemp = this.getTemp(this.storage.temp, 'wp_gallery_thumb_temp');
							const wpGalleryThumb = this.getSelector(wpGalleryThumbTemp, '.wp_gallery_thumb');
							if (this.config.thumb) wpGalleryThumb.classList.add(this.config.thumb);
							for (let j = 0; j < this.storage.itemCount; j++) {
								const wpGalleryThumbItemTemp = this.getTemp(this.storage.temp, 'wp_gallery_thumb_item_temp');
								const wpGalleryThumbItem = this.getSelector(wpGalleryThumbItemTemp, '.wp_gallery_thumb_item');
								wpGalleryThumb.appendChild(wpGalleryThumbItem);
								wpGalleryThumbItem.addEventListener('click', (e) => {
									this.setIndex(i, j, 'order');
								});
							}
							wpGalleryInner.appendChild(wpGalleryThumb);
							this.storage.thumbItem = this.getSelectorAll(this.storage.gallery, '.wp_gallery_thumb_item');
						} else {
							const wpGalleryThumbTemp = this.getTemp(this.storage.temp, 'wp_gallery_thumb_temp');
							const wpGalleryThumb = this.getSelector(wpGalleryThumbTemp, '.wp_gallery_thumb');
							if (this.config.thumb) wpGalleryThumb.classList.add(this.config.thumb);
							for (let j = 0; j < this.storage.itemCount; j++) {
								const image = targetItem.children[j];
								image.classList.add('wp_target_item');
								const wpGalleryThumbItemTemp = this.getTemp(this.storage.temp, 'wp_gallery_thumb_item_temp');
								const wpGalleryThumbItem = this.getSelector(wpGalleryThumbItemTemp, '.wp_gallery_thumb_item');
								const wpGalleryThumbImgTemp = this.getTemp(this.storage.temp, 'wp_gallery_thumb_img_temp');
								const img = this.getSelector(wpGalleryThumbImgTemp, 'img') as HTMLImageElement;
								img.src = (this.getSelector(image, 'img') as HTMLImageElement).src;
								wpGalleryThumbItem.appendChild(img);
								wpGalleryThumb.appendChild(wpGalleryThumbItem);
								wpGalleryThumbItem.addEventListener('click', (e) => {
									this.setIndex(i, j, 'order');
								});
							}
							const wpGalleryControlTemp = this.getTemp(this.storage.temp, 'wp_gallery_control_temp');
							const prev = this.getSelector(wpGalleryControlTemp, '.prev');
							const next = this.getSelector(wpGalleryControlTemp, '.next');
							prev.dataset.targetIndex = String(i);
							next.dataset.targetIndex = String(i);
							prev.addEventListener('click', (e) => {
								prev.classList.add('active');
								this.setIndex(i, -1);
							});
							next.addEventListener('click', (e) => {
								next.classList.add('active');
								this.setIndex(i, 1);
							});
							if (this.storage.gallery) this.storage.gallery.appendChild(wpGalleryThumb);
							wpGalleryInner.appendChild(wpGalleryControlTemp);
							this.storage.thumbItem = this.getSelectorAll(this.storage.gallery, '.wp_gallery_thumb_item');
						}
						if (this.config.effect === 'fade') {
							for (let j = 0; j < this.storage.itemCount; j++) {
								const element = targetItem.children[j];
								if (j === 0) {
									element.classList.add('current');
								}
								element.addEventListener('animationend', (e) => {
									const target = e.target as HTMLElement;
									if (target.classList.contains('fadeOut')) target.classList.remove('fadeOut');
									if (target.classList.contains('current')) target.classList.remove('current');
									if (target.classList.contains('fadeIn')) {
										target.classList.remove('fadeIn');
										target.classList.add('current');
									}
									const prev = this.getSelector(wpGalleryInner, '.prev');
									const next = this.getSelector(wpGalleryInner, '.next');
									prev.classList.remove('active');
									next.classList.remove('active');
								});
							}
						}
						this.setIndex(i, 0, 'order');
						if (this.config.interval) {
							this.setInterval();
							if (this.storage.gallery)
								this.storage.gallery.addEventListener('mouseenter', () => {
									this.abortInterval();
								});
							if (this.storage.gallery)
								this.storage.gallery.addEventListener('mouseleave', () => {
									this.setInterval();
								});
						}
					}
				}
			}
		}
	}
	config: config = {
		effect: 'slider',
		interval: 0,
		scope: '',
		target: '',
		thumb: 'image',
	};
	storage: storage = {
		current: 0,
		gallery: null,
		interval: 0,
		isEffectFirst: true,
		itemCount: 0,
		scope: null,
		target: null,
		temp: null,
		thumbItem: null,
	};
	init = (config?) => {
		if (config) {
			for (const key in config) {
				if (Object.hasOwnProperty.call(config, key)) {
					this.config[key] = config[key];
				}
			}
		}
		this.storage.temp = this.getTemp(document, 'wp_gallery_temp');
		this.storage.scope = this.getSelector(document, this.config.scope);
		this.storage.target = this.getSelectorAll(this.storage.scope, this.config.target);
	};
	getTemp = (parent: any, id: string): HTMLElement => {
		return parent.getElementById(id).content.cloneNode(true) as HTMLElement;
	};
	getSelector = (parent: any, query: string): HTMLElement => {
		return parent.querySelector(query);
	};
	getSelectorAll = (parent: any, query: string): HTMLCollection => {
		return parent.querySelectorAll(query);
	};
	setIndex = (targetIndex: number, num: number, mode?: 'reverse' | 'order') => {
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
		if (this.storage.current >= this.storage.itemCount) {
			this.storage.current = 0;
		} else if (this.storage.current < 0) {
			this.storage.current = this.storage.itemCount - 1;
		}
		switch (this.config.effect) {
			case 'fade':
				if (!this.storage.isEffectFirst) {
					if (this.storage.target) {
						this.storage.target[targetIndex].children[last].classList.remove('fadeIn');
						this.storage.target[targetIndex].children[last].classList.add('fadeOut');
						this.storage.target[targetIndex].children[this.storage.current].classList.remove('fadeOut');
						this.storage.target[targetIndex].children[this.storage.current].classList.add('fadeIn');
					}
				}
				this.storage.isEffectFirst = false;
				break;
			default:
				if (this.storage.target) this.storage.target[targetIndex].scrollLeft = this.storage.target[targetIndex].offsetWidth * this.storage.current;
				break;
		}
		if (this.config.thumb) {
			if (this.storage.thumbItem) {
				for (let i = 0; i < this.storage.thumbItem.length; i++) {
					const prev = this.storage.thumbItem.item(i);
					if (prev) prev.classList.remove('active');
				}
				const next = this.storage.thumbItem.item(this.storage.current);
				if (next) next.classList.add('active');
			}
		}
	};
	setInterval = () => {
		this.storage.interval = setInterval(() => {
			if (this.storage.target && this.storage.target.length > 0) {
				for (let i = 0; i < this.storage.target.length; i++) {
					this.setIndex(i, 1);
				}
			}
		}, this.config.interval);
	};
	abortInterval = () => {
		clearInterval(this.storage.interval);
	};
}

type config = {
	effect: 'fade' | 'slider';
	interval: number;
	scope: string;
	target: string;
	thumb: 'dot' | 'image';
};

type storage = {
	current: number;
	gallery: HTMLElement | null;
	interval: number;
	isEffectFirst: boolean;
	itemCount: number;
	scope: HTMLElement | null;
	target: HTMLCollection | null;
	temp: HTMLElement | null;
	thumbItem: HTMLCollection | null;
};
