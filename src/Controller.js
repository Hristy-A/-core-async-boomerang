const keypress = require('keypress');

module.exports = class SmartConsole {
  constructor() {
    this.keyboard = {
      a: (game) => game.hero.moveLeft(),
      d: (game) => game.hero.moveRight(),
      w: (game) => game.hero.moveUp(),
      s: (game) => game.hero.moveDown(),
      q: (game) => game.hero.attack(false),
      e: (game) => game.hero.attack(true),
    };

    this.TYPEMODE = 'typemode';
    this.PLAYMODE = 'playmode';
    this.MENUMODE = 'menumode';
  }

  startListening(game) {
    keypress(process.stdin);
    process.stdin.on('keypress', (ch, key) => {
      if (key) {
        if (key.name in this.keyboard) {
          keyboard[key.name](game);
        }

        if (key.ctrl && key.name === 'c') {
        }
      }
    });

    process.stdin.setRawMode(true);
  }

  terminate() {
    process.exit();
  }
};
