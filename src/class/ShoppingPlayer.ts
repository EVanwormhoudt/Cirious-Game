import "phaser";
import { ShoppingScene } from "../scenes/ShoppingScene"
import { ShoppingCollision } from "../namespace/ShoppingCollision"

export class ShoppingPlayer extends Phaser.Physics.Arcade.Sprite {
    direction: number;
    sceneAccess: ShoppingScene;
    previousX : number = null;
    previousY : number = null;

    constructor(scene: ShoppingScene, x: number, y: number) {
        super(scene, x, y, 'joueur');
        this.angle = 270;
        this.x = 31 * 32 + 16;
        this.y = 5 * 32 + 16;

        this.setScale(1.5);
        this.setDepth(2);
        this.setActive(true);
        this.setTexture("joueur");
        this.scene.physics.add.collider(this, scene.mur, ShoppingCollision.CheckCollision);
        this.scene.physics.add.collider(this, scene.caisse, ShoppingCollision.CheckCollision);
        this.scene.physics.add.collider(this, scene.rayonV, ShoppingCollision.CheckCollision);
        this.scene.physics.add.collider(this, scene.fruit, ShoppingCollision.CheckCollision);

        this.anims.create({
            key: 'playerAnim',
            frames: this.anims.generateFrameNames('joueur', { start: 1, end: 2 }),
            frameRate: 4,
            repeat: -1
        });


        this.anims.create({
            key: 'playerPause',
            frames: this.anims.generateFrameNames('joueur', { start: 0, end: 0}),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'playerAnim2',
            frames: this.anims.generateFrameNames('joueur2', { start: 1, end: 2 }),
            frameRate: 4,
            repeat: -1
        });


        this.anims.create({
            key: 'playerPause2',
            frames: this.anims.generateFrameNames('joueur2', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'playerAnim3',
            frames: this.anims.generateFrameNames('joueur3', { start: 1, end: 2 }),
            frameRate: 4,
            repeat: -1
        });


        this.anims.create({
            key: 'playerPause3',
            frames: this.anims.generateFrameNames('joueur3', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'playerAnim4',
            frames: this.anims.generateFrameNames('joueur4', { start: 1, end: 2 }),
            frameRate: 4,
            repeat: -1
        });


        this.anims.create({
            key: 'playerPause4',
            frames: this.anims.generateFrameNames('joueur4', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'playerAnim5',
            frames: this.anims.generateFrameNames('joueur5', { start: 1, end: 2 }),
            frameRate: 4,
            repeat: -1
        });


        this.anims.create({
            key: 'playerPause5',
            frames: this.anims.generateFrameNames('joueur5', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });



        this.play('playerAnim');

        this.sceneAccess = scene;

    }

    protected preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);
        if(this.x >= 31*32+16 && (4*32+16<this.y && this.y<6*32+16 && this.sceneAccess.chrono !=0)){
            this.setVelocity(-150,0);
            this.angle = 270;
        }
    }

    resize(){
        this.body.setSize(20,32);
    }

    checkPosition(){
        if(this.previousX == this.x && this.previousY == this.y) return 1;
        return 0;
    }
}