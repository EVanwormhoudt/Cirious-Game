import "phaser";
import { CONFIG } from "../config";
import { HandWashserBullets } from "../class/HandWashserBullets"
import { Dialogue } from "../class/Dialogue"

export class HandWasherScene extends Phaser.Scene {
    //Hands
    handsVelocityX: number = 300;
    handsVelocityY: number = 150;
    handsMinY: number = 80;
    handsMaxY: number = 250;

    //Left hand
    handLeftSprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    handLeftContainer: Phaser.GameObjects.Container;
    handLeftRandX: number;
    handLeftRandY: number;
    handsLeftMinX: number = 175;
    handsLeftMaxX: number = 1920 / 2 - 175;
    handLeftVirus = [
        {
            offsetX: 0.0,
            offsetY: 0.0,
            scale: 0.05
        },
        {
            offsetX: 40.0,
            offsetY: 50.0,
            scale: 0.035
        },
        {
            offsetX: 20.0,
            offsetY: -30.0,
            scale: 0.035
        },
        {
            offsetX: -70.0,
            offsetY: -20.0,
            scale: 0.05
        },
        {
            offsetX: -70.0,
            offsetY: 90.0,
            scale: 0.055
        },
        {
            offsetX: -5.0,
            offsetY: 90.0,
            scale: 0.059
        },
        {
            offsetX: -90.0,
            offsetY: 35.0,
            scale: 0.06
        },
        {
            offsetX: 90.0,
            offsetY: 90.0,
            scale: 0.04
        },
        {
            offsetX: 35.0,
            offsetY: 200.0,
            scale: 0.03
        },
        {
            offsetX: -25.0,
            offsetY: 180.0,
            scale: 0.035
        },
        {
            offsetX: -120.0,
            offsetY: 120.0,
            scale: 0.032
        },
        {
            offsetX: -90.0,
            offsetY: 200.0,
            scale: 0.031
        },
        {
            offsetX: -150.0,
            offsetY: 220.0,
            scale: 0.03
        },
        {
            offsetX: -25.0,
            offsetY: 260.0,
            scale: 0.031
        },
        {
            offsetX: -90.0,
            offsetY: 260.0,
            scale: 0.031
        },
        {
            offsetX: 45.0,
            offsetY: 260.0,
            scale: 0.031
        }
    ];

    //Right hand
    handRightSprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    handRightContainer: Phaser.GameObjects.Container;
    handRightRandX: number;
    handRightRandY: number;
    handsRightMinX: number = 1920 / 2 + 175;
    handsRightMaxX: number = 1920 - 175;
    handRightVirus = [
        {
            offsetX: 0.0,
            offsetY: 0.0,
            scale: 0.045
        },
        {
            offsetX: 60.0,
            offsetY: -10.0,
            scale: 0.03
        },
        {
            offsetX: -50.0,
            offsetY: 30.0,
            scale: 0.035
        },
        {
            offsetX: 70.0,
            offsetY: 35.0,
            scale: 0.05
        },
        {
            offsetX: 70.0,
            offsetY: 90.0,
            scale: 0.029
        },
        {
            offsetX: 20.0,
            offsetY: 90.0,
            scale: 0.045
        },
        {
            offsetX: -90.0,
            offsetY: 90.0,
            scale: 0.039
        },
        {
            offsetX: -30.0,
            offsetY: 200.0,
            scale: 0.035
        },
        {
            offsetX: 80.0,
            offsetY: 200.0,
            scale: 0.035
        },
        {
            offsetX: 150.0,
            offsetY: 220.0,
            scale: 0.031
        },
        {
            offsetX: 140.0,
            offsetY: 160.0,
            scale: 0.03
        },
        {
            offsetX: -30.0,
            offsetY: 140.0,
            scale: 0.035
        },
        {
            offsetX: -35.0,
            offsetY: 250.0,
            scale: 0.035
         },
        {
            offsetX: 31.0,
            offsetY: 250.0,
            scale: 0.035
        },
        {
            offsetX: 95.0,
            offsetY: 260.0,
            scale: 0.035
        },
        {
            offsetX: 80.0,
            offsetY: 140.0,
            scale: 0.05
        }
    ];


    //Cursor
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    cursorDown: boolean = false;
    cursorWait: boolean = false;
    cursorTimeout: number = 400;

    //Gel
    bottleSprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    bottleVelocity: number = 450;
    bottleMinX: number = 125;
    bottleMaxX: number = 1920 - 125;

    //Others
    bullets: HandWashserBullets;
    healthBar: Phaser.GameObjects.Graphics;
    shotsMax: number = 60;
    shotsRemaining: number;
    started: boolean = false;
    sound_ambiance_interior: Phaser.Sound.BaseSound;

    constructor() {
        super({
            key: CONFIG.SCENES.HAND_WASHER
        });
    }

