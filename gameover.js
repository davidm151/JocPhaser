import { RestartButton } from "./components/restart-button.js";

export class Gameover extends Phaser.Scene {
    constructor() {
        super({ key: 'gameover' });
       this.restartButton = new RestartButton(this);
    }

    preload() {
       this.load.image('background', 'images/background.png');
       this.load.image('gameover', 'images/gameover.png');
        this.restartButton.preload();
    }

    create() {
       this.add.image(400, 250, 'background');
        this.restartButton.create();
       this.add.image(400, 100, 'gameover');
    }
}