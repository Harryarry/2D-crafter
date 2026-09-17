// 1. Skapa en instans av vår separata spelmotor
const engine = new GameEngine(800, 600);

// Spelarens logiska variabler
let playerX = 375;
let playerY = 275;
let playerOldX = 375;
let playerOldY = 275;

// Spelarens visuella grafik i Pixi
let playerGraphics;

async function start() {
    // Starta motorn
    await engine.init();

    // Skapa spelarens utseende och lägg till på skärmen via motorns Pixi-app
    playerGraphics = new PIXI.Graphics().rect(0, 0, 50, 50).fill(0xe74c3c);
    engine.app.stage.addChild(playerGraphics);

    // Koppla ihop spelets logik med motorns loopar
    engine.onUpdate = gameUpdate;
    engine.onRender = gameRender;
}

// Denna körs exakt 20 gåanger i sekunden via motorn
function gameUpdate() {
    playerOldX = playerX;
    playerOldY = playerY;

    const speed = 5;

    // Vi använder motorns inbyggda isKeyDown-funktion
    if (engine.isKeyDown('ArrowRight') || engine.isKeyDown('d')) playerX += speed;
    if (engine.isKeyDown('ArrowLeft') || engine.isKeyDown('a')) playerX -= speed;
    if (engine.isKeyDown('ArrowUp') || engine.isKeyDown('w')) playerY -= speed;
    if (engine.isKeyDown('ArrowDown') || engine.isKeyDown('s')) playerY += speed;
}

// Denna körs så snabbt skärmen kan för att rita spelaren mjukt
function gameRender(alpha) {
    // Applicera motorns interpolation på spelargrafiken
    playerGraphics.x = playerOldX + (playerX - playerOldX) * alpha;
    playerGraphics.y = playerOldY + (playerY - playerOldY) * alpha;
}

// Starta alltsammans!
start();
