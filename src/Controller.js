/* eslint-disable prefer-template */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
const keypress = require('keypress');
const c = require('ansi-colors');

module.exports = class Controller {
  constructor() {
    this.TYPEMODE = 'typemode';
    this.PLAYMODE = 'playmode';
    this.MENUMODE = 'menumode';
    this.SHOWINFO = 'showinfo';
    this.NOTHING = 'nothing';

    this.mode = this.MENUMODE;

    this.keyboard = {
      a: () => this.game.hero.moveLeft(),
      d: () => this.game.hero.moveRight(),
      w: () => this.game.hero.moveUp(),
      s: () => this.game.hero.moveDown(),
      q: () => this.game.hero.attack(false),
      e: () => this.game.hero.attack(true),
    };

    keypress(process.stdin);

    process.stdin.on('keypress', (ch, key) => {
      if (key) {
        if (this.mode === this.TYPEMODE) {
          if (key.name === 'return') {
            this.resolver(this.typed);
            this.mode = this.NOTHING;
            return;
          }

          if (key.name === 'backspace') {
            console.clear();
            this.typed = this.typed.slice(0, -1);
            this.drawTyping();
            return;
          }

          if (key.name === 'space') {
            console.clear();
            this.typed += ' ';
            this.drawTyping();
            return;
          }

          if (key.shift) {
            console.clear();
            this.typed += key.name.toUpperCase();
            this.drawTyping();
            return;
          }

          console.clear();
          this.typed += key.name;
          this.drawTyping();
          return;
        }

        if (this.mode === this.MENUMODE) {
          if (key.name === 'up' || key.name === 'w') {
            this.prevOption();
            this.drawMainMenu();
          }

          if (key.name === 'down' || key.name === 's') {
            this.nextOption();
            this.drawMainMenu();
          }

          if (key.name === 'return') {
            this.select();
          }
        }

        // if (key.name === 'escape') {
        //   this.handlers.back();
        // }

        if (this.mode === this.PLAYMODE) {
          if (key.name in this.keyboard) {
            this.keyboard[key.name]();
          }
        }

        if (this.mode === this.SHOWINFO) {
          this.resolver();
          this.mode = this.NOTHING;
        }

        if (key.ctrl && key.name === 'c') {
          this.terminate();
        }
      }
    });

    process.stdin.on('mousepress', (info) => {
      if (!info.release && this.mode) {
        this.mouseTyped(info);
        console.log(info);
      }
    });

    process.stdin.setRawMode(true);
  }

  startGame() {
    this.mode = this.PLAYMODE;
  }

  endGame() {
    this.mode = this.NOTHING;
  }

  select() {
    this.mode = this.NOTHING;
    this.resolver(this.currentOption);
  }

  drawMainMenu() {
    this.options = [
      ['⏩ ', c.green.bold('start new game!')],
      ['📜 ', c.yellow.bold('show statistics')],
      ['🫠  ', c.cyan.bold('change player')],
    ];

    this.options.forEach((option, index) => {
      if (index === this.currentOption) {
        option[1] = c.underline.italic(option[1]);
      }
    });

    console.clear();
    const options = this.options.map((option) => option.join('')).join('\n\n');
    console.log(options);
  }

  showMenu() {
    console.clear();
    this.currentOption = 0;
    this.mode = this.MENUMODE;
    this.drawMainMenu();

    return new Promise((res, rej) => {
      this.resolver = res;
    });
  }

  prevOption() {
    if (this.currentOption === 0) return;
    this.currentOption -= 1;
  }

  nextOption() {
    if (this.currentOption === this.options.length - 1) return;
    this.currentOption += 1;
  }

  getInput(msg, drawer) {
    console.log(msg);
    this.drawer = drawer;
    this.typed = '';
    this.msg = msg;
    this.mode = this.TYPEMODE;
    return new Promise((res, rej) => {
      this.resolver = res;
    });
  }

  async showStatistics(repository, player) {
    this.mode = this.SHOWINFO;

    console.clear();

    const totalResultsPlayer = await repository.getFinalResultAllGames(player.name);
    const playerInfo =
      c.bold.yellow.underline('🪪  Your results:\n\n') +
      c.bold.yellow(player.name) +
      ' has score: ' +
      c.bold.green(totalResultsPlayer.score) +
      ' enemy killed: ' +
      c.bold.red(totalResultsPlayer.enemiesKilled);

    const prefix = ['🪩  ', '🥈 ', '🥉 '];

    const otherTotalResults = await repository.getLiderBoards();
    const liderBord = `${c.bold.underline.yellow('Top 3 players:\n\n')}${otherTotalResults
      .map(
        (res, i) =>
          prefix[i] +
          c.bold.yellow(res.name) +
          ' has score: ' +
          c.bold.green(res.score) +
          ' enemy killed: ' +
          c.bold.red(res.enemiesKilled),
      )
      .join('\n')}`;

    console.log(playerInfo);
    console.log('\n');
    console.log(liderBord);

    return new Promise((res, rej) => {
      this.resolver = res;
    });
  }

  drawTyping() {
    console.log(this.msg.concat(this.drawer(this.typed)));
  }

  mouseTyped(info) {}

  changeGame(game) {
    this.game = game;
  }

  terminate() {
    process.exit();
  }
};
