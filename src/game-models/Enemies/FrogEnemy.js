const Enemy = require('./Enemy');
const random = require('../random');

module.exports = class FrogEnemy extends Enemy {
  tick() {
    this.tickCount += 1;
    if (this.tickCount >= this.moveEveryTick) {
      this.moveLeft();
      if (random(10) < 2) {
        if (random(2) < 1) this.moveDown();
        else this.moveUp();
      }
      this.tickCount = 0;
    }
  }

  generateSkin() {
    this.skin = '🐸';
  }

  moveUp() {
    if (this.posY > 0) {
      this.posY -= 1;
      this.game.check();
    } else {
      this.moveDown();
    }
  }

  moveDown() {
    if (this.posY < this.game.height - 1) {
      this.posY += 1;
      this.game.check();
    } else {
      this.moveUp();
    }
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
};
