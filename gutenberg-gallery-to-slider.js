/*! gutenberg-gallery-to-slider v0.0.30 | Ungaahhhh | https://github.com/Ungaahhhh/gutenberg-gallery-to-slider/blob/main/LICENSE */
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
                    this.storage.gallery[i] = this.getSelectorAll(this.storage.scope, '.GGToSlider').item(i);
                    const gallery = this.storage.gallery[i];
                    if (targetItem && gallery) {
                        if (this.config.effect)
                            gallery.classList.add(this.config.effect);
                        const inner = this.getSelector(this.storage.gallery[i], '.GGToSlider_inner');
                        targetItem.classList.add('GGToSlider_target');
                        this.storage.itemCount = targetItem.childElementCount;
                        if (this.config.control && this.config.control.thumb === 'dot') {
                            const ggToSliderThumbTemp = this.getTemp(this.storage.temp, 'GGToSlider_thumb_temp');
                            const ggToSliderThumb = this.getSelector(ggToSliderThumbTemp, '.GGToSlider_thumb');
                            ggToSliderThumb.classList.add(this.config.control.thumb);
                            for (let j = 0; j < this.storage.itemCount; j++) {
                                const image = targetItem.children[j];
                                image.classList.add('GGToSlider_target_item');
                                const ggToSliderThumbItemTemp = this.getTemp(this.storage.temp, 'GGToSlider_thumb_item_temp');
                                const ggToSliderThumbItem = this.getSelector(ggToSliderThumbItemTemp, '.GGToSlider_thumb_item');
                                ggToSliderThumb.appendChild(ggToSliderThumbItem);
                                ggToSliderThumbItem.addEventListener('click', (e) => {
                                    ggToSliderThumb.classList.add('disabled');
                                    this.setIndex(i, j, 'order');
                                });
                            }
                            inner.appendChild(ggToSliderThumb);
                            this.storage.thumbItem = this.getSelectorAll(this.storage.gallery[i], '.GGToSlider_thumb_item');
                        }
                        else if (this.config.control && this.config.control.thumb === 'image') {
                            const ggToSliderThumbTemp = this.getTemp(this.storage.temp, 'GGToSlider_thumb_temp');
                            const ggToSliderThumb = this.getSelector(ggToSliderThumbTemp, '.GGToSlider_thumb');
                            ggToSliderThumb.classList.add(this.config.control.thumb);
                            for (let j = 0; j < this.storage.itemCount; j++) {
                                const image = targetItem.children[j];
                                image.classList.add('GGToSlider_target_item');
                                const ggToSliderThumbItemTemp = this.getTemp(this.storage.temp, 'GGToSlider_thumb_item_temp');
                                const ggToSliderThumbItem = this.getSelector(ggToSliderThumbItemTemp, '.GGToSlider_thumb_item');
                                const ggToSliderThumbImgTemp = this.getTemp(this.storage.temp, 'GGToSlider_thumb_img_temp');
                                const img = this.getSelector(ggToSliderThumbImgTemp, 'img');
                                img.src = this.getSelector(image, 'img').src;
                                ggToSliderThumbItem.appendChild(img);
                                ggToSliderThumb.appendChild(ggToSliderThumbItem);
                                ggToSliderThumbItem.addEventListener('click', (e) => {
                                    ggToSliderThumb.classList.add('disabled');
                                    this.setIndex(i, j, 'order');
                                });
                            }
                            gallery.appendChild(ggToSliderThumb);
                            this.storage.thumbItem = this.getSelectorAll(gallery, '.GGToSlider_thumb_item');
                            if (this.config.control.adjacent === true) {
                                const ggToSliderControlTemp = this.getTemp(this.storage.temp, 'GGToSlider_control_temp');
                                const prev = this.getSelector(ggToSliderControlTemp, '.prev');
                                const next = this.getSelector(ggToSliderControlTemp, '.next');
                                prev.dataset.targetIndex = String(i);
                                next.dataset.targetIndex = String(i);
                                prev.addEventListener('click', (e) => {
                                    prev.classList.add('disabled');
                                    this.setIndex(i, -1);
                                });
                                next.addEventListener('click', (e) => {
                                    next.classList.add('disabled');
                                    this.setIndex(i, 1);
                                });
                                inner.appendChild(ggToSliderControlTemp);
                            }
                        }
                        if (this.config.effect === 'fade') {
                            for (let j = 0; j < this.storage.itemCount; j++) {
                                const element = targetItem.children[j];
                                if (j === 0) {
                                    element.classList.add('current');
                                }
                                element.addEventListener('animationend', (e) => {
                                    const target = e.target;
                                    if (target.classList.contains('fadeOut'))
                                        target.classList.remove('fadeOut');
                                    if (target.classList.contains('current'))
                                        target.classList.remove('current');
                                    if (target.classList.contains('fadeIn')) {
                                        target.classList.remove('fadeIn');
                                        target.classList.add('current');
                                    }
                                    if (this.config.control && this.config.control.adjacent === true) {
                                        const prev = this.getSelector(inner, '.prev');
                                        const next = this.getSelector(inner, '.next');
                                        prev.classList.remove('disabled');
                                        next.classList.remove('disabled');
                                    }
                                    const ggToSliderThumb = this.getSelector(gallery, '.GGToSlider_thumb');
                                    ggToSliderThumb.classList.remove('disabled');
                                });
                            }
                        }
                        this.setIndex(i, 0, 'order');
                        if (this.config.interval && this.config.interval > 0) {
                            this.setInterval();
                            gallery.addEventListener('mouseenter', () => {
                                this.abortInterval();
                            });
                            gallery.addEventListener('mouseleave', () => {
                                this.setInterval();
                            });
                        }
                    }
                }
            }
        }
    }
    config = {
        control: {
            adjacent: true,
            thumb: 'image',
        },
        effect: 'slider',
        interval: 0,
        scope: '',
        target: '',
    };
    storage = {
        current: 0,
        gallery: [],
        interval: 0,
        isEffectFirst: true,
        itemCount: 0,
        scope: null,
        target: null,
        temp: null,
        thumbItem: null,
    };
    init = (config) => {
        if (config) {
            this.config = { ...this.config, ...config };
        }
        this.storage.temp = this.getTemp(document, 'GGToSlider_temp');
        this.storage.scope = this.getSelector(document, this.config.scope);
        this.storage.target = this.getSelectorAll(this.storage.scope, this.config.target);
        try {
            if (this.storage.target && this.storage.target.length > 0) {
            }
            else {
                throw new Error();
            }
        }
        catch (error) {
            console.log(`${this.config.scope} or ${this.config.target} が取得できませんでした。`);
        }
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
    setIndex = (targetIndex, num, mode) => {
        const last = this.storage.current;
        if (this.storage.target) {
            const targetItem = this.storage.target[targetIndex];
            const galleryItem = this.storage.gallery[targetIndex];
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
            }
            else {
                this.storage.current += num;
            }
            if (this.storage.current >= this.storage.itemCount) {
                this.storage.current = 0;
            }
            else if (this.storage.current < 0) {
                this.storage.current = this.storage.itemCount - 1;
            }
            switch (this.config.effect) {
                case 'fade':
                    if (!this.storage.isEffectFirst) {
                        targetItem.children[last].classList.remove('fadeIn');
                        targetItem.children[last].classList.add('fadeOut');
                        targetItem.children[this.storage.current].classList.remove('fadeOut');
                        targetItem.children[this.storage.current].classList.add('fadeIn');
                    }
                    this.storage.isEffectFirst = false;
                    break;
                case 'slider':
                    targetItem.scrollLeft = targetItem.offsetWidth * this.storage.current;
                    setTimeout(() => {
                        if (this.config.control && this.config.control.adjacent === true) {
                            const prev = this.getSelector(galleryItem, '.prev');
                            const next = this.getSelector(galleryItem, '.next');
                            prev.classList.remove('disabled');
                            next.classList.remove('disabled');
                        }
                        const ggToSliderThumb = this.getSelector(galleryItem, '.GGToSlider_thumb');
                        if (ggToSliderThumb)
                            ggToSliderThumb.classList.remove('disabled');
                    }, 400);
                    break;
            }
            if (this.storage.thumbItem) {
                for (let i = 0; i < this.storage.thumbItem.length; i++) {
                    const prev = this.storage.thumbItem.item(i);
                    if (prev)
                        prev.classList.remove('active');
                }
                const next = this.storage.thumbItem.item(this.storage.current);
                if (next)
                    next.classList.add('active');
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
//# sourceMappingURL=gutenberg-gallery-to-slider.js.map