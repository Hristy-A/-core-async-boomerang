const Enemy = require('./Enemy');

module.exports = class ShieldEnemy extends Enemy {
  constructor(game, posX, posY) {
    super(game, posX, posY);
  }
};
