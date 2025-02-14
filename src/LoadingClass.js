class LoadingScene extends Phaser.Scene{

    constructor(){
        super({key:'LoadingScene'});
    }

    preload(){
        this.load.image('ground','/assets/ground.png');
        // for (let i = 0; i < 7; i++) {
        //     this.load.image(`cactuses_${i}`, `/assets/cactuses_${i}.png`);
        // }

        this.load.image('dino','/assets/dino-idle-2.png');

    }

    create(){
        this.scene.start('PlayGround')

    }

    upload(){

    }


    

}
export default LoadingScene;