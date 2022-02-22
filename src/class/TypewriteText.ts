import "phaser";
import { CONFIG } from "../config";

type Callback = {
    (): void;
};

export class TypewriteText extends Phaser.GameObjects.Text {
    canContinue : boolean = true;
    askContinue : boolean = true;
    skipButton: Phaser.GameObjects.Text;
    constructor(scene : Phaser.Scene, x : number, y : number, text : string, nbLine : number, wordWrapWidth : number, style : object, callback? : Callback) {
        super(scene, x, y, '', style);
        scene.add.existing(this);
        this.setWordWrapWidth(wordWrapWidth);
        this.setDepth(500);
        this.typewriteText(scene, text, nbLine, callback);
    }
    private typewriteText(scene : Phaser.Scene, text : string, nbLine : number, callback? : Callback) : void {
        text = this.getWrappedText(text).join('\n')
        let length : number = text.length;
        let i : number = 0;
        let lineCounter : number = 0;
        let task = setInterval(() => {
            if (this.canContinue && this.askContinue) {
                if (text[i] == '\n') {
                    lineCounter++;
                    if (lineCounter%nbLine == 0) {
                        this.canContinue = false;
                        this.askContinue = false;
                        this.skipButton.destroy();
                        this.createContinueText(scene, false, () => {
                            this.askContinue = true;
                            this.skipButton = this.createContinueText(scene, true, () => {
                                clearInterval(task);
                                this.destroy();
                                if (callback != undefined) callback();
                            });
                        });
                    }
                }
                scene.sound.play('typewrite', {
                    volume: 0.01
                });
                this.text += text[i];
                i++;
                length--;
                while (text[i] == ' ') {
                    this.text += text[i];
                    i++;
                    length--;
                }
                if (length == 0) {
                    clearInterval(task);
                    this.skipButton.destroy();
                    this.createContinueText(scene, false, () => {
                        this.destroy();
                        if (callback != undefined) callback();
                    });
                }
            } else if (!this.canContinue && this.askContinue) {
                this.text = '';
                this.canContinue = true;
            }
        }, 80);
        this.skipButton = this.createContinueText(scene, true, () => {
            clearInterval(task);
            this.destroy();
            if (callback != undefined) callback();
        });
    }
    private createContinueText(scene: Phaser.Scene, skip: boolean, callback : Callback) : Phaser.GameObjects.Text {
        let fontSize = 20 / scene.cameras.main.zoom;
        let text : Phaser.GameObjects.Text = scene.add.text((scene.game.renderer.width / scene.cameras.main.zoom) / 2, this.y + (160 / scene.cameras.main.zoom), (skip) ? CONFIG.TEXTS.skip : CONFIG.TEXTS.click_here_to_continue, {
            fontSize: fontSize + 'px',
            fontFamily: '"Press Start 2P"'
        });
        text.setOrigin(0.5, 0.425);
        text.setAlpha(0.5);
        text.setInteractive();
        text.setDepth(500);
        text.on("pointerover", () => {
            scene.sound.play('button_hover', {
                volume: 0.1
            });
            text.setColor('#888888');
        });
        text.on("pointerout", () => {
            text.setColor('#ffffff');
        });
        text.on("pointerup", () => {
            scene.sound.play('button_click', {
                volume: 0.1
            });
            text.destroy();
            callback();
        });
        return text;
    }
}
