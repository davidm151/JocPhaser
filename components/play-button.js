export class PlayButton {
  constructor(scene) {
    this.relatedScene = scene;
  }

  preload() {
    this.relatedScene.load.image('button', '/JocPhaser/images/play.png');
  }

  create() {
    this.startButton = this.relatedScene.add.image(400, 300, 'button').setInteractive();

    this.startButton.on('pointerdown', () => {
      this.relatedScene.scene.start('game');
    });
  }
}
