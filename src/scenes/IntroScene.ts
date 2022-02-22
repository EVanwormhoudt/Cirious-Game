import "phaser";
import { CONFIG } from "../config";
import { Dialogue } from "../class/Dialogue"

export class IntroScene extends Phaser.Scene {
    constructor() {
        super({
            key: CONFIG.SCENES.INTRO
        });
    }
    init() {

        this.anims.create({
            key: 'backgroundAnim',
            frames: this.anims.generateFrameNumbers('background', { start: 0, end: 23, first: 0 }),
            frameRate: 5,
            repeat: -1
        });

        let background : Phaser.GameObjects.Sprite = this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, 'background');
        background.scale = 2.742857142857143;
        background.play('backgroundAnim');

        let sound_ambiance_exterior : Phaser.Sound.BaseSound = this.sound.add('sound_ambiance_exterior', {
            loop: true
        });
        sound_ambiance_exterior.play();

        new Dialogue(this, CONFIG.TEXTS.intro_dialogue, this.game.renderer.width / 2, 150, () => {
            new Dialogue(this, CONFIG.TEXTS.hand_washer_intro, this.game.renderer.width / 2, 150, () => {
                sound_ambiance_exterior.destroy();
                this.scene.stop();
                this.scene.start(CONFIG.SCENES.HAND_WASHER);
            });
        });
    }
    create() {}
}