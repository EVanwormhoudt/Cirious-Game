import "phaser";
import { MaskInvaderScene } from "../scenes/MaskInvaderScene";

export class MaskInvaderPeople extends Phaser.Physics.Arcade.Sprite{
    hit: boolean = false;
    random: number;
    constructor (scene: MaskInvaderScene, x: number, y: number)
    {
        super(scene, x, y, 'man');
        this.random = Phaser.Math.Between(1, 4)
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('giletJaune' + this.random, { start: 0, end: 7 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkMask',
            frames: this.anims.generateFrameNames('giletJaune' + this.random, { start: 8, end: 15 }),
            frameRate: 8,
            repeat: -1
        });

        this.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            if(scene.canShoot) {
                this.hit = true;
                    scene.distance = Phaser.Math.Distance.BetweenPoints(scene.launcher, pointer);
                    scene.number++;
                    scene.giletJaune--;
                    this.scene.time.addEvent({
                        delay: 2 * scene.distance / 10,
                        callback: () => {
                            this.play("walkMask")
                            this.setVelocity(this.body.velocity.x * 0.85,this.body.velocity.y * 0.85)
                        },
                    });
                }

        })
    }

    initialize(){
        let dx: number;
        Phaser.Math.Between(0, 1) < 0.5 ? dx = -1 : dx = 1;

        this.setVelocity( dx * Phaser.Math.Between(50, 100), Phaser.Math.Between(100,150));
        this.anims.msPerFrame = 100000/ (Math.sqrt(this.body.velocity.y ** 2 + this.body.velocity.x ** 2));
        this.setInteractive();
        this.input.hitArea.height = 30;
        this.input.hitArea.y = 0;
        this.input.hitArea.x = 5;
        this.input.hitArea.width = 20;
        this.setScale(2.5);
        this.play("walk");
    }

    update(scene: MaskInvaderScene) {
        this.setDepth(this.y+10 )
        this.setScale(1.5 + this.y / 250)
        if (this.x < -50){
            this.body.velocity.x *= -1;}
        else if(this.x > 2000) {
            this.body.velocity.x *= -1;
        }
        if(this.y > 1000){

            if(this.hit){
                this.destroy();
                return 0;
            }
            else{
                this.destroy();
                return 1;
            }
        }
        else{
            return 0;
        }
    }
}
