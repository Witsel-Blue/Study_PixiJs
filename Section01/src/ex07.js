// Sprite Animation

import { Application, Assets, AnimatedSprite, Texture, Rectangle } from 'pixi.js';
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

    const texture = await Assets.load('./images/Attack_1.png');
    // const frames = [
    //     // 6 frames, 768 x 128
    //     new Texture({
    //         source: texture,
    //         frame: new Rectangle(0, 0, 128, 128),
    //     }),
    //     new Texture({
    //         source: texture,
    //         frame: new Rectangle(128, 0, 128, 128),
    //     }),
    //     new Texture({
    //         source: texture,
    //         frame: new Rectangle(256, 0, 128, 128),
    //     }),
    //     new Texture({
    //         source: texture,
    //         frame: new Rectangle(384, 0, 128, 128),
    //     }),
    //     new Texture({
    //         source: texture,
    //         frame: new Rectangle(512, 0, 128, 128),
    //     }),
    //     new Texture({
    //         source: texture,
    //         frame: new Rectangle(640, 0, 128, 128),
    //     }),
    // ];
    const frames = [];
    for (let i = 0; i < 6; i++ ) {
        const frame = new Texture({
            source: texture,
            frame: new Rectangle(i * 128, 0, 128, 128),
        });
        frames.push(frame); 
    }

    const Samurai = new AnimatedSprite(frames);
    app.stage.addChild(Samurai);

    Samurai.animationSpeed = 0.2;
    Samurai.loop = false;
    // Samurai.play();

    Samurai.eventMode = 'static';
    Samurai.cursor = 'pointer';
    Samurai.on('pointertap', () => {
        // Samurai.play();
        Samurai.gotoAndPlay(0); // 0 프레임부터 플레이
    });
    Samurai.onComplete = () => {
        Samurai.gotoAndStop(0); // 스탑 후 0 프레임으로
    }

};