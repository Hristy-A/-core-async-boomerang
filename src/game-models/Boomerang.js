// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!

class Boomerang {
  constructor() {
    this.skin = '🌀';
    this.position = 1;
    this.condition = 'Static';
    // this.posUD = 0;
  }

  fly() {
    if (this.condition === 'Right') {
      this.moveRight();
    }
    if (this.condition === 'Left') {
      this.moveLeft();
    }
    if (this.condition === 'Static') {
      this.boomerang.position = this.hero.position + 1;
    }
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
