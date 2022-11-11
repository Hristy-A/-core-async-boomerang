/* eslint-disable no-param-reassign */
const Game = require('./src/Game');
const gameSettings = require('./settings.json');
const Repository = require('./repository/Repository');
// const Audio = require('./src/Audio');
const Controller = require('./src/Controller');
const runInteractiveConsole = require('./src/keyboard');

(async () => {
  const repository = new Repository();

  const nickname = 'h';

  // const player = await repository.getOrCreatePlayer(nickname);

  function calcSettings(settings) {
    if (settings.width === 'dynamic') settings.width = process.stdout.columns;
    return settings;
  }

  // // TODO: login
  // // TODO: show score and kills enemies

  // // Инициализация игры с настройками.
  const game = new Game(calcSettings(gameSettings), { name: 'test', skin: '🌀' });

  runInteractiveConsole(game);
  game.play();
})();
