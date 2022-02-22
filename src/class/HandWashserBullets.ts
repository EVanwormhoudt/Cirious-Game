import "phaser";
import { HandWasherBullet } from "./HandWasherBullet"

type HandWasherScene = Phaser.Scene;

export class HandWashserBullets extends Phaser.Physics.Arcade.Group {
    constructor(scene: HandWasherScene, shotsMax: number) {
        super(scene.physics.world, scene);
        this.createMultiple({
            frameQuantity: shotsMax,
            key: 'hw_eau',
            active: false,
            visible: false,
            classType: HandWasherBullet
        });
    }
    fireBullet(x: number, y: number) {
        let bullet : HandWasherBullet = this.getFirstDead(false);
        if (bullet) {
            bullet.fire(x, y);
        }
    }
}