export class GGToSlider {
	constructor(config) {
		this.init(config);
		if (this.storage.target && this.storage.target.length > 0) {
			for (let i = 0; i < this.storage.target.length; i++) {
				let targetItem = this.storage.target.item(i);
				if (targetItem) {
					targetItem.outerHTML = `<div class="GGToSlider"><div class="GGToSlider_inner">${targetItem.outerHTML}</div></div>`;
					this.init();
					targetItem = this.storage.target.item(i);
					if (targetItem) {
						if (this.storage.scope) this.storage.gallery = this.getSelector(this.storage.scope, '.GGToSlider');
						if (this.storage.gallery) this.storage.gallery.classList.add(this.config.effect);
						this.storage.inner[i] = this.getSelector(this.storage.gallery, '.GGToSlider_inner');
						targetItem.classList.add('GGToSlider_target');
						this.storage.itemCount = targetItem.childElementCount;
						if (this.config.thumb === 'dot') {
							const ggToSliderThumbTemp = this.getTemp(this.storage.temp, 'GGToSlider_thumb_temp');
							const ggToSliderThumb = this.getSelector(ggToSliderThumbTemp, '.GGToSlider_thumb');
							if (this.config.thumb) ggToSliderThumb.classList.add(this.config.thumb);
							for (let j = 0; j < this.storage.itemCount; j++) {
								const ggToSliderThumbItemTemp = this.getTemp(this.storage.temp, 'GGToSlider_thumb_item_temp');
								const ggToSliderThumbItem = this.getSelector(ggToSliderThumbItemTemp, '.GGToSlider_thumb_item');
								ggToSliderThumb.appendChild(ggToSliderThumbItem);
								ggToSliderThumbItem.addEventListener('click', (e) => {
									this.setIndex(i, j, 'order');
								});
							}
							this.storage.inner[i].appendChild(ggToSliderThumb);
							this.storage.thumbItem = this.getSelectorAll(this.storage.gallery, '.GGToSlider_thumb_item');
						} else {
							const ggToSliderThumbTemp = this.getTemp(this.storage.temp, 'GGToSlider_thumb_temp');
							const ggToSliderThumb = this.getSelector(ggToSliderThumbTemp, '.GGToSlider_thumb');
							if (this.config.thumb) ggToSliderThumb.classList.add(this.config.thumb);
							for (let j = 0; j < this.storage.itemCount; j++) {
								const image = targetItem.children[j];
								image.classList.add('GGToSlider_target_item');
								const ggToSliderThumbItemTemp = this.getTemp(this.storage.temp, 'GGToSlider_thumb_item_temp');
								const ggToSliderThumbItem = this.getSelector(ggToSliderThumbItemTemp, '.GGToSlider_thumb_item');
								const ggToSliderThumbImgTemp = this.getTemp(this.storage.temp, 'GGToSlider_thumb_img_temp');
								const img = this.getSelector(ggToSliderThumbImgTemp, 'img') as HTMLImageElement;
								img.src = (this.getSelector(image, 'img') as HTMLImageElement).src;
								ggToSliderThumbItem.appendChild(img);
								ggToSliderThumb.appendChild(ggToSliderThumbItem);
								ggToSliderThumbItem.addEventListener('click', (e) => {
									this.setIndex(i, j, 'order');
								});
							}
							const ggToSliderControlTemp = this.getTemp(this.storage.temp, 'GGToSlider_control_temp');
							const prev = this.getSelector(ggToSliderControlTemp, '.prev');
							const next = this.getSelector(ggToSliderControlTemp, '.next');
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
							if (this.storage.gallery) this.storage.gallery.appendChild(ggToSliderThumb);
							this.storage.inner[i].appendChild(ggToSliderControlTemp);
							this.storage.thumbItem = this.getSelectorAll(this.storage.gallery, '.GGToSlider_thumb_item');
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
									const prev = this.getSelector(this.storage.inner[i], '.prev');
									const next = this.getSelector(this.storage.inner[i], '.next');
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
		inner: [],
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
		this.storage.temp = this.getTemp(document, 'GGToSlider_temp');
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
				if (this.storage.target) {
					this.storage.target[targetIndex].scrollLeft = this.storage.target[targetIndex].offsetWidth * this.storage.current;
					setTimeout(() => {
						const prev = this.getSelector(this.storage.inner[targetIndex], '.prev');
						const next = this.getSelector(this.storage.inner[targetIndex], '.next');
						prev.classList.remove('active');
						next.classList.remove('active');
					}, 400);
				}
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
	inner: HTMLElement[];
	interval: number;
	isEffectFirst: boolean;
	itemCount: number;
	scope: HTMLElement | null;
	target: HTMLCollection | null;
	temp: HTMLElement | null;
	thumbItem: HTMLCollection | null;
};
