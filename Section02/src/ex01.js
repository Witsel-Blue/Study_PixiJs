import { Application } from "pixi.js";
import './style.css'

export default async function example() {
    const app = new Application();
    await app.init({
        // backgroundAlpha: 0,
        width: 500,
        height: 700,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
    });
    app.canvas.id = 'app-canvas';
    document.querySelector('.page').appendChild(app.canvas);

};
