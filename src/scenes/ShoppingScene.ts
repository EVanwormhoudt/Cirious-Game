import "phaser";
import { CONFIG } from "../config";
import { ShoppingPlayer } from "../class/ShoppingPlayer"
import { ShoppingCustomer } from "../class/ShoppingCustomer"
import { ShoppingPosition } from "../class/ShoppingPosition"
import { Dialogue } from "../class/Dialogue"
import TimerEvent = Phaser.Time.TimerEvent;
import {ShoppingCollision} from "../namespace/ShoppingCollision";

export class ShoppingScene extends Phaser.Scene {
    map: Phaser.Tilemaps.Tilemap;
    background: Phaser.Tilemaps.TilemapLayer;
    fruit: Phaser.Tilemaps.TilemapLayer;
    rayonV: Phaser.Tilemaps.TilemapLayer;
    caisse: Phaser.Tilemaps.TilemapLayer;
    public mur: Phaser.Tilemaps.TilemapLayer;
    pacman: Phaser.Physics.Arcade.Group;
    clients: Phaser.Physics.Arcade.Group;
    point: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    tabPoint : ShoppingPosition[] = new Array(12);
    eated: number;
    start: boolean;
    start2: boolean;
    start3: boolean;
    start4: boolean;
    start5: boolean;
    nbr: number;
    touche: boolean;
    press: boolean;
    press2: boolean;
    timer:  TimerEvent;
    chrono: number;
    sound_ambiance_interior: Phaser.Sound.BaseSound;
    isEnd: boolean;

    constructor() {
        super({
            key: CONFIG.SCENES.SHOPPING
        });

        let i: number = 0;
        this.tabPoint[i]= new ShoppingPosition(7*32,3*32);
        i++;
        this.tabPoint[i] = new ShoppingPosition(15*32, 2*32);
        i++;
        this.tabPoint[i]= new ShoppingPosition(2*32, 6*32);
        i++;
        this.tabPoint[i] = new ShoppingPosition(13*32, 7*32);
        i++;
        this.tabPoint[i] = new ShoppingPosition(3*32,9*32);
        i++;
        this.tabPoint[i] = new ShoppingPosition(19*32,12*32);
        i++;
        this.tabPoint[i] = new ShoppingPosition(3*32,12*32);
        i++;
        this.tabPoint[i] = new ShoppingPosition(5*32,15*32);
        i++;
        this.tabPoint[i] = new ShoppingPosition(23*32,13*32);
        i++;
        this.tabPoint[i] = new ShoppingPosition(13*32,14*32);
        i++;
        this.tabPoint[i] = new ShoppingPosition(20*32,15*32);
        i++;
        this.tabPoint[i] = new ShoppingPosition(12*32,12*32);
        i++;
        this.tabPoint[i] = new ShoppingPosition(10*32,5*32);
        i++;
        this.tabPoint[i] = new ShoppingPosition(8*32,8*32);
        i++;
        this.tabPoint[i] = new ShoppingPosition(16*32,10*32);
        i++;
        this.tabPoint[i] = new ShoppingPosition(20*32,4*32);
        i++;
        this.tabPoint[i] = new ShoppingPosition(22*32,9*32);
        i++;
        this.tabPoint[i] = new ShoppingPosition(28*32,2*32);
        i++;
        this.tabPoint[i] = new ShoppingPosition(23*32,2*32);
        i++;
        this.tabPoint[i] = new ShoppingPosition(25*32,6*32);
        i++;
        this.tabPoint[i] = new ShoppingPosition(23*32,4*32);
        i++;
    }

