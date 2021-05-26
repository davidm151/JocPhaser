import { RestartButton } from "./components/restart-button.js";

export class Win extends Phaser.Scene {
    constructor() {
        super({ key: 'win' });
       this.restartButton = new RestartButton(this);
    }

    preload() {
      this.load.image('background', 'images/background.png');
      this.load.image('win', 'images/win.png');
        this.restartButton.preload();
    }

    create() {
      this.add.image(400, 250, 'background');
        this.restartButton.create();
       this.add.image(400, 100, 'win');
    }
}