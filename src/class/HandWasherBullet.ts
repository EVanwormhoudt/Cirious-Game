import "phaser";

type HandWasherScene = Phaser.Scene;

export class HandWasherBullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: HandWasherScene, x: number, y: number) {
        super(scene, x, y, 'hw_eau');
    }
    fire(x: number, y: number) {
        this.body.reset(x, y - 100);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(-1500);
        let velocityX = (Math.random() < 0.5) ? Math.random() * 80 + 40 : - Math.random() * 80 - 40;
        this.setVelocityX(velocityX);
    }
    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);
        if (this.y <= -32) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}