    create() {
        this.cameras.main.setZoom(1.88);
        this.cameras.main.centerOn(513, 290);
        this.eated = 0;
        this.start = false;
        this.start2 = false;
        this.start3 = false;
        this.start4 = false;
        this.start5 = false;

        this.touche = false;
        this.press = false;
        this.press2 = false;
        this.timer = null;
        this.chrono = 0;
        this.isEnd = false;

        //Creation de la map
        this.map = this.add.tilemap("map");
        let tileset = this.map.addTilesetImage('tiles');
        let tileset2 = this.map.addTilesetImage('rayon', 'rayon');
        let tileset3 = this.map.addTilesetImage('b96ae14823a63ac5f4241db31d016844 (1)', 'sol');
        let tileset4 = this.map.addTilesetImage('fruit', 'fruit');
        let tileset5 = this.map.addTilesetImage('caisse', 'caisse');

        this.background= this.map.createLayer("BackGround", tileset3);
        this.mur = this.map.createLayer("wall", tileset);
        this.caisse = this.map.createLayer("caisse", tileset5);
        this.rayonV = this.map.createLayer("RayonV", tileset2);
        this.fruit = this.map.createLayer("fruit", tileset4);

        //ajout des personnages sur la map
        this.pacman= this.physics.add.group({
            classType: ShoppingPlayer
        });
        this.clients= this.physics.add.group({
            classType: ShoppingCustomer
        });

        this.pacman.create(0, 0);

        // @ts-ignore
        this.pacman.children.entries.forEach(x => x.resize());

        //ajout de la collision des personnages avec les murs
        this.mur.setCollisionByProperty({estSolide: true});
        this.caisse.setCollisionByProperty({estSolide: true});
        this.rayonV.setCollisionByProperty({estSolide: true});
        this.fruit.setCollisionByProperty({estSolide: true});

        //Ajout des pions
        this.nbr = Phaser.Math.Between(8, 14);
        let indice: number = Phaser.Math.Between(0, this.tabPoint.length - this.nbr);

        for (let k: number = indice; k < indice + this.nbr; k++) {
            let rand: number = Phaser.Math.Between(1,5);
            this.point = this.physics.add.image(this.tabPoint[k].x+16, this.tabPoint[k].y+16, 'image' + rand);
            //lorsque le pacman arrive sur le point, il disparait
            this.physics.add.overlap(this.pacman.children.entries[0], this.point, this.eatDot, null, this);
        }

        this.sound_ambiance_interior = this.sound.add('sound_ambiance_interior', {
            loop: true,
            volume: 0.15
        });
        this.sound_ambiance_interior.play();

        new Dialogue(this, CONFIG.TEXTS.shopping_intro, (this.game.renderer.width / this.cameras.main.zoom) / 2, 150 / this.cameras.main.zoom, ()=>{
            // @ts-ignore
            this.pacman.children.entries.forEach(x  => this.checkDirection(x));
        });
    }

    update() {
        if (!this.isEnd) {

            let nb = Phaser.Math.Between(0,500);

            this.clients.children.entries.forEach((c : ShoppingCustomer)=>{
                if (nb == 50 && c.quadrillage) {
                    ShoppingCollision.collide;
                }else if (c.checkPositon() &&c.quadrillage) {
                    ShoppingCollision.collide;
                }
            });

            // @ts-ignore
            if (this.pacman.children.entries[0].body.velocity.x == 0 && this.pacman.children.entries[0].body.velocity.y == 0 && this.pacman.children.entries[0].anims.currentAnim.key.includes('playerAnim')) {

                if(this.eated == 0){
                    // @ts-ignore
                    this.pacman.children.entries[0].anims.play('playerPause');
                }
                if(this.eated == 1) {

                    // @ts-ignore
                    this.pacman.children.entries[0].anims.play('playerPause2');
                }
                if(this.eated == 3){
                    // @ts-ignore
                    this.pacman.children.entries[0].anims.play('playerPause3');
                }
                if(this.eated == 6){
                    // @ts-ignore
                    this.pacman.children.entries[0].anims.play('playerPause4');
                }
                if(this.eated == 8){
                    // @ts-ignore
                    this.pacman.children.entries[0].anims.play('playerPause5');
                }
            // @ts-ignore
            }else if (!this.pacman.children.entries[0].anims.currentAnim.key.includes('playerAnim') && (this.pacman.children.entries[0].body.velocity.x != 0 || this.pacman.children.entries[0].body.velocity.y != 0)) {

                if(this.eated == 0) {
                    // @ts-ignore
                    this.pacman.children.entries[0].anims.play('playerAnim');
                }
                if(this.eated == 1 || this.eated == 2) {
                    // @ts-ignore
                    this.pacman.children.entries[0].anims.play('playerAnim2');
                }
                if(this.eated == 3 || this.eated ==4 || this.eated == 5){
                    // @ts-ignore
                    this.pacman.children.entries[0].anims.play('playerAnim3');
                }
                if(this.eated == 6 ||this.eated == 7){
                    // @ts-ignore
                    this.pacman.children.entries[0].anims.play('playerAnim4');
                }
                if(this.eated >= 8){
                    // @ts-ignore
                    this.pacman.children.entries[0].anims.play('playerAnim5');
                }

            }




            if (this.press&& !this.press2) {
                this.time.addEvent({
                    delay: 1500,
                    callback: () => {
                        this.clients.create(0, 0, 'client1').move();
                        // @ts-ignore
                        this.clients.children.entries[0].resize();
                    },
                });

                this.timer = this.time.addEvent({
                    delay: 1000,
                    callback: this.compteUneSeconde,
                    callbackScope: this,
                    loop: true
                });


                this.press2 = true;
            }

            if (this.chrono == 2 && !this.start) {
                this.clients.create(0, 0, 'client2').move();
                // @ts-ignore
                this.clients.children.entries[1].resize();
                this.start = true;
            }
            if (this.chrono == 4 && !this.start2) {
                this.clients.create(0, 0, 'client3').move();
                // @ts-ignore
                this.clients.children.entries[2].resize();
                this.start2 = true;
            }
            if (this.chrono == 6 && !this.start3) {
                this.clients.create(0, 0, 'client4').move();
                // @ts-ignore
                this.clients.children.entries[3].resize();
                this.start3 = true;
            }
            if (this.chrono == 8 && !this.start4) {
                this.clients.create(0, 0, 'client5').move();
                // @ts-ignore
                this.clients.children.entries[4].resize();
                this.start4 = true;
            }

            if (this.chrono == 10 && !this.start5) {
                this.clients.create(0, 0, 'client6').move();
                // @ts-ignore
                this.clients.children.entries[5].resize();
                this.start5 = true;
            }

            if (this.eated == this.nbr) {
                this.add.image(31 * 32 + 16,12 * 32 + 16,'fleche').setAngle(90);
            }


            if (this.clients.children.entries[0]) {
                // @ts-ignore
                if (this.clients.children.entries[0].x >=16*32 && this.clients.children.entries[0].quadrillage) {
                    // @ts-ignore
                    this.clients.children.entries[0].setVelocity(-100, 0);
                    // @ts-ignore
                    this.clients.children.entries[0].setAngle(270);
                }
            }

            if (this.clients.children.entries[1]) {
                // @ts-ignore
                if (this.clients.children.entries[1].x <= 16 * 32 && this.clients.children.entries[1].quadrillage) {
                    // @ts-ignore
                    this.clients.children.entries[1].setVelocity(100, 0);
                    // @ts-ignore
                    this.clients.children.entries[1].setAngle(90);
                }
            }

            if (this.clients.children.entries[3]) {
                // @ts-ignore
                if (this.clients.children.entries[3].x >= 16 * 32 && this.clients.children.entries[3].quadrillage) {
                    // @ts-ignore
                    this.clients.children.entries[3].setVelocity(-100, 0);
                    // @ts-ignore
                    this.clients.children.entries[3].setAngle(270);
                }
            }

            if (this.clients.children.entries[4]) {
                // @ts-ignore
                if (this.clients.children.entries[4].x <= 16 * 32 && this.clients.children.entries[4].quadrillage) {
                    // @ts-ignore
                    this.clients.children.entries[4].setVelocity(100, 0);
                    // @ts-ignore
                    this.clients.children.entries[3].setAngle(90);
                }
            }

            if (this.end() == 1) {
                this.isEnd = true;
                this.sound.play('win', {
                    volume: 0.3
                });
                new Dialogue(this, CONFIG.TEXTS.shopping_end, (this.game.renderer.width / this.cameras.main.zoom) / 2, 150 / this.cameras.main.zoom, () => {
                    this.sound_ambiance_interior.destroy();
                    this.scene.stop();
                    this.scene.start(CONFIG.SCENES.MASK_INVADER);
                });
            }else if (this.end() == 2) {
                this.sound.play('loose', {
                    volume: 0.3
                });
                new Dialogue(this, CONFIG.TEXTS.shopping_loose, (this.game.renderer.width / this.cameras.main.zoom) / 2, 150 / this.cameras.main.zoom, () => {
                    this.sound_ambiance_interior.destroy();
                    this.scene.stop();
                    this.scene.restart();
                });
                this.isEnd = true;
            }
        }
    }

