// Наш герой.

class Hero {
  constructor({ position }) {
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
    // Атакуем.
    this.boomerang.fly();
  }

  die(interval) {
    this.skin = '💀';
    console.log('YOU ARE DEAD!💀');
    clearInterval(interval);
    // process.exit();
  }
}

module.exports = Hero;
