# gutenberg-gallery-to-slider

## こんな人にオススメ

 - Gutenberg の ギャラリー を スライダーにしたい
 - WordPress のプラグインを使いたくない
 - WordPress のテーマを編集できる
 - scroll-snap-type 使ってもいい
 - scroll-behavior 使ってもいい
 - `<template>` 使ってもいい
 - JS 少し書ける
 - 自力で CSS 編集してデザイン変えられる
 - 横スクロールのバーが出ても気にしない
 - スライダーの始めに画像に戻る時スクロールしてもいい
 - タッチデバイスは（開発中）でもいい
 - いろいろ寛容な人

## 使い方

### HTML

```template.html
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

 - `body`のどこかに
 - `button`の中身は好きなものを

### CSS

```HTML
<link rel="stylesheet" href="gutenberg-gallery-to-slider.css" />
```

or

```html
<link rel="stylesheet" href="gutenberg-gallery-to-slider.min.js" />
```

 - `<head>`のどこかに


### JS

```JS
import { GGToSlider } from 'gutenberg-gallery-to-slider.js';
window.addEventListener('DOMContentLoaded', () => {
	const option = {
		scope: 'element', // Any element
        target: '.wp-block-gallery', // From Gutenberg
	};
    new GGToSlider(option);
});
```

 - `type="module"`を忘れずに
 - 任意の場所にファイルを配置して import
 - 任意のタイミングで
 - オプション変数つくって
 - new GGToSlider() すればオッケー
 - target は複数あってもダイジョウブ
 - scope と target の DOM構造が一致すれば WordPress のソースじゃなくてもオッケー

## Option

```typescript
type option = {
	control?: {
		adjacent?: boolean; // 前後 省略可 (true)
		thumb?: 'dot' | 'image'; // サムネイル 省略可('image')
	};
	effect?: 'fade' | 'slider'; // アニメーション効果 省略可('slider')
	interval?: number; // オートプレイ ミリ秒 省略可(0)
	scope: string; // CSS Selector 必須
	target: string; // CSS Selector 必須
};
```

------

gutenberg-gallery-to-slider v0.0.30 | Ungaahhhh | https://github.com/Ungaahhhh/gutenberg-gallery-to-slider/blob/main/LICENSE
