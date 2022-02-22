import "phaser";
import { CONFIG } from "../config";

export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CONFIG.SCENES.LOAD,
            pack: {
                //Loading files for loading scene
                files: [
                    {type: 'image', key: 'logo', url: 'assets/image/loading/logo.png'},
                    {type: 'audio', key: 'button_hover', url: 'assets/sounds/loading/button_hover.wav'},
                    {type: 'audio', key: 'button_click', url: 'assets/sounds/loading/button_click.wav'}
                ]
            }
        });
    }

    preload() {

        //Loading files for main menu scene
        this.load.setPath("assets/image/main_menu")
        for (let name in CONFIG.ASSETS.MAIN_MENU.IMAGES) {
            this.load.image(name, CONFIG.ASSETS.MAIN_MENU.IMAGES[name]);
        }
        for (let name in CONFIG.ASSETS.MAIN_MENU.SPRITESHEETS) {
            this.load.spritesheet(name, CONFIG.ASSETS.MAIN_MENU.SPRITESHEETS[name][0], {frameWidth: CONFIG.ASSETS.MAIN_MENU.SPRITESHEETS[name][1], frameHeight: CONFIG.ASSETS.MAIN_MENU.SPRITESHEETS[name][2]});
        }
        this.load.setPath("assets/sounds/main_menu")
        for (let name in CONFIG.ASSETS.MAIN_MENU.AUDIOS) {
            this.load.audio(name, CONFIG.ASSETS.MAIN_MENU.AUDIOS[name]);
        }

        //Loading files for hands washing scene
        this.load.setPath("assets/image/hand_washer")
        for (let name in CONFIG.ASSETS.HAND_WASHER.IMAGES) {
            this.load.image(name, CONFIG.ASSETS.HAND_WASHER.IMAGES[name]);
        }
        this.load.setPath("assets/sounds/hand_washer")
        for (let name in CONFIG.ASSETS.HAND_WASHER.AUDIOS) {
            this.load.audio(name, CONFIG.ASSETS.HAND_WASHER.AUDIOS[name]);
        }

        //Loading files for shopping scene
        this.load.setPath("assets/misc/shopping")
        for (let name in CONFIG.ASSETS.SHOPPING.TILEMAPS) {
            this.load.tilemapTiledJSON(name, CONFIG.ASSETS.SHOPPING.TILEMAPS[name]);
        }
        this.load.setPath("assets/image/shopping")
        for (let name in CONFIG.ASSETS.SHOPPING.IMAGES) {
            this.load.image(name, CONFIG.ASSETS.SHOPPING.IMAGES[name]);
        }
        for (let name in CONFIG.ASSETS.SHOPPING.SPRITESHEETS) {
            this.load.spritesheet(name, CONFIG.ASSETS.SHOPPING.SPRITESHEETS[name][0], {frameWidth: CONFIG.ASSETS.SHOPPING.SPRITESHEETS[name][1], frameHeight: CONFIG.ASSETS.SHOPPING.SPRITESHEETS[name][2]});
        }
        this.load.setPath("assets/sounds/shopping")
        for (let name in CONFIG.ASSETS.SHOPPING.AUDIOS) {
            this.load.audio(name, CONFIG.ASSETS.SHOPPING.AUDIOS[name]);
        }

        //Loading files for mask invader scene
        this.load.setPath("assets/image/mask_invader")
        for (let name in CONFIG.ASSETS.MASK_INVADER.IMAGES) {
            this.load.image(name, CONFIG.ASSETS.MASK_INVADER.IMAGES[name]);
        }
        for (let name in CONFIG.ASSETS.MASK_INVADER.SPRITESHEETS) {
            this.load.spritesheet(name, CONFIG.ASSETS.MASK_INVADER.SPRITESHEETS[name][0], {frameWidth: CONFIG.ASSETS.MASK_INVADER.SPRITESHEETS[name][1], frameHeight: CONFIG.ASSETS.MASK_INVADER.SPRITESHEETS[name][2]});
        }
        this.load.setPath("assets/sounds/mask_invader")
        for (let name in CONFIG.ASSETS.MASK_INVADER.AUDIOS) {
            this.load.audio(name, CONFIG.ASSETS.MASK_INVADER.AUDIOS[name]);
        }

        let logo : Phaser.GameObjects.Image = this.add.image(this.game.renderer.width / 2, 300, 'logo');
        logo.scale = 0.5;

        //Loading Bar Box
        let loadingBarBox : Phaser.GameObjects.Graphics = this.add.graphics({
            fillStyle: {
                color: 0x222222, //grey
                alpha: 0.8
            }
        });
        loadingBarBox.fillRect(185, (this.game.renderer.height / 2 - 15) + 100, this.game.renderer.width - 370, 80);

        //Loading Bar
        let loadingBar : Phaser.GameObjects.Graphics = this.add.graphics({
            fillStyle: {
                color: 0xac262c //red
            }
        });

        //Loading Progress Text
        let loadingProgressText : Phaser.GameObjects.Text = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 124, '0%', {
            fontSize: '40px',
            fontFamily: '"Press Start 2P"'
        });
        loadingProgressText.setOrigin(0.5, 0.425);
        loadingProgressText.setPadding(5);

        //Loading Text
        let loadingText : Phaser.GameObjects.Text = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 220, '', {
            fontSize: '35px',
            fontFamily: '"Press Start 2P"'
        });
        loadingText.setOrigin(0.5, 0.425);
        loadingText.setPadding(5);

        //Loading progressing
        this.load.on("progress", (percent: number) => {
            loadingBar.fillRect(200, (this.game.renderer.height / 2) + 100, (this.game.renderer.width - 400) * percent, 50);
            loadingProgressText.setText(Math.min(Math.round(percent * 100), 99).toString() + "%");
        })

        //Loading a file object successful
        this.load.on("load", (fileObj : Phaser.Loader.File) => {
            loadingText.setText(CONFIG.TEXTS.loading + fileObj.key);
        });

        //Failed to load a file
        this.load.on('loaderror', (fileObj : Phaser.Loader.File) => {
            console.log("%cFailed to load " + fileObj.key + "\n" + fileObj.url, "color:red;")
        });

        //All loading completed
        this.load.once('complete', (loader : Phaser.Loader.LoaderPlugin, totalComplete : number, totalFailed : number) => {
            loadingProgressText.setText("100%");
            loadingText.setText(CONFIG.TEXTS.loading_finish);
            console.log("Loading of " + totalComplete + " asset(s) complete.\nFailed to load " + totalFailed + " asset(s).");

            //Play Text
            let playText : Phaser.GameObjects.Text = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 350, CONFIG.TEXTS.click_here_to_continue, {
                fontSize: '45px',
                fontFamily: '"Press Start 2P"'
            });
            playText.setOrigin(0.5, 0.425);
            playText.setPadding(5);
            playText.setInteractive();
            playText.on("pointerover", () => {
                this.sound.play('button_hover', {
                    volume: 0.1
                });
                playText.setColor('#888888');
            });
            playText.on("pointerout", () => {
                playText.setColor('#ffffff');
            });
            playText.on("pointerup", () => {
                this.sound.play('button_click', {
                    volume: 0.1
                });
                this.scene.stop();
                this.scene.start(CONFIG.SCENES.INTRO);
            });
        });
    }
    
    create() {}
}