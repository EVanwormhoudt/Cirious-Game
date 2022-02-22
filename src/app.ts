import "phaser";
import { LoadScene } from "./scenes/LoadScene";
import { IntroScene } from "./scenes/IntroScene";
import { HandWasherScene } from "./scenes/HandWasherScene";
import { ShoppingScene } from "./scenes/ShoppingScene";
import { MaskInvaderScene } from "./scenes/MaskInvaderScene";
import { OutroScene } from "./scenes/OutroScene";
  
const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    pixelArt: true,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
        gravity: { y: 0 },
      },
    },
    scene: [
      LoadScene,
      IntroScene,
      HandWasherScene,
      ShoppingScene,
      MaskInvaderScene,
      OutroScene
    ],
    render:{
      pixelArt: true
    }
}

const game = new Phaser.Game(config)