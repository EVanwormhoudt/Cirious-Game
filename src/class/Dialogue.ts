import "phaser";
import { TypewriteText } from "../class/TypewriteText"

type Callback = {
    (): void;
};

export class Dialogue {
    constructor(scene : Phaser.Scene, text : string, x : number, y : number, callback? : Callback) {
        let dialogueBox : Phaser.GameObjects.Image = scene.add.image(x, y, 'message_box');
        dialogueBox.setScale(3 / scene.cameras.main.zoom);
        dialogueBox.setDepth(499);

        let fontSize = 25 / scene.cameras.main.zoom;
        let lineSpacing = 20 / scene.cameras.main.zoom;

        let textObject : TypewriteText = new TypewriteText(scene, x - (240 * dialogueBox.scale), y - (28 * dialogueBox.scale), text, 3, 480 * dialogueBox.scale, {
            fontSize: fontSize + 'px',
            fontFamily: '"Press Start 2P"',
            color: 'white',
            lineSpacing: lineSpacing
        }, () => {
            dialogueBox.destroy();
            if (callback != undefined) callback();
        })
    }
}
