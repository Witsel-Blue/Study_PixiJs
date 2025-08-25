// Basic Structure

import { Application } from 'pixi.js';
import './style.css';

export default async function main() {
    // Application
    const app = new Application();

    await app.init({
        background: 'royalblue',
        resizeTo: window,
    });

    app.canvas.id = 'app-canvas';
    document.body.appendChild(app.canvas);
};