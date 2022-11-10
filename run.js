// Основной файл.
// Запускает игру.
const Game = require('./src/Game');

//TODO: login
//TODO: show score and kills enemies

// Инициализация игры с настройками.
const game = new Game({
  trackLength: 30,
});

// Запуск игры.
game.play();
