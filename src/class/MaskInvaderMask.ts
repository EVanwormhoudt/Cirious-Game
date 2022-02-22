import "phaser";
import { MaskInvaderScene } from "../scenes/MaskInvaderScene";

export class MaskInvaderMask extends Phaser.Physics.Arcade.Sprite
{
    distance: number;
    scene ;
    launcher: Phaser.Physics.Arcade.Image;
    constructor (scene: MaskInvaderScene, x: number, y: number)
    {
        super(scene, x, y, 'mask');
        scene = this.scene
    }

    fire (angle: number, x: number, y: number, distance: number, launcher: Phaser.Physics.Arcade.Image)
    {

        this.x = x;
        this.y = y;
        this.launcher = launcher;
        this.distance = distance
        this.setActive(true);
        this.setVisible(true);
        this.setScale(0.3);
        this.scene.physics.velocityFromAngle(57 * angle, 4000, this.body.velocity);
    }

    protected preUpdate (time: number, delta: number)
    {
        super.preUpdate(time, delta);

        if (this.y <= -32 || this.x < -100|| this.x > 2000 || (Phaser.Math.Distance.BetweenPoints(this.launcher, this) > this.distance ) )
        {
            this.setActive(false);
            this.setVisible(false);
            this.scene.canShoot = true;
        }

    }
}
