class Logic {
    constructor(scene, player) {
        // super(scene, 50, 0, "dino");
        this.LogicAssets = {
            scene: scene,
            player: player,
            cactus: [],
            lastSpawnX: 0,
            bird:[],
            scoreNum:0,
            itreator:undefined,
            highscore:localStorage.getItem('highscore'),
        };
        this.highscoreSetter();
    }

    cactusSpawner() {
       this.LogicAssets.itreator= this.LogicAssets.scene.time.addEvent({
            delay: 1500,
            callback: () => this.initializeImage(),
            loop: true
        });
    } 

    initializeImage() {

        if(this.decider()>25){
            const randomImage = Phaser.Math.Between(1, 6);
            const randomOffset = Phaser.Math.Between(200, 400);
            const spawnX = this.LogicAssets.lastSpawnX + randomOffset;
    
            const cactus = this.LogicAssets.scene.physics.add.image(
                Math.max(this.LogicAssets.scene.game.config.width, spawnX),
                this.LogicAssets.scene.game.config.height * 1,
                `cactuses_${randomImage}` 
            ).setVelocityX(-600).setOrigin(0.5,1) ;

            this.LogicAssets.lastSpawnX = spawnX;
            this.LogicAssets.cactus.push(cactus);
        }else{
            this.spawnBird();
        }
        
     
    }



    destroyCactus() {

        this.LogicAssets.cactus = this.LogicAssets.cactus.filter(cactus => {
            if (cactus.x < -100) {
                this.LogicAssets.scoreNum++;
                console.log("Cactus destroyed");
                cactus.destroy();
                return false;
            }
            this.LogicAssets.scene.physics.add.collider(this.LogicAssets.player, cactus, () => {
                this.LogicAssets.itreator.destroy();
                this.gameOver();
            });
            return true;
        });
        // console.log("After Destroy:", this.LogicAssets.cactus.length);
    }


    destroyBird() {

        this.LogicAssets.bird = this.LogicAssets.bird.filter(bird => {
            if (bird.x < -100) {
                this.LogicAssets.scoreNum++;
                console.log("bird destroyed");
                bird.destroy();
                return false;
            }
            this.LogicAssets.scene.physics.add.collider(this.LogicAssets.player, bird, () => {
                this.LogicAssets.itreator.destroy();
                this.gameOver();
            });
            return true;
        });
        // console.log("After Destroy:", this.LogicAssets.cactus.length);
    }


    gameOver() {
          this.highscore();
        // Pause physics
        this.stopPlayer();
        this.reloadButton().setInteractive()
            .on('pointerdown', () => {
                this.LogicAssets.scene.assets.isStart = false;
                this.LogicAssets.scene.scene.restart();
            });
        this.LogicAssets.player.setVisible(false);
        this.LogicAssets.scene.physics.pause();
        this.stopLand();
        // Flash player in red
        this.LogicAssets.player.setTint(0xff0000);

        // Show Game Over Text
        this.LogicAssets.scene.add.text(
            this.LogicAssets.scene.cameras.main.centerX,
            this.LogicAssets.scene.cameras.main.centerY - 50,
            'Game Over',
            { fontSize: '64px', fill: '#ff0000', fontFamily: 'Arial', fontStyle: 'bold' }
        ).setOrigin(0.5);
       this.cloudPause();
        // Restart Scene After Delay
        // this.LogicAssets.scene.time.delayedCall(1500, () => {
        //     this.LogicAssets.scene.assets.isStart=false; 
        //     this.LogicAssets.scene.scene.restart();  // ✅ Correct Restart Method
        // });
    }


    stopLand() {
        this.LogicAssets.scene.assets.isLandPaused = true; // Stop moving the land
    }

    stopPlayer() {
        this.LogicAssets.scene.add.image(
            this.LogicAssets.player.x,
            this.LogicAssets.player.y,
            'dinoGameOver'
        ).setOrigin(0.5, 0.5 ).setScale(1);
    }

    reloadButton() {
        return this.LogicAssets.scene.add.image(
            this.LogicAssets.scene.assets.canvasWidth / 2 - 50,
            this.LogicAssets.scene.assets.canvasHeight / 2,
            'reload'
        ).setOrigin(0, 0).setScale(1);
    }


    spawnBird() {
        const bird = this.LogicAssets.scene.physics.add.sprite(
            this.LogicAssets.scene.game.config.width + 100,
            Phaser.Math.Between(215, 255),
            "birddino"
        );
    
      
        bird.setVelocityX(-800);
        bird.setDepth(1);
        bird.setScale(0.8);
        bird.setSize(45,25)
        bird.play("bird_fly");
    
        bird.setCollideWorldBounds(false);
        this.LogicAssets.bird.push(bird);
    }
    


    decider(){
        return Phaser.Math.Between(1,50);
    }

    score(){
      this.LogicAssets.scene.assets.score.text=this.LogicAssets.scoreNum;
    }


    highscore(){
        if(this.LogicAssets.highscore<this.LogicAssets.scoreNum){
            localStorage.setItem('highscore',this.LogicAssets.scoreNum)
        }
        
    }

    highscoreSetter(){
        if(localStorage.getItem('highscore')!=undefined||localStorage.getItem('highscore')!=null){       
           this.LogicAssets.scene.assets.highscore.text=`HighScore:${localStorage.getItem('highscore')}`
        }else{
             this.LogicAssets.scene.assets.highscore.text=0;
        }
       
    }

    cloudPause(){
        this.LogicAssets.scene.assets.cloudTimer.destroy();
    }

    



}

export default Logic;