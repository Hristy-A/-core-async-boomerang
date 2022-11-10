const Enemy = require('./Enemy');
const SpiderWeb = require('./SpiderWeb');
const random = require('../random');

module.exports = class SpiderEnemy extends Enemy {
  generateSkin() {
    this.skin = '🕷'.concat(' ');
  }

  moveLeft() {
    this.posX -= 1;
    if (random(20) < 3) {
      this.game.enemyList.add(new SpiderWeb(this.game, this.posY, this.posX));
    }
    this.game.check();
  }
};
