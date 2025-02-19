import Player from "./Entities/Player";
import Extra from "./Extra";
import Logic from "./Model/Logic";

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
        logic:undefined,
        isStart:false,
        isLandPaused:false,
        gameSpeed: 5.5,
        score:0,
        highscore:0,
        cloudArr:[],
        startingtext:undefined,
        startingTextFlag:undefined,
        cloudTimer:undefined

    };
    
    create() {
        this.anims.create({
            key: "birdd",
            frames: this.anims.generateFrameNumbers("dino-run"), // First row (frames 0-3)
            frameRate: 20,
            repeat: -1, // Loop animation
        });

        this.anims.create({
            key: "bird_fly",
            frames: this.anims.generateFrameNumbers("birddino", { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "dino-down",
            frames: this.anims.generateFrameNumbers("dino-down", { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.assets.canvasHeight = this.game.config.height;
        this.assets.canvasWidth = this.game.config.width;
        this.createEnviroment();
        this.assets.startingTextFlag=this.time.addEvent({
            delay: 500, // 500ms (0.5 seconds)
            callback: () => {
                this.assets.startingtext.visible = !this.assets.startingtext.visible; // Toggle visibility
            },
            loop: true // Keep running
        });

        this.assets.startingtext=this.add.text(this.assets.canvasWidth/2-170,this.assets.canvasHeight/2,`PRESS SPACE TO START`,{
            fontSize:30,
            fontFamily:"Arial",
            color:"#808080"
        })
 
        this.createPlayer();
        this.score();
        this.logic();
       
    }

    update() {
        if (this.assets.dino) {
            this.assets.dino.update();  // Call the player's update method to handle input
        } //s

            this.assets.logic.destroyCactus();
            this.assets.logic.destroyBird(); 
            if (!this.assets.isLandPaused) {
                if (this.assets.isStart) {
                    this.land.tilePositionX += 10; // Move land only if not paused
                }
            } 
            this.destroyCloud(); 
            this.assets.logic.score();
        
    }

    

    createEnviroment() {
        this.land = this.add.tileSprite(0, this.game.config.height, 150, 25, "ground").setOrigin(0, 1);
        this.assets.cloudTimer=this.time.addEvent({
            delay: 10000,
            callback: () => {
                this.cloud=this.physics.add.image(Phaser.Math.Between(this.assets.canvasWidth+150,this.assets.canvasWidth-170),Phaser.Math.Between( 100,this.assets.canvasHeight/2-160),"cloud").setVelocityX(-50);
                this.assets.cloudArr.push(this.cloud);
            },
            loop: true
        });
    
    }

    createPlayer() {
        this.extra=new Extra(this);
        this.assets.dino = new Player(this, 1, this.assets.canvasHeight);

    }

    logic(){
      this.assets.logic=new Logic (this,this.assets.dino); 
    }


    score(){
        this.assets.score=this.add.text(this.assets.canvasWidth-50,15,"0",{
            fontSize:30,
            fontFamily:"Arial",
            color:"#808080"
        })

        this.assets.highscore=this.add.text(10,15,`High score:`,{
            fontSize:30,
            fontFamily:"Arial",
            color:"#808080"
        })
    }


  destroyCloud(){
    this.assets.cloudArr.filter((x)=>{
        if(x.x<0){
            console.log("array destroyed"); 
            x.destroy();
        }

    })

  }

   

    

}

export default PlayGround;
