/* eslint-disable no-param-reassign */
// Основной файл.
// Запускает игру.
const Game = require('./src/Game');
const runInteractiveConsole = require('./src/keyboard');
const gameSettings = require('./settings.json');

function calcSettings(settings) {
  if (settings.width === 'dynamic') settings.width = process.stdout.columns;
  return settings;
}

// TODO: login
// TODO: show score and kills enemies

// Инициализация игры с настройками.
const game = new Game(calcSettings(gameSettings));

runInteractiveConsole(game);
game.play();
