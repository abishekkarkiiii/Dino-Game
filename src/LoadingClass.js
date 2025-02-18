class LoadingScene extends Phaser.Scene{

    constructor(){
        super({key:'LoadingScene'});
    }

    preload(){
        this.load.image('ground','/assets/ground.png');
        for (let i = 1; i < 7; i++) {
            this.load.image(`cactuses_${i}`, `/assets/cactuses_${i}.png`);
        }

        // for (let i = 0; i < 7; i++) {
        //     this.load.image(`walk-${i}`, `/assets/cactuses${i}.png`);
        // }

        this.load.image('dino','/assets/dino-idle-2.png');
        this.load.spritesheet("dino-run","/assets/dino-run.png",{
            frameWidth:352/4,
            frameHeight:94
        })
        this.load.image("dinoGameOver","/assets/dino-hurt.png");
        this.load.image("reload","/assets/restart.png");
        this.load.image("cloud","/assets/cloud.png");
        this.load.spritesheet("birddino","/assets/enemy-bird.png",{
            frameWidth:92,
            frameHeight:77
        })

        this.load.spritesheet("dino-down","/assets/dino-down.png",{
            frameWidth:236/2,
            frameHeight:58
        })
    }

    create(){
        this.scene.start('PlayGround')

    }

    upload(){

    }


    

}
export default LoadingScene;