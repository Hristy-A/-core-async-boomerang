// Враг.

class Enemy {
  constructor() {
    this.generateSkin();
    this.position = 10;
    this.moveEveryTick = 5;
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
  }

  die() {
    this.generateSkin();
    this.position = 10;
    this.moveEveryTick = this.moveEveryTick >= 0 ? this.moveEveryTick - 1 : this.moveEveryTick;
    console.log('Enemy is dead!');
  }
}

module.exports = Enemy;
