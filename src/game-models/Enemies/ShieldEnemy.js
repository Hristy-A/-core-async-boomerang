const Enemy = require('./Enemy');

module.exports = class ShieldEnemy extends Enemy {
  generateSkin() {
    this.skin = '🦣'.concat(' ');
  }

  moveLeft() {
    this.posX -= 1;
    this.game.check();
  }

  die(killedByPlayer) {
    if (this.game.boomerang.direction === true) {
      super.die(killedByPlayer);
    }
  }
};