    create() {
        let background: Phaser.GameObjects.Image = this.add.image(this.game.renderer.width/2, this.game.renderer.height/3.3, 'hw_background');
        background.setScale(10);

        let character: Phaser.GameObjects.Image = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.2, 'hw_character');
        character.setScale(2.75);

        let table = this.add.image(this.game.renderer.width / 2.2, this.game.renderer.height / 4.8, 'hw_table');
        table.setScale(8.5);

        this.add.image(this.game.renderer.width / 2.15, this.game.renderer.height / 1.5, 'hw_gestes');

        let bottle_top = this.add.image(this.game.renderer.width * 0.9, this.game.renderer.height * 0.5, 'hw_bottle');
        bottle_top.setScale(1.2);
        bottle_top.setAngle(-15);

        let carton = this.add.image(this.game.renderer.width / 7, this.game.renderer.height / 1.8, 'hw_carton');
        carton.setScale(1.2);
        carton.setAngle(2);

        /////////////////////////////////////////////////////
        //////////// MAIN GAUCHE ////////////////////////////
        /////////////////////////////////////////////////////

        this.handLeftContainer = this.add.container((this.handsLeftMinX + this.handsLeftMaxX) / 2, (this.handsMaxY + this.handsMinY) / 2);
        this.physics.world.enable(this.handLeftContainer);

        this.handLeftSprite = this.physics.add.sprite(0, 0, 'hw_hand_left');
        this.handLeftContainer.add(this.handLeftSprite);

        this.handLeftVirus.forEach(element => {
            let sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody = this.physics.add.sprite(element.offsetX, element.offsetY, 'hw_virus');
            sprite.body.setSize(580, 580);
            sprite.body.setOffset(160, 185);
            sprite.setScale(element.scale);
            sprite.setAngle(Phaser.Math.FloatBetween(0.0, 360.0));
            sprite.setName("virus");
            this.handLeftContainer.add(sprite);
        });

        /////////////////////////////////////////////////////
        //////////// MAIN DROITE ////////////////////////////
        /////////////////////////////////////////////////////

        this.handRightContainer = this.add.container((this.handsRightMinX + this.handsRightMaxX) / 2, (this.handsMaxY + this.handsMinY) / 2);
        this.physics.world.enable(this.handRightContainer);

        this.handRightSprite = this.physics.add.sprite(0, 0, 'hw_hand_right');
        this.handRightContainer.add(this.handRightSprite);

        this.handRightVirus.forEach(element => {
            let sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody = this.physics.add.sprite(element.offsetX, element.offsetY, 'hw_virus');
            sprite.body.setSize(580, 580);
            sprite.body.setOffset(160, 185);
            sprite.setScale(element.scale);
            sprite.setAngle(Phaser.Math.FloatBetween(0.0, 360.0));
            sprite.setName("virus");
            this.handRightContainer.add(sprite);
        });

        /////////////////////////////////////////////////////

        this.bullets = new HandWashserBullets(this, this.shotsMax);

        this.physics.add.overlap(this.bullets.getChildren(), this.handLeftContainer.getAll('name', 'virus'), (bullet, virus) => this.collision(bullet, virus));

        this.physics.add.overlap(this.bullets.getChildren(), this.handRightContainer.getAll('name', 'virus'), (bullet, virus) => this.collision(bullet, virus));

        this.bottleSprite = this.physics.add.sprite(this.game.renderer.width / 2, 1000, 'hw_bottle');
        this.bottleSprite.setScale(1.3);

        this.healthBar = this.makeBar(1840, 1060, 0x2980b9);
        this.setBarValue(this.healthBar, 100);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.sound_ambiance_interior = this.sound.add('sound_ambiance_interior', {
            loop: true,
            volume: 0.15
        });
        this.sound_ambiance_interior.play();

        this.shotsRemaining = this.shotsMax;

