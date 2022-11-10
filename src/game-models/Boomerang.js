// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!

class Boomerang {
  constructor({ game } = {}) {
    this.skin = '🌀';
    // this.position = 0;
    this.condition = 'Static';
    this.game = game;
    // this.posUD = 0;
    this.moveEveryTick = 2;
    this.tickCount = 1;
    this.posUD = 0;
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
      this.position = null;
    }
    this.tickCount = 1;
    this.game.check();
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
  }
}

module.exports = Boomerang;
