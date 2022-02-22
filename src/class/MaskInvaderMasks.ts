import "phaser";
import { MaskInvaderScene } from "../scenes/MaskInvaderScene";
import { MaskInvaderMask } from "../class/MaskInvaderMask";

export class MaskInvaderMasks extends Phaser.Physics.Arcade.Group
{
    scene;
    constructor (scene: MaskInvaderScene)
    {
        super(scene.physics.world, scene);
        this.scene = scene;
        this.createMultiple({
            frameQuantity: 1,
            key: 'mask',
            active: false,
            visible: false,
            classType: MaskInvaderMask
        });
    }

    fireMask (angle: number, x: number, y: number, distance: number, launcher: Phaser.Physics.Arcade.Image)
    {
        let mask: MaskInvaderMask = this.getFirstDead(false);
        this.scene.canShoot= false;

        if (mask)
        {
            mask.fire(angle, x, y, distance, launcher);
        }
    }
}
