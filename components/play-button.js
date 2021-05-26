export class PlayButton {
  constructor(scene) {
    this.relatedScene = scene;
  }

  preload() {
    this.relatedScene.load.spritesheet('button', '../images/play.png', { frameWidth: 128, frameHeight: 128 });
  }

  create() {
    this.startButton = this.relatedScene.add.sprite(400, 300, 'button').setInteractive();

    this.startButton.on('pointerover', () => {
      this.startButton.setFrame(1);
    });
    this.startButton.on('pointerout', () => {
      this.startButton.setFrame(0);
    });
    this.startButton.on('pointerdown', () => {
      this.relatedScene.scene.start('game');
    });
  }
}
