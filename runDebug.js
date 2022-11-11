/* eslint-disable no-param-reassign */
const Game = require('./src/Game');
const gameSettings = require('./settings.json');

(async () => {
  const player = { name: 'test', skin: '🆎' };
  function calcSettings(settings) {
    if (settings.width === 'dynamic') settings.width = process.stdout.columns;
    return settings;
  }

  const game = new Game(calcSettings(gameSettings), player);

  // runInteractiveConsole(game);
  game.play();
})();
