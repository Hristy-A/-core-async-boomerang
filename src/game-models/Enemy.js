// Враг.

class Enemy {
  constructor() {
    this.generateSkin();
    this.position = 2;
    this.moveEveryTick = 6;
    this.tickCount = 0;
  }

  tick() {
    this.tickCount++;
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
    // Идём влево.
    this.position -= 1;
  }

  die() {
    this.position = '?';
    console.log('Enemy is dead!');
  }
}

module.exports = Enemy;
