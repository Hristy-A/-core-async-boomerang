// Сделаем отдельный класс для отображения игры в консоли.
const c = require('ansi-colors');

class View {
  constructor(game) {
    this.game = game;
  }

  render() {
    const yourTeamName = 'Bears';

    // Тут всё рисуем.
    let statusBar = `HP: ${[
      ...'💗'
        .repeat(this.game.hero.health)
        .concat([...'🖤'.repeat(this.game.baseHealth - this.game.hero.health)].join('')),
    ].join(' ')}`;
    statusBar = statusBar.padStart(
      Math.floor(this.game.width - statusBar.length + statusBar.length),
      '  ',
    );
    statusBar = statusBar.padEnd(this.game.width, '  ').concat('\n');

    console.clear();
    console.log(c.red.bold(statusBar));
    console.log('🟫'.repeat(this.game.width));
    console.log(c.bgBlack(this.game.track.map((row) => row.join('')).join('\n')));
    console.log('🟫'.repeat(this.game.width));
    console.log('\n\n');
    console.log("\x1b[36m%s\x1b[0m", `Playing: ${this.game.player.name}`);
    console.log(c.yellow.bold.underline(`Total score: ${this.game.score.toFixed(1)}`));
    console.log(`Enemies killed 💀 : ${this.game.killedEnemiesCount}`);
    console.log(`Created by "${yourTeamName}" with love`);
  }
}

module.exports = View;
