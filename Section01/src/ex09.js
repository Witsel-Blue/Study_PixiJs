// Tiling Sprite (Background)

import { Application, Assets, AnimatedSprite, Texture, Rectangle, TilingSprite } from 'pixi.js';
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

    // Tiling Sprite
    const bgTexture = await Assets.load('./images/bg.png');
    const bgSprite = new TilingSprite({
        texture: bgTexture,
        width: app.screen.width, // 타일 표시되는 공간의 크기
        height: app.screen.height,
    });
    app.stage.addChild(bgSprite);
    // bgSprite.tileScale.set(0.1);

    function adjustTileScale() {
        const scale = window.innerHeight / bgTexture.height;
        bgSprite.tileScale.set(scale);
        bgSprite.width = window.innerWidth;
        bgSprite.Height = window.innerHeight;

        Samurai.y = app.screen.height * 0.5 - Samurai.height;
    }

    // Sound
    const swordSound = new Audio('./sounds/sword.mp3');

    // Sprite Animation
    const texture = await Assets.load('./images/Attack_1.png');
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

    Samurai.eventMode = 'static';
    Samurai.cursor = 'pointer';
    Samurai.on('pointertap', () => {
        Samurai.gotoAndPlay(0);
        swordSound.currentTime = 0;
        swordSound.play();
    });
    Samurai.onComplete = () => {
        Samurai.gotoAndStop(0);
    }

    window.addEventListener('resize', adjustTileScale);
    adjustTileScale();

    app.ticker.add(delta => {
        bgSprite.tilePosition.x -= 2 * delta.deltaTime;
    });

};