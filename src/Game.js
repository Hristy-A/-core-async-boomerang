// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./game-models/Hero');
const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const EnemiesList = require('./game-models/EnemiesList');

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor(settings, player) {
    // устанавливаем базовые настройки игры
    Object.assign(this, settings);
    this.player = player;

    this.enemyList = new EnemiesList(this, settings.enemiesCount);
    this.view = new View(this);
    this.boomerang = new Boomerang(this);
    this.hero = new Hero(this);

    this.score = 0;
    this.killedEnemiesCount = 0;

    this.regenerateTrack();
  }

  destroyEntryEnemy() {
    this.enemyList.kill(this.hero.posX, this.hero.posY);
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = Array.from({ length: this.height }, () => [...new Array(this.width).fill('  ')]);
    // рисуем врагов
    this.enemyList.fillTrack(this.track);
    // рисуем бумеранг
    if (this.boomerang.condition !== 'Static') {
      this.track[this.boomerang.posY][this.boomerang.posX] = this.boomerang.skin;
    }
    // рисуем героя
    this.track[this.hero.posY][this.hero.posX] = this.hero.skin;
  }

  check() {
    if (Math.abs(this.boomerang.posX - this.hero.posX) >= 15) {
      this.boomerang.reverse();
    }
    if (
      this.boomerang.posX === this.hero.posX &&
      this.boomerang.condition === 'Left' &&
      this.boomerang.direction === false
    ) {
      this.boomerang.condition = 'Static';
      this.boomerang.posX = this.hero.posX;
    }
    if (
      this.boomerang.posX === this.hero.posX &&
      this.boomerang.condition === 'Right' &&
      this.boomerang.direction === true
    ) {
      this.boomerang.condition = 'Static';
      this.boomerang.posX = this.hero.posX;
    }
    if (this.boomerang.condition === 'Static') {
      this.boomerang.posX = this.hero.posX;
      this.boomerang.posY = this.hero.posY;
    }
    if (this.enemyList.collidesWithHero(this.hero)) {
      this.hero.hit(this.intervalPlay);
    }
    if (this.enemyList.collideWithBoomerang(this.boomerang)) {
      this.boomerang.reverse();
    }
    this.enemyList.killOutOfRange();
  }

  update() {
    this.hero.tick();
    this.enemyList.tick();
    this.check();
    this.regenerateTrack();
    this.view.render(this.track);

    this.score += 0.02;
  }

  play() {
    this.audio.instance.stopAll();
    this.audio.instance.playInfinity(this.audio.PLAYING);
    this.intervalPlay = setInterval(() => {
      this.update();
    }, this.interval);

    return new Promise((res, rej) => {
      this.resolver = res;
    });
  }
}

module.exports = Game;
