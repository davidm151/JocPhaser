import { PlayButton } from "./components/play-button.js";

export class Inici extends Phaser.Scene {
    constructor() {
        super({ key: 'inici' });
       this.playButton = new PlayButton(this);
    }

    preload() {
        this.load.image('background', 'images/background.png');
        this.load.image('gameover2', 'images/gamestart.png');
        this.playButton.preload();
    }

    create() {
        this.add.image(400, 250, 'background');
        this.playButton.create();
        this.add.image(400, 150, 'gameover2');
    }
}