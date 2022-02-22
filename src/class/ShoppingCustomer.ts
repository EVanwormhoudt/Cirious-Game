import "phaser";
import { ShoppingScene } from "../scenes/ShoppingScene"
import { ShoppingCollision } from "../namespace/ShoppingCollision"

export class ShoppingCustomer extends Phaser.Physics.Arcade.Sprite{
    start: boolean = false;
    sceneAccess: ShoppingScene;
    quadrillage : boolean = false;
    number: number = 0;
    direction: number;
    previousDirection: number;
    previousX : number = null;
    previousY : number = null;

    constructor(scene: ShoppingScene, x: number, y: number, client: string){
        super(scene, x, y, client);
        this.x = 31 * 32 + 16;
        this.y = 5 * 32 + 16;
        this.angle = 270;

        this.setScale(1.5);
        this.setDepth(2);


        this.anims.create({
            key: 'customerAnim',
            frames: this.anims.generateFrameNames(client, { start: 0, end: 1 }),
            frameRate: 4,
            repeat: -1
        });
        this.play('customerAnim');

        this.scene.time.addEvent({
            delay: 500,
            callback: () => {
                this.setVelocity(-125, 0);
                this.angle = 270;
            },
        });

        scene.physics.add.overlap(this,scene.pacman.children.entries[0], scene.eatPacman, null, scene);
        this.scene.physics.add.collider(this, scene.mur, ShoppingCollision.collide);
        this.scene.physics.add.collider(this, scene.caisse, ShoppingCollision.collide);
        this.scene.physics.add.collider(this, scene.rayonV, ShoppingCollision.collide);
        this.scene.physics.add.collider(this, scene.fruit, ShoppingCollision.collide);
        this.sceneAccess = scene;
    }

    move(): void{

        this.scene.time.addEvent({
            delay: 500,
            callback: () => {
                this.setVelocity(0, 125);
                this.angle = 180;
            },
        });
        this.scene.time.addEvent({
            delay: 1500,
            callback: () => {
                this.setVelocity(-125, 0);
                this.angle = 270;
                this.quadrillage = true;
            },
        });
    }

    protected preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);
        if(this.x >= 31*32+16){
            this.setVelocity(-125,0);
            this.angle = 270;
        }

        let rand: number = Phaser.Math.Between(1,300);
        if(rand == 50 && this.quadrillage){
            ShoppingCollision.collide(this, this);
        }
    }

    resize(){
        this.body.setSize(32,20);
    }

    checkPositon(){
        if(Math.trunc(this.previousX / 32) == Math.trunc(this.x / 32) && Math.trunc(this.previousY / 32) == Math.trunc(this.y / 32)){
            return 1;
        }
        return 0;
    }


}