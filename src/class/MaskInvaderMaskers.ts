import "phaser";
import { MaskInvaderScene } from "../scenes/MaskInvaderScene";

export class MaskInvaderMaskers extends Phaser.Physics.Arcade.Sprite {
    hit: boolean = false;
    random: number;

    constructor(scene: MaskInvaderScene, x: number, y: number) {
        super(scene, x, y, 'man');

        this.random =  Phaser.Math.Between(1, 4);
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('manMasked'+this.random, {start: 0, end: 7}),
            frameRate: 8,
            repeat: -1
        });

        this.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            if (scene.canShoot) {
                scene.canShoot = false;
                this.scene.time.addEvent({
                    delay: 500,
                    callback: () => {
                        scene.canShoot = true;
                    },
                });
            }
        })
    }

    initialize() {
        let dx: number;
        Phaser.Math.Between(0, 1) < 0.5 ? dx =-1 : dx = 1;

        this.setVelocity( dx * Phaser.Math.Between(0,100), Phaser.Math.Between(100,200));
        this.anims.msPerFrame = 100000/ (Math.sqrt(this.body.velocity.y ** 2 + this.body.velocity.x ** 2));
        this.setInteractive();
        this.input.hitArea.height = 30;
        this.input.hitArea.y = 0;
        this.input.hitArea.x = 5;
        this.input.hitArea.width = 20;
        this.play("walk")
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);
        this.setDepth(this.y+10 )
        this.setScale(1.5 + this.y / 250)
        if (this.x < -50){
            this.body.velocity.x *= -1;}
        else if(this.x > 2000) {
            this.body.velocity.x *= -1;
        }
    }
}
