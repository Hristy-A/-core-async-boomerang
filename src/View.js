// Сделаем отдельный класс для отображения игры в консоли.

class View {
  constructor(game) {
    this.game = game;
  }

  render() {
    const yourTeamName = 'Elbrus';

    // Тут всё рисуем.
    console.clear();
    console.log(this.game.track.map((row) => row.join('')).join('\n'));
    console.log('\n\n');
    console.log(`Playing: ${this.game.player.name}`);
    console.log(`Total score: ${this.game.score.toFixed(1)}`);
    console.log(`Enemies killed: ${this.game.killedEnemiesCount}`);
    console.log(`Created by "${yourTeamName}" with love`);
  }
}

module.exports = View;
