import { Game } from './game.js';
import { Game2 } from './game2.js';
import { Gameover } from './gameover.js';
import { Win } from './win.js';
import { Inici } from './inici.js';
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  scene: [Inici,Game,Game2,Gameover,Win],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
      debug: false
    }
  }
}
var game = new Phaser.Game(config);