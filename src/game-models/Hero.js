// Наш герой.

class Hero {
  constructor(game) {
    this.skin = game.player.skin; // можете использовать любые emoji '💃'
    this.posX = 0;
    this.posY = 0;
    this.game = game;
  }

  tick() {
    this.game.boomerang.tick();
  }

  moveUp() {
    if (this.posY > 0) {
      this.posY -= 1;
      this.game.check();
    }
  }

  moveDown() {
    if (this.posY < this.game.height - 1) {
      this.posY += 1;
      this.game.check();
    }
  }

  moveLeft() {
    if (this.posX > 0) {
      this.posX -= 1;
      this.game.check();
    }
  }

  moveRight() {
    if (this.posX < this.game.width) {
      this.posX += 1;
      this.game.check();
    }
  }

  attack(right) {
    if (this.game.boomerang.condition === 'Static') {
      this.game.boomerang.posX = this.posX;
      this.game.boomerang.posY = this.posY;
      this.game.boomerang.condition = 'Right';
    }
  }

  die(interval) {
    this.skin = '💀';
    clearInterval(interval);
    this.game.regenerateTrack();
    this.game.view.render(this.game.track);
    console.log('YOU ARE DEAD!💀');
    process.exit();
  }
}

module.exports = Hero;
