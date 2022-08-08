# gutenberg-gallery-to-slider

## 使い方

```HTML
<link rel="stylesheet" href="./gutenberg-gallery-to-slider.scss" />
<template id="GGToSlider_temp">
    <template id="GGToSlider_thumb_temp">
        <ul class="GGToSlider_thumb"></ul>
    </template>
    <template id="GGToSlider_thumb_item_temp">
        <li class="GGToSlider_thumb_item"></li>
    </template>
    <template id="GGToSlider_thumb_img_temp">
        <img />
    </template>
    <template id="GGToSlider_control_temp">
        <button type="button" class="control prev" tabindex="-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 327.832 512">
                <g transform="translate(-92.084)"><path d="M419.916,71.821,348.084,0l-256,256.005L348.084,512l71.832-71.822L235.742,256.005Z" /></g>
            </svg>
        </button>
        <button type="button" class="control next" tabindex="-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 327.832 512">
                <g transform="translate(-92.084)"><path d="M163.916,0,92.084,71.822,276.258,256,92.084,440.178,163.916,512l256-256Z" /></g>
            </svg>
        </button>
    </template>
</template>
```

```JS
import { GGToSlider } from './gutenberg-gallery-to-slider';
window.addEventListener('DOMContentLoaded', () => {
    const scrollConfig = {
    interval: 4000,
    scope: '#scroll',
    target: 'ul',
    };
    new GGToSlider(scrollConfig);
});
```