    eatPacman(client: ShoppingCustomer, player: ShoppingPlayer): void {
        player.disableBody(true, true);
        this.touche = true;
    }

    eatDot(player: ShoppingPlayer, point: Phaser.Types.Physics.Arcade.ImageWithDynamicBody): void {
        this.eated += 1;
        point.disableBody(true, true);
        this.sound.play('eatDot', {
            volume: 0.5
        });
    }

    checkDirection(player: ShoppingPlayer): void {

        this.input.keyboard.on('keydown-Q',() =>{
            if (!this.press) {
                this.press = true;
            }
            player.setVelocity(-150, 0);
            player.setAngle(270);
            player.body.setSize(32,20);

            player.direction = 1;
            player.previousX = player.x;
            player.previousY = player.y;
        });
        this.input.keyboard.on('keydown-D', () =>{
            if (!this.press) {
                this.press = true;
            }
            player.setVelocity(150, 0);
            player.setAngle(90);
            player.body.setSize(32,20);
            player.direction = 2;
            player.previousX = player.x;
            player.previousY = player.y;
        });
        this.input.keyboard.on('keydown-S', () =>{
            if (!this.press) {
                this.press = true;
            }
            player.body.setSize(20,32);
            player.setVelocity(0, 150);
            player.setAngle(180);
            player.direction = 4;
            player.previousX = player.x;
            player.previousY = player.y;
        });
        this.input.keyboard.on('keydown-Z', () =>{
            if (!this.press) {
                this.press = true;
            }
            player.setVelocity(0, -150);
            player.setAngle(0);
            player.body.setSize(20,32);
            player.direction = 3;
            player.previousX = player.x;
            player.previousY = player.y;
        });
    }
    
    compteUneSeconde () {
        this.chrono++;
    }

    end(): number{
        // @ts-ignore
        if (this.eated == this.nbr && this.pacman.children.entries[0].x >= 31 * 32 + 16 && (this.pacman.children.entries[0].x > 11*32+16 && this.pacman.children.entries[0].y < 13*32+16)) {
           return 1; //GAGNE
        }else if (this.touche) {
            return 2;//PERDU
        }
        return 0;
    }
}