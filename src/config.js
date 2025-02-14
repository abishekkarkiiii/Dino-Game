import Phaser, { Physics } from "phaser"
import LoadingScene from "./LoadingClass"
import PlayGround from "./PlayGroundScene"
const conf={
  type:Phaser.AUTO,
  width:1000,
  height:340,
  pixelArt:true,
  transparent:true,
  scene:[
    LoadingScene,PlayGround,// new LoadingScene(),MainScene,MenuScene,BaseScene,HighScore
  ],
//   parent:'game',
  dom:{createContainer:true},
  physics:{
    default:'arcade',
   
    arcade:{
      debug:true,
      gravity:{
        // y:170
      }
    }

  }

}

const game=new Phaser.Game(conf)

game.canvas.style.position = 'absolute';
game.canvas.style.top = '50px';
game.canvas.style.left = '100px';