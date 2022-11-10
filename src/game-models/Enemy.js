// Враг.

class Enemy {
  constructor({ game }) {
    this.game = game;
    this.generateSkin();
    this.position = game.trackLength;
    this.moveEveryTick = 20;
    this.minimalTick = 5;
    this.tickCount = 0;
    this.posUD = 0;
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
    this.position -= 1;
    this.game.check();
  }

  moveUp() {
    this.posUD -= 1;
    this.game.check();
  }

  moveDown() {
    this.posUD += 1;
    this.game.check();
  }

  die() {
    this.generateSkin();
    this.position = this.game.trackLength;
    this.posUD = Math.floor(Math.random() * 8);
    if (this.moveEveryTick > this.minimalTick) {
      this.moveEveryTick -= 1;
    }
    console.log('Enemy is dead!');
  }
}

module.exports = Enemy;