        new Dialogue(this, CONFIG.TEXTS.hand_washer_help, this.game.renderer.width / 2, 150, () => {
            //GAUCHE
            this.handLeftRandX = Phaser.Math.Between(this.handsLeftMinX, this.handsLeftMaxX);
            if (this.handLeftContainer.x >= this.handLeftRandX) {
                // @ts-ignore
                this.handLeftContainer.body.setVelocityX(-this.handsVelocityX);
            } else {
                // @ts-ignore
                this.handLeftContainer.body.setVelocityX(this.handsVelocityX);
            }

            this.handLeftRandY = Phaser.Math.Between(this.handsMinY, this.handsMaxY);
            if (this.handLeftContainer.y >= this.handLeftRandY) {
                // @ts-ignore
                this.handLeftContainer.body.setVelocityY(-this.handsVelocityY);
            } else {
                // @ts-ignore
                this.handLeftContainer.body.setVelocityY(this.handsVelocityY);
            }

            //DROITE
            this.handRightRandX = Phaser.Math.Between(this.handsRightMinX, this.handsRightMaxX);
            if (this.handRightContainer.x >= this.handRightRandX) {
                // @ts-ignore
                this.handRightContainer.body.setVelocityX(-this.handsVelocityX);
            } else {
                // @ts-ignore
                this.handRightContainer.body.setVelocityX(this.handsVelocityX);
            }

            this.handRightRandY = Phaser.Math.Between(this.handsMinY, this.handsMaxY);
            if (this.handRightContainer.y >= this.handRightRandY) {
                // @ts-ignore
                this.handRightContainer.body.setVelocityY(-this.handsVelocityY);
            } else {
                // @ts-ignore
                this.handRightContainer.body.setVelocityY(this.handsVelocityY);
            }

            //KEY FIRE
            this.input.keyboard.on('keydown-Z', () => {
                if (!this.cursorWait) {
                    this.bullets.fireBullet(this.bottleSprite.x, this.bottleSprite.y);
                    this.shotsRemaining--;
                    this.sound.play('hw_splash', {
                        volume: 0.5
                    });
                    let percent = (this.shotsRemaining / this.shotsMax) * 100;
                    this.setBarValue(this.healthBar, percent);
                    if (this.shotsRemaining == 0){
                        this.started = false;
                        this.bottleSprite.setVelocityX(0.0);
                        // @ts-ignore
                        this.handLeftContainer.body.setVelocity(0.0, 0.0);
                        // @ts-ignore
                        this.handRightContainer.body.setVelocity(0.0, 0.0);
                        this.sound.play('loose', {
                            volume: 0.3
                        });
                        new Dialogue(this, CONFIG.TEXTS.hand_washer_loose, this.game.renderer.width / 2, 150, () => {
                            this.sound_ambiance_interior.destroy();
                            this.scene.stop();
                            this.scene.restart();
                        });
                    }
                    this.cursorWait = true;
                    this.time.addEvent({
                        delay: this.cursorTimeout,
                        callback: () => {
                            this.cursorWait = false;
                        },
                    });
                }
            });

            this.input.keyboard.on('keydown-Q', () => {
                if (this.bottleSprite.body.velocity.x != -this.bottleVelocity && this.bottleSprite.x > this.bottleMinX) {
                    this.bottleSprite.setVelocityX(-this.bottleVelocity);
                }
                else if (this.bottleSprite.x <= this.bottleMinX && this.bottleSprite.body.velocity.x != 0.0) {
                    this.bottleSprite.setVelocityX(0.0);
                }
            });

            this.input.keyboard.on('keyup-Q', () => {
                if (this.bottleSprite.body.velocity.x < 0.0) {
                    this.bottleSprite.setVelocityX(0.0);
                }
            });

            this.input.keyboard.on('keydown-D', () => {
                if (this.bottleSprite.body.velocity.x != this.bottleVelocity && this.bottleSprite.x < this.bottleMaxX) {
                    this.bottleSprite.setVelocityX(this.bottleVelocity);
                }
                else if (this.bottleSprite.x >= this.bottleMaxX && this.bottleSprite.body.velocity.x != 0.0) {
                    this.bottleSprite.setVelocityX(0.0);
                }
            });

            this.input.keyboard.on('keyup-D', () => {
                if (this.bottleSprite.body.velocity.x > 0.0) {
                    this.bottleSprite.setVelocityX(0.0);
                }
            });

            this.started = true;
        });
    }

    collision(bullet: Phaser.Types.Physics.Arcade.GameObjectWithBody, virus: Phaser.Types.Physics.Arcade.GameObjectWithBody): void {
        bullet.destroy();
        virus.destroy();
        if (this.hasWin()) {
            this.time.addEvent({
                delay: 1500,
                callback: () => {
                    this.started = false;
                    this.bottleSprite.setVelocityX(0.0);
                    // @ts-ignore
                    this.handLeftContainer.body.setVelocity(0.0, 0.0);
                    // @ts-ignore
                    this.handRightContainer.body.setVelocity(0.0, 0.0);
                    new Dialogue(this, CONFIG.TEXTS.hand_washer_end, this.game.renderer.width / 2, 150, () => {
                        this.sound_ambiance_interior.destroy();
                        this.scene.stop();
                        this.scene.start(CONFIG.SCENES.SHOPPING);
                    });
                },
            });
        }
        return;
    }

    hasWin(): boolean {
        if (this.handLeftContainer.getAll('name', 'virus').length == 0 && this.handRightContainer.getAll('name', 'virus').length == 0) {
            this.handLeftSprite.destroy();
            this.handRightSprite.destroy();
            this.handLeftSprite =  this.physics.add.sprite(500, 260, 'hw_okLeft');
            this.handLeftSprite.setScale(1.8);
            this.handRightSprite =  this.physics.add.sprite(1400 , 320, 'hw_okRight');
            this.handRightSprite.setScale(2);
            this.sound.play('win', {
                volume: 0.3
            });
            return true;
        }
        return false;
    }

    makeBar(x: number, y: number, color: number): Phaser.GameObjects.Graphics {
        let bar2: Phaser.GameObjects.Graphics = this.add.graphics();
        bar2.fillStyle(0x000000);
        bar2.fillRect(0, 0, 205, 60);
        bar2.setPosition(x - 5, y + 5);
        bar2.setAngle(270);
        bar2.setScale(2, 1);
        let bar: Phaser.GameObjects.Graphics = this.add.graphics();
        bar.fillStyle(color);
        bar.fillRect(0, 0, 200, 50);
        bar.setPosition(x, y);
        bar.setAngle(270);
        return bar;
    }

    setBarValue(bar: Phaser.GameObjects.Graphics, percentage: number): void {
        bar.setScale(percentage / 100 * 2, 1);
        return;
    }

    update() {
        if (this.started) {

            /////////////////////////////////////////////////////
            //////////// MAIN GAUCHE ////////////////////////////
            /////////////////////////////////////////////////////

            if (this.handLeftContainer.body.velocity.x < 0.0) {
                if (this.handLeftContainer.x <= this.handLeftRandX) {
                    this.handLeftRandX = Phaser.Math.Between(this.handsLeftMaxX - ((this.handsLeftMaxX + this.handsLeftMinX) * 0.2), this.handsLeftMaxX);
                    // @ts-ignore
                    this.handLeftContainer.body.setVelocityX(this.handsVelocityX);
                }
            } else {
                if (this.handLeftContainer.x >= this.handLeftRandX) {
                    this.handLeftRandX = Phaser.Math.Between(this.handsLeftMinX, this.handsLeftMinX + ((this.handsLeftMaxX + this.handsLeftMinX) * 0.2));
                    // @ts-ignore
                    this.handLeftContainer.body.setVelocityX(-this.handsVelocityX);
                }
            }

            if (this.handLeftContainer.body.velocity.y < 0.0) {
                if (this.handLeftContainer.y <= this.handLeftRandY) {
                    this.handLeftRandY = Phaser.Math.Between(this.handsMaxY - ((this.handsMaxY + this.handsMinY) * 0.2), this.handsMaxY); // 264 - 330
                    // @ts-ignore
                    this.handLeftContainer.body.setVelocityY(this.handsVelocityY);
                }
            } else {
                if (this.handLeftContainer.y >= this.handLeftRandY) {
                    this.handLeftRandY = Phaser.Math.Between(this.handsMinY, this.handsMinY + ((this.handsMaxY + this.handsMinY) * 0.2)); // 80 - 146
                    // @ts-ignore
                    this.handLeftContainer.body.setVelocityY(-this.handsVelocityY);
                }
            }

            /////////////////////////////////////////////////////
            //////////// MAIN DROITE ////////////////////////////
            /////////////////////////////////////////////////////

            if (this.handRightContainer.body.velocity.x < 0.0) {
                if (this.handRightContainer.x <= this.handRightRandX) {
                    this.handRightRandX = Phaser.Math.Between(this.handsRightMaxX - ((this.handsRightMaxX + this.handsRightMinX) * 0.2), this.handsRightMaxX);
                    // @ts-ignore
                    this.handRightContainer.body.setVelocityX(this.handsVelocityX);
                }
            } else {
                if (this.handRightContainer.x >= this.handRightRandX) {
                    this.handRightRandX = Phaser.Math.Between(this.handsRightMinX, this.handsRightMinX + ((this.handsRightMaxX + this.handsRightMinX) * 0.2));
                    // @ts-ignore
                    this.handRightContainer.body.setVelocityX(-this.handsVelocityX);
                }
            }

            if (this.handRightContainer.body.velocity.y < 0.0) {
                if (this.handRightContainer.y <= this.handRightRandY) {
                    this.handRightRandY = Phaser.Math.Between(this.handsMaxY - ((this.handsMaxY + this.handsMinY) * 0.2), this.handsMaxY); // 264 - 330
                    // @ts-ignore
                    this.handRightContainer.body.setVelocityY(this.handsVelocityY);
                }
            } else {
                if (this.handRightContainer.y >= this.handRightRandY) {
                    this.handRightRandY = Phaser.Math.Between(this.handsMinY, this.handsMinY + ((this.handsMaxY + this.handsMinY) * 0.2)); // 80 - 146
                    // @ts-ignore
                    this.handRightContainer.body.setVelocityY(-this.handsVelocityY);
                }
            }
        }
    }
}
