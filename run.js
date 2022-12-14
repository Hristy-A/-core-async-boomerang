/* eslint-disable no-unused-vars */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
const c = require('ansi-colors');
const Game = require('./src/Game');
const gameSettings = require('./settings.json');
const Repository = require('./repository/Repository');
const Audio = require('./src/Audio');
const Controller = require('./src/Controller');

function calcSettings(settings) {
  if (settings.width === 'dynamic') settings.width = process.stdout.columns;
  return settings;
}

function delay(ms) {
  return new Promise((res, rej) => {
    setTimeout(() => res(), ms);
  });
}

const repository = new Repository();
const controller = new Controller(Audio);
const settings = calcSettings(gameSettings);

async function selectPlayer() {
  console.clear();
  const msg = c.bold.green('\tEnter you nickname:\n\t');
  const userNickName = await controller.getInput(msg, c.bold.yellow);
  try {
    return await repository.getOrCreatePlayer(userNickName);
  } catch {
    console.log(
      c.red.bold('Database not initialized. ') + 'Type: ' + c.green.underline('npm run db-up'),
    );
    Audio.instance.stopAll();
    process.exit();
  }
}

async function startGame(player) {
  controller.startGame();
  const game = new Game(Object.assign(settings, { audio: Audio }), player);
  controller.changeGame(game);
  const gameResults = await game.play();
  controller.endGame();
  console.log(gameResults);
  await repository.recordNewResult(
    gameResults.name,
    Math.round(gameResults.score),
    gameResults.enemykilled,
  );
  Audio.instance.stopAll();
  Audio.instance.playInfinity(Audio.MAINMENU);
}

(async () => {
  Audio.instance.playInfinity(Audio.MAINMENU);
  console.clear();
  const helloMessage = c.bold.yellow('\n\n\t\t\tWelcome to the mega game!!!');
  console.log(helloMessage);
  await delay(1700);
  let player = await selectPlayer();

  while (1) {
    console.clear();

    // showing menu
    switch (await controller.showMenu()) {
      case 0:
        await startGame(player);
        break;
      case 1:
        await controller.showStatistics(repository, player);
        break;
      case 2:
        player = await selectPlayer();
        break;
      default:
        process.exit();
    }
  }
})();
