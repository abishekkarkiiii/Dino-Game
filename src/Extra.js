class Extra {

    constructor(scene){
        this.scene=scene;
        this.startButton(this.scene);
    }

    startButton(scene){
        scene.assets.startTrigger= scene.physics.add.sprite(0, 0, 'key').setAlpha(0).setSize(250,250); 
    }

}

export default Extra;