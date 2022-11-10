// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const Boomerang = require('./game-models/Boomerang');
const View = require('./View');

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength = 50, tickRate = 16 }) {
    this.trackLength = trackLength;
    this.tickRate = tickRate;
    // TODO: write hero, enemy and view
    this.enemy = new Enemy({ game: this });

    for (let i = 0; i < 8; i += 1) {
      this.enemy[i] = new Enemy({ game: this, posUD: i });
    }

    this.view = new View(this);
    this.boomerang = new Boomerang({ game: this });
    this.hero = new Hero({ game: this }); // Герою можно аргументом передать бумеранг.
    this.track = [];
    this.regenerateTrack();
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = [[...new Array(this.trackLength).fill(' ')],
      [...new Array(this.trackLength).fill(' ')],
      [...new Array(this.trackLength).fill(' ')],
      [...new Array(this.trackLength).fill(' ')],
      [...new Array(this.trackLength).fill(' ')],
      [...new Array(this.trackLength).fill(' ')],
      [...new Array(this.trackLength).fill(' ')],
      [...new Array(this.trackLength).fill(' ')]];
    for (let i = 0; i < 8; i += 1) {
      this.track[this.enemy[i].posUD][this.enemy[i].position] = this.enemy[i].skin;
    }
    if (this.boomerang.condition !== 'Static') {
      this.track[this.boomerang.posUD][this.boomerang.position] = this.boomerang.skin;
    }
    this.track[this.hero.posUD][this.hero.position] = this.hero.skin;
  }

  check() {
    for (let i = 0; i < 8; i += 1) {
      if (this.hero.position === this.enemy[i].position && this.hero.posUD === this.enemy[i].posUD) {
        this.hero.die(this.intervalPlay);
      }
      if (this.boomerang.position === this.enemy[i].position && this.boomerang.posUD === this.enemy[i].posUD) {
        this.enemy[i].die();
        this.boomerang.condition = 'Left';
      }
      if (this.boomerang.position === this.hero.position && this.boomerang.condition === 'Left') {
        this.boomerang.condition = 'Static';
        this.boomerang.position = -1;
      }
      if (this.boomerang.position - this.hero.position >= 10) {
        this.boomerang.condition = 'Left';
      }
      if (this.enemy[i].position <= 0) {
        this.enemy[i].die();
      }
    }
  }

  update() {
    this.hero.tick();
    for (let i = 0; i < 8; i += 1) {
      this.enemy[i].tick();
    }
    this.check();
    this.regenerateTrack();
    this.view.render(this.track);
  }

  play() {
    this.intervalPlay = setInterval(() => {
      this.update();
    }, this.tickRate);
  }
}

module.exports = Game;
