var player = require('play-sound')((opts = {}));
/* eslint-disable no-undef */
class Audio {
  static _instance = null;

  static get instance() {
    if (this._instance) return this._instance;
    this._instance = new Audio();
    return this._instance;
  }

  static MAINMENU = 'mainMenu';

  constructor() {
    this.player = player;

    this.tracksInfo = {
      mainMenu: {
        duration: 46e3,
        path: './main-menu.wav',
      },
    };

    this.currentPlaying = [];
  }

  _removeFromPlaying(hash) {
    const playingIndex = this.currentPlaying.findIndex((playing) => playing.hash === hash);
    if (playingIndex === -1) return;
    this.currentPlaying.splice(playingIndex, 1);
  }

  _play(track, canceller = null) {
    const hash = track + Math.random() * Math.random();
    const tracker = this.player.play(this.tracksInfo[track].path);
    if (canceller !== null && this.currentPlaying.some((playing) => playing.includes(canceller)))
      return;
    this.currentPlaying.push({ hash, tracker, canceller });
    return hash;
  }

  playOnce(track) {
    const hash = this._play(track);
    setTimeout(() => this._removeFromPlaying(hash), this.tracksInfo[track].duration);
  }

  stopPlaying(track) {
    const playingList = this.currentPlaying.filter((playing) => playing.hash.includes(track));
    playingList.forEach((playing) => {
      if (playing.canceller) clearInterval(playing.canceller);
      playing.tracker.kill();
    });
    this.currentPlaying = [];
  }

  stopAll() {
    this.currentPlaying.forEach((playing) => {
      playing.tracker.kill();
    });
    this.currentPlaying = [];
  }

  playInfinity(track) {
    const canceller = setInterval(() => this._play(track), this.tracksInfo[track].duration);
    this._play(track, canceller);
  }
}

console.log(Audio.instance);

Audio.instance.playInfinity(Audio.MAINMENU);

setTimeout(() => {
  Audio.instance.stopPlaying(Audio.MAINMENU);
}, 10000);
