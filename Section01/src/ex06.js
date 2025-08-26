// Filter

import { Application, Assets, Sprite, BlurFilter, ColorMatrixFilter, DisplacementFilter, AlphaFilter, NoiseFilter } from 'pixi.js';
import './style.css';

export default async function main() {
    // Application
    const app = new Application();

    await app.init({
        background: 'royalblue',
        resizeTo: window,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
    });

    app.canvas.id = 'app-canvas';
    document.body.appendChild(app.canvas);

    // Sprite
    const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
    const bunny = new Sprite(texture);
    app.stage.addChild(bunny);

    bunny.anchor.set(0.5);
    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;
    bunny.scale.set(2);

    // Filter
    // const blurFilter = new BlurFilter({ strength: 3 });
    // bunny.filters = blurFilter;

    const colorMatrixFilter = new ColorMatrixFilter();
    colorMatrixFilter.hue(Math.random() * 360);

    const filterSpriteTexture = await Assets.load('https://pixijs.com/assets/tutorials/fish-pond/displacement_map.png');
    const filterSprite = new Sprite(filterSpriteTexture);

    const filters = [
        new BlurFilter({ strength: 5 }), // 블러
        colorMatrixFilter, // 컬러
        new DisplacementFilter(filterSprite), // 왜곡
        new AlphaFilter({ alpha: 0.3 }), // 투명도
        new NoiseFilter({ noise: 0.5 }), // 노이즈
    ]
    bunny.filters = filters[2];

};