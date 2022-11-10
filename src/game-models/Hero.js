// Наш герой.

class Hero {
  constructor(game, player) {
    this.skin = player.skin; // можете использовать любые emoji '💃'
    this.posX = 0;
    this.posY = 0;
    this.game = game;
  }

  tick() {
    this.game.boomerang.tick();
  }

  moveUp() {
    this.posY -= 1;
    this.game.check();
  }

  moveDown() {
    this.posY += 1;
    this.game.check();
  }

  moveLeft() {
    // if (this.position < 0)
    this.posX -= 1;
    this.game.check();
  }

  moveRight() {
    // Идём вправо.
    this.posX += 1;
    this.game.check();
  }

  attack() {
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
