const keypress = require('keypress');

const keyboard = {
  a: (game) => game.hero.moveLeft(),
  d: (game) => game.hero.moveRight(),
  q: (game) => game.hero.attack(false),
  e: (game) => game.hero.attack(true),
  w: (game) => game.hero.moveUp(),
  s: (game) => game.hero.moveDown(),
};

// Какая-то функция.

function runInteractiveConsole(game) {
  keypress(process.stdin);
  process.stdin.on('keypress', (ch, key) => {
    if (key) {
      // Вызывает команду, соответствующую нажатой кнопке.
      if (key.name in keyboard) {
        keyboard[key.name](game);
      }
      // Прерывание программы.
      if (key.ctrl && key.name === 'c') {
        game.playing.kill();
        process.exit();
      }
    }
  });
  process.stdin.setRawMode(true);
}

module.exports = runInteractiveConsole;
