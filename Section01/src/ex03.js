// Animation

import { Application, Assets, Sprite, } from 'pixi.js';
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

    bunny.x = 0;
    bunny.y = app.screen.height / 2;
    bunny.anchor.set(0.5);
    bunny.scale.set(4);

    // Animation
    app.ticker.add((delta) => {
        // 속도: 1초당 60회 기본으로 반복(기기마다 다름)
        bunny.x += 4 * delta.deltaTime; // deltaTime: 기기에 따라 같은 속도로 보정
        bunny.rotation += delta.deltaTime * 0.1;
        if ( bunny.x > app.screen.width) {
            bunny.x = 0;
        }
    });

};