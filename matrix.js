const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

let fontSize = 16;
let columns = 0;
let drops = [];
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"\'#&_(),.;:?!\\|{}<>[]^~';

function initCanvas() {
    // Use window.innerWidth/Height for the drawing area
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * canvas.height / fontSize; // Randomize start positions
    }
}

function draw() {
    // Semi-transparent black to create trailing effect
    ctx.fillStyle = 'rgba(17, 17, 17, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00fd93';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top if it goes off screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

// Initialize
initCanvas();

// Handle resize and zoom
window.addEventListener('resize', () => {
    initCanvas();
});

// Run animation
setInterval(draw, 33);
