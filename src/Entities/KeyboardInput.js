class KeyboardInput extends Phaser.Physics.Arcade.Sprite {
    keyboardAssets = {
        checker: false,
        animationState: false,
        firststart: true,
        isCrouching: false,
        crouchCooldown: false,  // Cooldown for crouch
        crouchTimeout: null,    // Timeout reference for cooldown
    }

    constructor(player) {
        super(player.scene, 40, 50, "dino");
        this.scene = player.scene;
        this.player = player;

        // Store original body size and offset for standing state
        this.originalBodySize = { width: 48, height: 85 };
        this.originalOffset = { x: 0, y: 5 };

        this.playerLocation = 297.5;
        this.keys = this.scene.input.keyboard.addKeys({
            A: Phaser.Input.Keyboard.KeyCodes.A,
            D: Phaser.Input.Keyboard.KeyCodes.D,
            F: Phaser.Input.Keyboard.KeyCodes.F,
            P: Phaser.Input.Keyboard.KeyCodes.P,
            C: Phaser.Input.Keyboard.KeyCodes.C,
            SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE,
        });

        setTimeout(() => {
            let i = 0;
            this.scene.physics.add.overlap(this.scene.assets.startTrigger, this.scene.assets.dino, () => {
                if (i == 0) {
                    this.player.scene.assets.isStart = true;
                    this.player.scene.assets.isLandPaused = false;
                    this.player.scene.assets.logic.cactusSpawner();
                    i++;
                }
            });
        }, 50);
    }

    update() {
        if (this.keyboardAssets.checker && this.scene.land.width <= this.scene.game.config.width) {
            this.player.setVelocityX(200);
            this.scene.land.width += 50;
        }

        if (this.player.body.blocked.down) {
            this.player.setVelocityX(0);
        }

        this.keyWorking();
    }

    justDown(key) {
        return this.keys[key].isDown && !this.keys[key].isUp;
    }

    justUp(key) {
        return Phaser.Input.Keyboard.JustUp(this.keys[key]);
    }

    keyWorking() {
        if (this.keyboardAssets.firststart) {
            this.player.setFrame(0);
            this.player.anims.stop();
        }

        // Handle Jump
        if (!this.keyboardAssets.isCrouching && this.justDown('SPACE') && this.player.body.blocked.down) {
            if (!this.keyboardAssets.checker) {
                this.keyboardAssets.firststart = false;
                this.player.setVelocityY(-800);
                this.player.setFrame(0);
                this.keyboardAssets.checker = true;
                this.keyboardAssets.animationState = "jumping";
            } else {
                this.player.setVelocityY(-800);
                this.player.setFrame(0);
            }
        }

        // Mid-air frame handling
        if (!this.player.body.blocked.down && this.keyboardAssets.animationState !== "paused") {
            this.player.setFrame(0);
            this.player.anims.stop();
            this.keyboardAssets.animationState = "paused";
        }

        // Landing handling
        if (this.player.body.blocked.down && this.keyboardAssets.animationState === "paused") {
            this.player.play("birdd", true);
            this.keyboardAssets.animationState = "running";
            this.keyboardAssets.checker = false;
        }

        // Crouch handling
        if (this.keys.C.isDown && this.player.body.blocked.down && this.player.scene.assets.isStart) {
            if (!this.keyboardAssets.crouchCooldown && this.keyboardAssets.animationState !== "crouching") {
                this.player.setTexture('dino-down');
                this.player.setOffset(0, -25);
                this.player.setBodySize(48, 40);
                this.player.play("dino-down", true);
                this.keyboardAssets.animationState = "crouching";
                this.keyboardAssets.isCrouching = true;

                // Set cooldown to prevent rapid toggling
                this.keyboardAssets.crouchCooldown = true;
                this.keyboardAssets.crouchTimeout = setTimeout(() => {
                    this.keyboardAssets.crouchCooldown = false;
                }, 50 );
                console.log("hello")
            }
        }

        // Stand up handling
        if (this.keys.C.isUp && this.keyboardAssets.isCrouching && this.player.body.blocked.down) {
            this.player.setTexture('birdd');
            this.player.setBodySize(this.originalBodySize.width, this.originalBodySize.height);
            this.player.setOffset(this.originalOffset.x, this.originalOffset.y);
            this.player.play("birdd", true);
            this.keyboardAssets.animationState = "running";
            this.keyboardAssets.isCrouching = false;
            console.log("hello")
            // Reset cooldown
            if (this.keyboardAssets.crouchTimeout) {
              
                clearTimeout(this.keyboardAssets.crouchTimeout);
                this.keyboardAssets.crouchTimeout = null;
            }
            this.keyboardAssets.crouchCooldown = false;
        }
    }
}

export default KeyboardInput;