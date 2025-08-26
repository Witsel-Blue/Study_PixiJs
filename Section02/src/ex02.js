// MeshPlane - 스크롤 시에만 애니메이션 실행

import { Application, Assets, MeshPlane } from "pixi.js";
import './style.css'

export default async function example() {
    const app = new Application();
    await app.init({
        backgroundAlpha: 0,
        width: 500,
        height: 700,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
    });
    app.canvas.id = 'app-canvas';
    document.querySelector('.page').appendChild(app.canvas);

    const texture = await Assets.load('./images/flag.jpg');

    // MeshPlane
    const plane = new MeshPlane({
        texture,
        verticesX: 10,
        verticesY: 10,
    });
    plane.width = 426; // 이미지 넓이의 반
    plane.height = 640; // 이미지 높이의 반
    plane.x = 30;
    plane.y = 30;
    app.stage.addChild(plane);

    const { buffer } = plane.geometry.getAttribute('aPosition');

    let timer = 0;
    let isAnimating = false;
    let isResetting = false;
    let animationFrameId = null;

    const originalBufferData = new Float32Array(buffer.data);

    // 부드러운 리셋 애니메이션
    const smoothResetAnimation = () => {
        if (!isResetting) return;
        
        let needsUpdate = false;
        const easeAmount = 0.1; // 값이 클수록 빠르게 리셋됨
        
        for (let i = 0; i < buffer.data.length; i++) {
            const diff = originalBufferData[i] - buffer.data[i];
            if (Math.abs(diff) > 0.01) {
                buffer.data[i] += diff * easeAmount;
                needsUpdate = true;
            } else {
                buffer.data[i] = originalBufferData[i];
            }
        }
        
        if (needsUpdate) {
            buffer.update();
            animationFrameId = requestAnimationFrame(smoothResetAnimation);
        } else {
            isResetting = false;
        }
    };

    // 파도 애니메이션 함수
    const animate = () => {
        if (!isAnimating) return;
        
        for (let i = 0; i < buffer.data.length; i++) {
            buffer.data[i] += Math.sin(timer * 0.1 + i) * 0.5;
        }
        buffer.update();
        timer++;
        
        animationFrameId = requestAnimationFrame(animate);
    };

    // 스크롤 이벤트 핸들러
    let scrollTimeout = null;

    const handleScroll = () => {
        if (isResetting) {
            isResetting = false;
        }
        
        if (!isAnimating) {
            isAnimating = true;
            animate();
        }

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isAnimating = false;
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            timer = 0;
            isResetting = true;
            smoothResetAnimation();
        }, 150);
    };

    // 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);

    isAnimating = false;
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    timer = 0;
    isResetting = true;
    smoothResetAnimation();

    return () => {
        window.removeEventListener('scroll', handleScroll);
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        isAnimating = false;
        isResetting = false;
        clearTimeout(scrollTimeout);
    };

};
