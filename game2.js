export class Game2 extends Phaser.Scene {
  constructor() {
    super({ key: 'game2' });

  }
  init(data) {
    this.score = data.score;
    this.scoreText;
    this.vides=data.vides;
  }

  preload() {
    this.load.image('background', 'images/background.png');
    this.load.image('gameover', 'images/gameover.png');
    this.load.image('terra', 'images/sample.png');
    this.load.tilemapTiledJSON('mapa2', 'images/mapa2.json');
    this.load.spritesheet('dude2', 'images/personatge.png', { frameWidth: 57, frameHeight: 62 });
    this.load.audio('scoin', 'sorolls/coin.ogg');
    this.load.audio('mal', 'sorolls/mal.ogg');
    this.load.image('moneda', 'images/moneda.png');
    this.load.image('porta', 'images/porta.png');
    this.load.image('enemic', 'images/spider.png');
    this.load.image('spark', 'images/spark_01.png');
    this.load.image('medalla', 'images/medalla.png');
  }

  create() {
   this.add.image(400, 250, 'background');
    const map =   this.make.tilemap({ key: 'mapa2' });
    const tileset = map.addTilesetImage('sample','terra');

    const platforms = map.createStaticLayer('plataforma', tileset,0,-395)
    const perill = map.createStaticLayer('perill', tileset,0,-395)

    platforms.setCollisionByProperty({ solids: true });
   perill.setCollisionByProperty({ solids: true });

    this.player2 = this.physics.add.sprite(50, 50, 'dude2');
    this.player2.setBounce(0.2);
    this.player2.setCollideWorldBounds(true);
    this.physics.add.collider(this.player2, platforms);

    this.enemic=this.physics.add.image(230,200,'enemic').setImmovable();
    this.enemic2=this.physics.add.image(550,200,'enemic').setImmovable();
    this.medalla=this.physics.add.image(770,100,'medalla').setImmovable();
    this.scoreText = this.add.text(16, 16, 'SCORE: '+this.score, { fontSize: '32px', fill: '#000' });
    this.videsText = this.add.text(16, 40, 'VIDES: '+this.vides, { fontSize: '32px', fill: '#000' });

    this.moneda = this.physics.add.group({
      key: 'moneda',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.particles = this.add.particles('spark');
    this.physics.add.collider(this.moneda, platforms);
    this.physics.add.collider(this.enemic, platforms);
    this.physics.add.collider(this.enemic2, platforms);
    this.physics.add.collider(this.medalla, platforms);
    this.physics.add.collider(this.player2, this.moneda, this.collectMoneda, null, this);
    this.physics.add.collider(this.player2, perill, this.mort, null, this);
    this.physics.add.collider(this.player2, this.enemic, this.mort, null, this);
    this.physics.add.collider(this.player2, this.enemic2, this.mort, null, this);
    this.physics.add.collider(this.player2, this.medalla, this.win, null, this);

    this.anims.create({
      key: 'caminar',
      frames: this.anims.generateFrameNumbers('dude2', { start: 1, end: 0 }),
      frameRate: 10
    });

      this.cameras.main.on('camerashakestart', function () {
          platforms.setVisible(true);
      });

      this.cameras.main.on('camerashakecomplete', function () {
          platforms.setVisible(false);
      });
    this.scoin = this.sound.add('scoin');
    this.mal = this.sound.add('mal');

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update ()
  {
    if(this.vides==0){
        this.cameras.main.shake(500);
        this.time.delayedCall(1000,this.movimentCamera,[this.scene],this);

    }
    const velocitat = 350;
    const alturaSalt = -350;
    this.player2.body.setVelocityX(0);
    if(this.cursors.left.isDown){
      this.player2.body.setVelocityX(-velocitat);
      this.player2.flipX = true;
    }

    if(this.cursors.right.isDown){
      this.player2.body.setVelocityX(velocitat);
      this.player2.flipX = false;
    }

    if(this.cursors.up.isDown && this.player2.body.onFloor()){
      this.player2.body.setVelocityY(alturaSalt);
    }

    if((this.cursors.left.isDown || this.cursors.right.isDown) && this.player2.body.onFloor()){
      this.player2.anims.play('caminar',true);
    }else if(!this.player2.body.onFloor()){
      this.player2.setFrame(9);
    }else{
      this.player2.setFrame(0);
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
    this.player2.setPosition(50, 50);

  }
  accioPorta (player, perill)
  {
    this.scene.start('game2');
  }
  movimentCamera (s)
  {
      s.start('gameover')
  }
  desactivar(emit){
      emit.on=false;
  }
  win(){
      this.scene.start('win');
  }
}
