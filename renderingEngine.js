class GameEngine {
    constructor(width = 800, height = 600) {
        this.width = width;
        this.height = height;
        this.app = new PIXI.Application();
        this.keys = {};
        
        // Timestep & Interpolation inställningar
        this.TICKS_PER_SECOND = 20;
        this.TICK_TIME = 1000 / this.TICKS_PER_SECOND;
        this.accumulator = 0;

        // Funktioner som ditt spel (game.js) kommer att fylla i senare
        this.onUpdate = null;
        this.onRender = null;
    }

    async init() {
        // Starta renderingsmotorn
        await this.app.init({ 
            width: this.width, 
            height: this.height, 
            backgroundColor: 0x2c3e50 
        });
        document.body.appendChild(this.app.canvas);

        // Starta input-hantering
        window.addEventListener('keydown', (e) => this.keys[e.key] = true);
        window.addEventListener('keyup', (e) => this.keys[e.key] = false);

        // Starta motorns loop
        this.app.ticker.add((ticker) => this.loop(ticker));
    }

    loop(ticker) {
        this.accumulator += ticker.elapsedMS;

        // Kör fasta ticks (Fysik och logik)
        while (this.accumulator >= this.TICK_TIME) {
            if (this.onUpdate) this.onUpdate();
            this.accumulator -= this.TICK_TIME;
        }

        // Räkna ut interpolation (alpha)
        const alpha = this.accumulator / this.TICK_TIME;

        // Kör renderingssteget och skicka med alpha till spelet
        if (this.onRender) this.onRender(alpha);
    }

    // Enkel hjälpmetod för att kolla om en tangent är nedtryckt
    isKeyDown(key) {
        return !!this.keys[key];
    }
}
