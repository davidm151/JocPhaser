export class RestartButton {
  constructor(scene) {
    this.relatedScene = scene;
  }

  preload() {
    this.relatedScene.load.spritesheet('button2', '../images/replay.png', { frameWidth: 218, frameHeight: 108 });
  }

  create() {
    this.startButton2 = this.relatedScene.add.sprite(400, 230, 'button2').setInteractive();

    this.startButton2.on('pointerover', () => {
      this.startButton2.setFrame(1);
    });
    this.startButton2.on('pointerout', () => {
      this.startButton2.setFrame(0);
    });
    this.startButton2.on('pointerdown', () => {
      this.relatedScene.scene.start('game');
    });
  }
}
