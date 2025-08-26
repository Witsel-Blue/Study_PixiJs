// Container : 그룹화

import { Application, Assets, Sprite, Graphics, Container } from 'pixi.js';
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

    // Container
    const container = new Container();
    app.stage.addChild(container);
    container.x = app.screen.width / 2;
    container.y = app.screen.height / 2;

    // Sprite
    const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
    const bunny = new Sprite(texture);
    container.addChild(bunny);

    bunny.x = 100;
    bunny.y = 100;

    // Graphics
    const rect = new Graphics();
    rect.rect(0, 0, 50, 50);
    rect.fill();
    container.addChild(rect);

    // Animation
    app.ticker.add((delta) => {
        container.rotation += delta.deltaTime * 0.01;
    });

};