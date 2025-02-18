class Extra {

    constructor(scene){
        this.scene=scene;
        this.startButton(this.scene);
    }

    startButton(scene){
        scene.assets.startTrigger= scene.physics.add.sprite(0, 0, 'key').setAlpha(0).setSize(170,150); 
        // scene.physics.add.sprite(0,scene.assets.canvasHeight+35, 'key').setAlpha(0).setSize(2500,100); 
    }

}

export default Extra;