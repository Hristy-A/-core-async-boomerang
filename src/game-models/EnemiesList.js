/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
const Enemy = require('./Enemy');
const getRandom = require('./getRandom');

module.exports = class EnemiesList {
  constructor(game, enemiesCount) {
    this.game = game;
    this.enemiesCount = enemiesCount;

    this.enemies = this.generateStartEnemies();
  }

  tick() {
    this.enemies.forEach((enemy) => enemy.tick());
  }

  generateStartEnemies(height) {
    return Array.from(
      { length: this.enemiesCount },
      () =>
        new Enemy(
          this.game,
          getRandom(this.game.width, Math.floor(this.game.width / 4)),
          getRandom(this.game.height),
        ),
    );
  }

  collidesWithHero(hero) {
    return this.enemies.some((enemy) => enemy.posX === hero.posX && enemy.posY === hero.posY);
  }

  collideWithBoomerang(boomerang) {
    let collide = false;
    this.enemies.forEach((enemy) => {
      if (enemy.posX === boomerang.posX && enemy.posY === boomerang.posY) {
        enemy.die(true);
        collide = true;
      }
    });
    return collide;
  }

  fillTrack(track) {
    this.enemies.forEach((enemy) => {
      track[enemy.posY][enemy.posX] = enemy.skin;
    });
  }

  killOutOfRange() {
    this.enemies.forEach((enemy) => {
      if (enemy.posX <= 0) enemy.die();
    });
  }
};
