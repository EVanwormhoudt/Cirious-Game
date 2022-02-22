import "phaser";
import { CONFIG } from "../config";
import { MaskInvaderMasks } from "../class/MaskInvaderMasks";
import { MaskInvaderPeople } from "../class/MaskInvaderPeople";
import { MaskInvaderMaskers } from "../class/MaskInvaderMaskers";
import { Dialogue } from "../class/Dialogue"

export class MaskInvaderScene extends Phaser.Scene {
    public number: number = 0;
    public launcher: Phaser.Physics.Arcade.Sprite;
    public newAngle: number;
    public distance: number;
    public canShoot: boolean = true;
    public start: boolean = false;
    public maskers: Phaser.Physics.Arcade.Group;
    public noMaskers: Phaser.Physics.Arcade.Group;
    public life: number = 3;
    public giletJaune: number = 10;
    public health: Phaser.GameObjects.Image
    public sound_ambiance_interior: Phaser.Sound.BaseSound;

    constructor() {
        super({
            key: CONFIG.SCENES.MASK_INVADER
        });
    }

    create() {
        this.life = 3;
        this.giletJaune = 10;
        this.number =  0;
        this.start = false;
        this.add.image(960,540,"fond").setScale(2);
        this.physics.world.bounds.height = 950;
        this.launcher = this.physics.add.sprite(960, 980, 'launcherIdle').setDepth(2000);
        this.launcher.setScale(5);

        this.launcher.anims.create({
            key: 'shoot',
            frames: this.anims.generateFrameNumbers('launcher', { start: 0, end: 4}),
            frameRate: 15,
            repeat: 0,
        });

        this.launcher.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('launcher', { start: 0, end: 0}),
            frameRate: 15,
            repeat: 0,
        });


        let masks: MaskInvaderMasks = new MaskInvaderMasks(this);
        this.maskers = this.physics.add.group({
            classType: MaskInvaderMaskers
        });

        this.noMaskers = this.physics.add.group({
            classType: MaskInvaderPeople
        });



        this.health = this.add.image(200, 40, 'Mi_health3');

        this.sound_ambiance_interior = this.sound.add('sound_ambiance_interior', {
            loop: true,
            volume: 0.15
        });
        this.sound_ambiance_interior.play();

        new Dialogue(this, CONFIG.TEXTS.mask_invader_intro, this.game.renderer.width / 2, 150, () => {

            this.start = true;
            for (let i = 0; i < 2; i++) {
                this.maskers.create(960, Phaser.Math.Between(-100, 0)).initialize();
            }
            for (let i = 0; i < 5; i++) {
                this.noMaskers.create(960, Phaser.Math.Between(-100, -0));
            }
            for (let i of this.noMaskers.children.entries) {
                // @ts-ignore
                i.initialize()
            }

            this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
                this.newAngle = Phaser.Math.Angle.BetweenPoints(this.launcher, pointer);

                if (this.canShoot) {

                    this.launcher.play('shoot')
                    let scene = this
                    this.time.addEvent({
                        delay: 100,
                        callback: () => {
                            scene.sound.play('fire', {
                                volume: 0.3
                            });
                            masks.fireMask(this.newAngle, this.launcher.x, this.launcher.y, this.distance, this.launcher);
                        },
                    });
                    this.time.addEvent({
                        delay: 260,
                        callback: () => {
                            this.launcher.play('idle')
                        },
                    });
                }
                this.distance = 2000;
            });

        });

    }

    update() {
        if (Phaser.Math.Between(0, 50) == 0 && this.start) {
            this.maskers.create(960, Phaser.Math.Between(-200, 0)).initialize();
        }
        if (Phaser.Math.Between(0, 130) == 0 && this.start) {
            this.noMaskers.create(960, Phaser.Math.Between(-200, 0)).initialize();
        }
        for (let i of this.noMaskers.children.entries) {
            // @ts-ignore
            if (i.update(this)) {
                --this.life;
                if(this.life==2){
                    this.health.destroy();
                    this.health = this.add.image(200, 90, 'Mi_health2');
                }
                if(this.life==1){
                    this.health.destroy();
                    this.health = this.add.image(200, 90, 'Mi_health1');
                }
                if(this.life==0){
                    this.sound.play('loose', {
                        volume: 0.3
                    });
                    this.health.destroy();
                    this.life = -1;
                    this.start = false;
                    new Dialogue(this, CONFIG.TEXTS.mask_invader_loose, this.game.renderer.width / 2, 150, () => {
                        this.sound_ambiance_interior.destroy();
                        this.scene.stop();
                        this.scene.restart();

                    });
                }
            }
        }
        if (this.number == 30) {
            this.life = -1;
            this.sound.play('win', {
                volume: 0.3
            });
            this.number++;
            this.start = false
            new Dialogue(this, CONFIG.TEXTS.mask_invader_end, this.game.renderer.width / 2, 150, () => {
                this.sound_ambiance_interior.destroy();
                this.scene.stop();
                this.scene.start(CONFIG.SCENES.OUTRO);
            });
        }
    }
}
