// Сделаем отдельный класс для отображения игры в консоли.

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
    console.log(statusBar);
    console.log(this.game.track.map((row) => row.join('')).join('\n'));
    console.log('\n\n');
    console.log(`Playing: ${this.game.player.name}`);
    console.log(`Total score: ${this.game.score.toFixed(1)}`);
    console.log(`Enemies killed: ${this.game.killedEnemiesCount}`);
    console.log(`Created by "${yourTeamName}" with love`);
  }
}

module.exports = View;
