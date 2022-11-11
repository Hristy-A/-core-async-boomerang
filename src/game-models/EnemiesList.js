/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
const Enemy = require('./Enemies/Enemy');
const FrogEnemy = require('./Enemies/FrogEnemy');
const SpiderEnemy = require('./Enemies/SpiderEnemy');
const ShieldEnemy = require('./Enemies/ShieldEnemy');
const SpiderWeb = require('./Enemies/SpiderWeb');

const random = require('./random');

module.exports = class EnemiesList {
  constructor(game, enemiesCount) {
    this.game = game;
    this.enemiesCount = enemiesCount;

    this.enemies = this.generateStartEnemies();
  }

  add(enemy) {
    this.enemies.push(enemy);
  }

  createEnemy() {
    const posx = random(this.game.width, Math.floor(this.game.width / 4));
    const posy = random(this.game.height);
    const seed = random(18);

    if (seed >= 12) return new SpiderEnemy(this.game, posx, posy);
    if (seed > 9) return new ShieldEnemy(this.game, posx, posy);
    if (seed > 6) return new FrogEnemy(this.game, posx, posy);
    return new Enemy(this.game, posx, posy);
  }

  kill(posX, posY) {
    this.enemies
      .filter((enemy) => enemy.posX === posX && enemy.posY === posY)
      .forEach((enemy) => enemy.die());
  }

  tick() {
    this.enemies.forEach((enemy) => enemy.tick());
  }

  generateStartEnemies() {
    return Array.from({ length: this.enemiesCount }, () => this.createEnemy());
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
      if (enemy instanceof SpiderWeb && track[enemy.posY][enemy.posX] !== '  ') return;
      track[enemy.posY][enemy.posX] = enemy.skin;
    });
  }

  killOutOfRange() {
    this.enemies.forEach((enemy) => {
      if (enemy.posX <= 0) enemy.die();
    });
  }
};
