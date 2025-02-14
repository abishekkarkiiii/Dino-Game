// KeyboardInput.js

class KeyboardInput  {
    constructor(player) {
        this.scene = player.scene ;
        this.player = player; // Store the reference to the player
        this.keys = this.scene.input.keyboard.addKeys({
            A: Phaser.Input.Keyboard.KeyCodes.A,
            D: Phaser.Input.Keyboard.KeyCodes.D,
            F: Phaser.Input.Keyboard.KeyCodes.F,
            P: Phaser.Input.Keyboard.KeyCodes.P,
            C: Phaser.Input.Keyboard.KeyCodes.C,
            SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE,
        });
        setTimeout(() => {
            this.scene.physics.add.collider(this.scene.assets.startTrigger, this.scene.assets.dino, () => {
                console.log("Overlap detected!");
            });
        }, 1000)
    }
   

    update() {
        this.keyWorking();
    }

    // Check if a key is just pressed
    justDown(key) {
        return Phaser.Input.Keyboard.JustDown(this.keys[key]);
    }

    // Handle key actions (e.g., jumping)
    keyWorking() {
        if (this.justDown('SPACE') && this.player.body.blocked.down) {
            // console.log(this.player.scene.assets.startTrigger )
            this.player.setVelocityY(-1000); // Update the velocity in the player class
        }
    }
}

export default KeyboardInput;
