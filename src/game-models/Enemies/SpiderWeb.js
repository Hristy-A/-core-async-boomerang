module.exports = class SpiderWeb {
  /* eslint-disable consistent-return */
  constructor(game, posY, posX) {
    this.game = game;
    this.skin = '🕸'.concat(' ');
    this.posY = posY;
    this.posX = posX;

    this.wait = 300;
  }

  remove() {
    const index = this.game.enemyList.enemies.findIndex((enemy) => enemy === this);
    this.game.enemyList.enemies.splice(index, 1);
  }

  die() {
    this.remove();
  }

  tick() {
    this.wait -= 1;
    if (this.wait > 0) return;
    this.remove();
  }
};
