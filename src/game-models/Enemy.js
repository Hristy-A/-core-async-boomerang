// Враг.

class Enemy {
  constructor({ game }) {
    this.game = game;
    this.generateSkin();
    this.position = game.trackLength;
    this.moveEveryTick = 5;
    this.minimalTick = 2;
    this.tickCount = 0;
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

  die() {
    this.generateSkin();
    this.position = this.game.trackLength;
    if (this.moveEveryTick > this.minimalTick) {
      this.moveEveryTick -= 1;
    }
    // this.moveEveryTick = this.moveEveryTick > 1 ? this.moveEveryTick - 1 : this.moveEveryTick;
    console.log('Enemy is dead!');
  }
}

module.exports = Enemy;
