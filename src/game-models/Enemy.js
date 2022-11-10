// Враг.

class Enemy {
  constructor(game, posX, posY) {
    this.game = game;
    this.generateSkin();
    this.moveEveryTick = 20;
    this.minimalTick = 5;
    this.tickCount = 0;
    this.posY = posY;
    this.posX = posX;
  }

  tick() {
    this.tickCount += 1;
    if (this.tickCount >= this.moveEveryTick) {
      this.moveLeft();
      this.tickCount = 0;
    }
  }

  generateSkin() {
    const skins = ['👾', '💀', '👹', '👻', '👽', '👿', '💩', '🤡', '🤺', '🧛', '🧟', '🎃'];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    this.posX -= 1;
    this.game.check();
  }

  moveUp() {
    this.posY -= 1;
    this.game.check();
  }

  moveDown() {
    this.posY += 1;
    this.game.check();
  }

  die(killedByPlayer = false) {
    this.generateSkin();
    this.posX = this.game.width;
    this.posY = Math.floor(Math.random() * this.game.height);
    if (this.moveEveryTick > this.minimalTick && killedByPlayer) {
      this.moveEveryTick -= 1;
      this.game.killedEnemiesCount += 1;
      this.game.score += this.game.scorePerEnemy;
    }
  }
}

module.exports = Enemy;
