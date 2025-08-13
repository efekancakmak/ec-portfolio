let darkmode = localStorage.getItem('darkmode') ?? "active";
const themeSwitch = document.getElementById('theme-switch');

const skyGradientColors = {
    night: {
        top: '#000033',
        middle: '#1a1a5a',
        bottom: '#4a1f3d',
    },
    day: {
        top: '#e6e8ff',
        middle: '#d6d7f2',
        bottom: '#f2d9e6',
    }
}

const mountainColors = {
    night: {
        top: '#303030',
        middle: '#1a1a1a',
    },
    day: {
        top: '#e0c1bf',
        middle: '#ffffff',
    }
}

const moonGlowColors = {
    night: [
        'rgba(255, 255, 255, 0.3)',
        'rgba(255, 255, 255, 0.1)',
        'rgba(255, 255, 255, 0)',
    ],
    day: [
        'rgba(242, 217, 230, 0.6)',
        'rgba(242, 217, 230, 0.2)',
        'rgba(242, 217, 230, 0)',
    ]
}

const moonGradientColors = {
    night: [
        '#ffffff',
        '#f4f4f4',
        '#e0e0e0',
        '#d0d0d0',
        '#c0c0c0',
    ],
    day: [
        '#e3d0cf',
        '#dbc3c1',
        '#e0c1bf',
        '#deb7b4',
        '#d9aaa7',
    ],
}

class MountainScene {
    constructor() {
        this.canvas = document.getElementById('backgroundCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.init();
    }

    init() {
        this.resizeCanvas();
        this.setupEventListeners();
        this.drawScene();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.drawScene();
        });
    }

    drawScene() {
        this.mode = localStorage.getItem('darkmode') === "deactive" ? "day" : "night";
        this.drawSky();
        this.drawMoon();
        this.drawMountains();
    }



    drawSky() {
        const skyGradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);

        skyGradient.addColorStop(0, skyGradientColors[this.mode].top);
        skyGradient.addColorStop(0.3, skyGradientColors[this.mode].middle);
        skyGradient.addColorStop(0.5, skyGradientColors[this.mode].bottom);

        this.ctx.fillStyle = skyGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }


    drawMoon() {
        const scaleX = this.canvas.width / 800;
        const scaleY = this.canvas.height / 400;

        const moonX = 650 * scaleX;
        const moonY = 80 * scaleY;
        const moonRadius = 40 * Math.min(scaleX, scaleY);

        // Draw moon glow
        const moonGlow = this.ctx.createRadialGradient(
            moonX, moonY, moonRadius,
            moonX, moonY, moonRadius * 2.5
        );

        if (this.mode === "night") {
            moonGlow.addColorStop(0, moonGlowColors.night[0]);
            moonGlow.addColorStop(0.5, moonGlowColors.night[1]);
            moonGlow.addColorStop(1, moonGlowColors.night[2]);
        }
        else {
            moonGlow.addColorStop(0, moonGlowColors.day[0]);
            moonGlow.addColorStop(0.5, moonGlowColors.day[1]);
            moonGlow.addColorStop(1, moonGlowColors.day[2]);
        }

        this.ctx.fillStyle = moonGlow;
        this.ctx.beginPath();
        this.ctx.arc(moonX, moonY, moonRadius * 2.5, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw moon
        const moonGradient = this.ctx.createRadialGradient(
            moonX - moonRadius * 0.2, moonY - moonRadius * 0.2, moonRadius * 0.1,
            moonX, moonY, moonRadius
        );

        if (this.mode === "night") {
            moonGradient.addColorStop(0, moonGradientColors.night[0]);
            moonGradient.addColorStop(0.2, moonGradientColors.night[1]);
            moonGradient.addColorStop(0.5, moonGradientColors.night[2]);
            moonGradient.addColorStop(0.8, moonGradientColors.night[3]);
            moonGradient.addColorStop(1, moonGradientColors.night[4]);
        }
        else {
            moonGradient.addColorStop(0, moonGradientColors.day[0]);
            moonGradient.addColorStop(0.2, moonGradientColors.day[1]);
            moonGradient.addColorStop(0.5, moonGradientColors.day[2]);
            moonGradient.addColorStop(0.8, moonGradientColors.day[3]);
            moonGradient.addColorStop(1, moonGradientColors.day[4]);
        }

        this.ctx.fillStyle = moonGradient;
        this.ctx.beginPath();
        this.ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawMountains() {
        const scaleX = this.canvas.width / 800;
        const scaleY = this.canvas.height / 400;

        const backMountainPoints = [
            { x: 0, y: 200 },
            { x: 80, y: 210 },
            { x: 160, y: 190 },
            { x: 240, y: 220 },
            { x: 320, y: 240 },
            { x: 400, y: 250 },
            { x: 480, y: 230 },
            { x: 560, y: 220 },
            { x: 640, y: 210 },
            { x: 720, y: 200 },
            { x: 800, y: 230 }
        ].map(p => ({ x: p.x * scaleX, y: p.y * scaleY }));

        const frontMountainPoints = [
            { x: 0, y: 250 },
            { x: 60, y: 260 },
            { x: 120, y: 240 },
            { x: 180, y: 270 },
            { x: 240, y: 290 },
            { x: 300, y: 300 },
            { x: 350, y: 280 },
            { x: 400, y: 260 },
            { x: 450, y: 230 },
            { x: 500, y: 200 },
            { x: 570, y: 220 },
            { x: 630, y: 230 },
            { x: 700, y: 240 },
            { x: 760, y: 245 },
            { x: 800, y: 250 }
        ].map(p => ({ x: p.x * scaleX, y: p.y * scaleY }));

        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height);
        backMountainPoints.forEach(point => {
            this.ctx.lineTo(point.x, point.y);
        });
        this.ctx.lineTo(this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = mountainColors[this.mode].top;
        this.ctx.fill();


        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height);
        frontMountainPoints.forEach(point => {
            this.ctx.lineTo(point.x, point.y);
        });
        this.ctx.lineTo(this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = mountainColors[this.mode].middle;
        this.ctx.fill();
    }
}

// Smooth Scrolling for Navigation
class SmoothScroller {
    constructor() {
        this.setupSmoothScrolling();
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
    new MountainScene();
    new SmoothScroller();
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', "deactive");
    new MountainScene();
    new SmoothScroller();
}
if (darkmode === "active") enableDarkmode();

themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode');
    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
})


// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MountainScene();
    new SmoothScroller();
}); 
