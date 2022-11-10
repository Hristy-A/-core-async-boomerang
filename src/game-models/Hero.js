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
    this.position -= 1;
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
  }

  attack() {
    if (this.game.boomerang.condition === 'Static') {
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
