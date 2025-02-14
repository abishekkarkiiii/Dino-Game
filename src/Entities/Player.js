// Player.js
import KeyboardInput from "./KeyboardInput";

class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "dino");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.init();
    }

    init() {
        console.log(this)
        // Create a new KeyboardInput instance, passing the player instance
        this.keyboard = new KeyboardInput(this); // Pass 'this' to KeyboardInput
        this.setBodySize(85, 85)
            .setGravityY(1500)
            .setCollideWorldBounds(true);
        // this.scene.x()
    }

    update() {
        // Call the update method of KeyboardInput to handle key actions
        this.keyboard.update();
    }
}

export default Player;
