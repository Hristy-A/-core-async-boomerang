class Boomerang {
  constructor(game) {
    this.skin = game.player.boomerang;
    this.condition = 'Static';
    this.game = game;
    this.moveEveryTick = 2;
    this.tickCount = 1;
    this.posX = 0;
    this.posY = 0;
    this.direction = true;
  }

  reverse() {
    if (this.condition === 'Left') {
      this.condition = 'Right';
      return;
    }
    if (this.condition === 'Right') this.condition = 'Left';
  }

  tick() {
    this.fly();
  }

  fly() {
    if (this.tickCount !== this.moveEveryTick) {
      this.tickCount += 1;
      return;
    }

    if (this.condition === 'Right') {
      this.moveRight();
    }
    if (this.condition === 'Left') {
      this.moveLeft();
    }
    if (this.condition === 'Static') {
      this.posX = this.game.hero.posX;
    }
    this.tickCount = 1;
    this.game.check();
  }

  moveLeft() {
    // Идём влево.
    this.posX -= 1;
  }

  moveRight() {
    // Идём вправо.
    this.posX += 1;
  }
}

module.exports = Boomerang;
