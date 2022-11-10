// Наш герой.

class Hero {
  constructor({ position = 0 } = {}) {
    this.skin = '🤠'; // можете использовать любые emoji '💃'
    this.position = position;
  }

  tick() {}

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
  }

  attack() {
    this.boomerang.condition = 'Right';
  }

  die(interval) {
    this.skin = '💀';
    console.log('YOU ARE DEAD!💀');
    process.exit();
    // clearInterval(interval);
  }
}

module.exports = Hero;
