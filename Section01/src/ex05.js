// Interaction

import { Application, Assets, Sprite } from 'pixi.js';
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

    // Interaction
    bunny.eventMode = 'static';
    bunny.cursor = 'pointer';

    let n = 1;

    bunny.on('pointertap', ()=> {
        // click: pc에서만 / pointertap: pc, mobile 둘다 가능
        bunny.scale.set(++n);
    });

};