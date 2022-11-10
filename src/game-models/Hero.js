// Наш герой.

class Hero {
  constructor({ game, position = 0 } = {}) {
    this.skin = '🤠'; // можете использовать любые emoji '💃'
    this.position = position;
    this.game = game;
  }

  tick() {
    this.game.boomerang.tick();
  }

  moveLeft() {
    // if (this.position < 0)
    this.position -= 1;
    this.game.check();
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
    this.game.check();
  }

  attack() {
    if (this.game.boomerang.condition === 'Static') {
      this.game.boomerang.position = this.position;
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
