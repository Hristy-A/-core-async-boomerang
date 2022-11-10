// Основной файл.
// Запускает игру.
const Game = require('./src/Game');
const runInteractiveConsole = require('./src/keyboard');

// TODO: login
// TODO: show score and kills enemies

// Инициализация игры с настройками.
const game = new Game({
  trackLength: 30,
});

runInteractiveConsole(game);
game.play();
