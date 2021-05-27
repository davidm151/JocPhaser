export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });

  }
  init() {
    this.score = 0;
    this.scoreText;
    this.vides=4;
    this.y=false
    this.x=true
  }

  preload() {
    this.load.image('background', 'images/background.png');
    this.load.image('gameover', 'images/gameover.png');
    this.load.image('terra', 'images/sample.png');
    this.load.tilemapTiledJSON('mapa', 'images/mapa.json');

    this.load.spritesheet('dude', 'images/personatge.png', { frameWidth: 57, frameHeight: 62 });
    this.load.audio('scoin', 'sorolls/coin.ogg');
    this.load.audio('mal', 'sorolls/mal.ogg');
    this.load.audio('musica', 'sorolls/musica.ogg');
    this.load.image('moneda', 'images/moneda.png');
    this.load.image('porta', 'images/porta.png');
    this.load.image('enemic', 'images/spider.png');
    this.load.image('spark', 'images/spark_01.png');

  }

  create() {
   // this.vides=4;
    this.add.image(400, 250, 'background');
    const map =   this.make.tilemap({ key: 'mapa' });
    const tileset = map.addTilesetImage('sample','terra');

    const platforms = map.createStaticLayer('plataforma', tileset,0,-395)
    const perill = map.createStaticLayer('perill', tileset,0,-395)

    this.porta=this.physics.add.image(770,120,'porta').setImmovable();
    this.porta.setCollideWorldBounds(true);
    this.enemic=this.physics.add.image(420,200,'enemic').setImmovable();
    // this.enemic.setCollideWorldBounds(true);
    platforms.setCollisionByProperty({ solids: true });
    perill.setCollisionByProperty({ solids: true });

    this.player = this.physics.add.sprite(10, 10, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.enemic2=this.physics.add.sprite(600,100,'enemic').setImmovable();

    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(this.enemic, platforms);
    this.physics.add.collider(this.enemic2, platforms);

    this.scoreText = this.add.text(16, 16, 'SCORE: 0', { fontSize: '32px', fill: '#000' });
    this.videsText = this.add.text(16, 40, 'VIDES: 4', { fontSize: '32px', fill: '#000' });

    this.moneda = this.physics.add.group({
      key: 'moneda',
     repeat: 11,
      setXY: { x: 100, y: 100, stepX: 70 }
    });
    this.particles = this.add.particles('spark');
    this.physics.add.collider(this.enemic, platforms);
    this.physics.add.collider(this.moneda, platforms);
    this.physics.add.collider(this.player, this.moneda, this.collectMoneda, null, this);
    this.physics.add.collider(this.player, perill, this.mort, null, this);
    this.physics.add.collider(this.player, this.enemic, this.mort, null, this);
    this.physics.add.collider(this.player, this.enemic2, this.mort, null, this);
    this.physics.add.collider(this.player,this.porta, this.accioPorta, null, this);
    this.physics.add.collider(this.porta,platforms);

    this.cameras.main.on('camerashakestart', function () {
      platforms.setVisible(true);
    });

    this.cameras.main.on('camerashakecomplete', function () {
      platforms.setVisible(false);
    });

    this.anims.create({
      key: 'caminar',
      frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 0 }),
      frameRate: 10
    });

    this.scoin = this.sound.add('scoin');
    this.mal = this.sound.add('mal');
    this.musica = this.sound.add('musica');

    this.musica.play();

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update ()
  {
    if(this.vides==0){
      this.cameras.main.shake(500);
      this.musica.stop();
     this.time.delayedCall(1000,this.movimentCamera,[this.scene],this);
    }
    const velocitat = 350;
    const alturaSalt = -350;
    this.player.body.setVelocityX(0);
    if(this.cursors.left.isDown){
      this.player.body.setVelocityX(-velocitat);
      this.player.flipX = true;
    }

    if(this.cursors.right.isDown){
      this.player.body.setVelocityX(velocitat);
      this.player.flipX = false;
    }

    if(this.cursors.up.isDown && this.player.body.onFloor()){
      this.player.body.setVelocityY(alturaSalt);
    }

    if((this.cursors.left.isDown || this.cursors.right.isDown) && this.player.body.onFloor()){
      this.player.anims.play('caminar',true);
    }else if(!this.player.body.onFloor()){
      this.player.setFrame(9);
    }else{
      this.player.setFrame(0);
    }
  }
  collectMoneda(player,moneda)
  {
    this.emit=this.particles.createEmitter(
        {
          x: moneda.x,
          y: moneda.y,
          lifespan:500,
          speed:20,
          scale: {start: 0.1, end: 0},
          gravityY:800
        }
    );
    this.time.delayedCall(1000,this.desactivar,[this.emit],this)
    moneda.disableBody(true, true);
    this.score +=10;
    this.scoin.play();
    this.scoreText.setText('SCORE: ' + this.score);
  }

  mort (player, perill)
  {
    this.vides-=1;
    this.videsText.setText('VIDES: ' + this.vides);
    this.mal.play();
    this.player.setPosition(10, 10);
  }
  accioPorta (player, perill)
  {
    this.scene.start('game2',{ vides: this.vides,score: this.score, musica: this.musica });
  }
  movimentCamera (s)
  {
    s.start('gameover')
  }
  desactivar(emit){
      emit.on=false;
  }
}