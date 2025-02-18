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
        // Create a new KeyboardInput instance, passing the player instance
        this.keyboard = new KeyboardInput(this); // Pass 'this' to KeyboardInput
        this.setBodySize(48, 85)
            .setGravityY(1500)
            .setCollideWorldBounds(true)
            .setOrigin(0.5)
            .setBodySize(45, 80)
            .setDepth(5)
        // Initialize other settings if needed
    }

    update() {
        // Call the update method of KeyboardInput to handle key actions
        this.keyboard.update(); 
    }
}

export default Player;
