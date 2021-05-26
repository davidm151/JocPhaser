export class RestartButton {
  constructor(scene) {
    this.relatedScene = scene;
  }

  preload() {
    this.relatedScene.load.image('button2', 'images/replay.png');
  }

  create() {
    this.startButton2 = this.relatedScene.add.image(400, 230, 'button2').setInteractive();

    this.startButton2.on('pointerdown', () => {
      this.relatedScene.scene.start('game');
    });
  }
}
