/* eslint-disable no-param-reassign */
// Основной файл.
// Запускает игру.
const Game = require('./src/Game');
const runInteractiveConsole = require('./src/keyboard');
const gameSettings = require('./settings.json');
const ask = require('./ask');
const Repository = require('./repository/Repository');

const repository = new Repository();

(async () => {
  // const nickname = await ask('Welcome! Enter you nickname:');
  const nickname = 'h';
  console.log(nickname);

  const player = await repository.getOrCreatePlayer(nickname);
  console.log(player.name, player.skin);

  function calcSettings(settings) {
    if (settings.width === 'dynamic') settings.width = process.stdout.columns;
    return settings;
  }

  // // TODO: login
  // // TODO: show score and kills enemies

  // // Инициализация игры с настройками.
  const game = new Game(calcSettings(gameSettings), player);

  runInteractiveConsole(game);
  game.play();
})();
