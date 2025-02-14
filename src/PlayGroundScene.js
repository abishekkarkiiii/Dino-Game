import Player from "./Entities/Player";
import Extra from "./Extra";

class PlayGround extends Phaser.Scene {

    constructor() {
        super({ key: 'PlayGround' });
    }

    assets = {
        keyboard: undefined,
        dino: undefined,
        startTrigger: undefined,
        startChecker: false,
        canvasHeight: undefined,
        canvasWidth: undefined,
        call:undefined,
    };
    
    create() {
        this.assets.canvasHeight = this.game.config.height;
        this.assets.canvasWidth = this.game.config.width;
        this.createEnviroment();
        this.createPlayer();
        console.log(this)
    }

    update() {
        if (this.assets.dino) {
            this.assets.dino.update();  // Call the player's update method to handle input
        }
    }

    

    createEnviroment() {
        this.land = this.add.tileSprite(0, this.game.config.height, 800, 25, "ground").setOrigin(0, 1);
    }

    createPlayer() {
        this.extra=new Extra(this);
        this.assets.dino = new Player(this, 1, this.assets.canvasHeight);
    }

    x(){
        console.log(this.assets.dino.x)
    }

    

}

export default PlayGround;
