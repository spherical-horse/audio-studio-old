const burger = document.getElementById('burgerIcon');
const burgerMenu = document.getElementById('topMenu');
const burgerLines = document.querySelectorAll('.burger__line');
const topMenuItems = document.querySelectorAll('.top-menu__li');

const transformBurger = () => {
  burgerLines.forEach(line => {
    line.classList.toggle('open');
  });
}

const closeBurgerMenu = () => {
  burgerLines.forEach(line => {
    line.classList.remove('open');
  });
  burgerMenu.classList.remove('open');
  document.body.classList.remove('scroll-lock');
};

burger.addEventListener('click', () => {
  burgerMenu.classList.toggle('open');
  document.body.classList.toggle('scroll-lock');
  transformBurger();
});

const isInsideBurgerMenu = (target) => {
  return Boolean(target.closest('.burger') || target.closest('.top-menu__wrapper'));
};

document.addEventListener('click', (e) => {
  if (!isInsideBurgerMenu(e.target)) {
    closeBurgerMenu();
  }
});

topMenuItems.forEach(menuItem => {
  menuItem.addEventListener('click', () => {
    closeBurgerMenu();
  });
});

class AudioPlayer {

  constructor(
    playerSelector = '#playerWrapper',
    trackSelector = '[data-player]',
    volumeSelector = '.playlist-wrapper__volume-control',
    muteButtonSelector = '.playlist-wrapper__mute',
    playImgSrc = './assets/img/play.svg',
    pauseImgSrc = './assets/img/pause.svg',
    volumeImgSrc = './assets/img/volume.svg',
    muteImgSrc = './assets/img/mute.svg',
    playImgWidthAndHeight = 40,
  ) {
    this.isPlaying = false;
    this.volume_ = 0.2;
    this.currentPlayingElement = null;
    this.playerWrapper = document.querySelector(playerSelector);
    this.trackWrappers = this.playerWrapper.querySelectorAll(trackSelector);
    this.volumeElement = this.playerWrapper.querySelector(volumeSelector);
    this.volumeElement.value = this.volume;
    this.muteButton = this.playerWrapper.querySelector(muteButtonSelector);
    this.playImgSrc = playImgSrc;
    this.pauseImgSrc = pauseImgSrc;
    this.volumeImgSrc = volumeImgSrc;
    this.muteImgSrc = muteImgSrc;
    this.playImgWidthAndHeight = playImgWidthAndHeight;
    this.currentButton = null;
    this.lastVolume = this.volume;
    this.init();
  }

  init() {
    this.initPlayButtonsEventListeners();
    this.initVolumeEventListeners();
  }

  initPlayButtonsEventListeners() {
    this.trackWrappers.forEach(wrapper => {
      const audioElement = wrapper.querySelector('audio');
      const buttonElement = wrapper.querySelector('button');
      const nameElement = wrapper.querySelector('.music');
      nameElement.addEventListener('click', ({ target }) => {
        const currentButton = this.currentButton;
        this.currentButton = target.parentElement.querySelector('button');
        if (!this.isPlaying) {
          this.play(audioElement);
        } else {
          const currentPlayingElement = this.currentPlayingElement;
          this.stop();
          if (currentPlayingElement !== audioElement) {
            this.setButtonPlay(currentButton);
            this.play(audioElement);
          }
        }
      });
      buttonElement.addEventListener('click', ({ target }) => {
        const currentButton = this.currentButton;
        this.currentButton = target.closest('button');
        if (!this.isPlaying) {
          this.play(audioElement);
        } else {
          const currentPlayingElement = this.currentPlayingElement;
          this.stop();
          if (currentPlayingElement !== audioElement) {
            this.setButtonPlay(currentButton);
            this.play(audioElement);
          }
        }
      });
    });
  }

  set volume(value) {
    this.volume_ = value;
    this.volumeElement.value = value;
    if (this.currentPlayingElement) {
      this.currentPlayingElement.volume = value;
    }
    if (+value === 0) {
      this.setVolumeButtonMuted();
    } else {
      this.setVolumeButtonUnMuted()
    }
  }

  get volume() {
    return this.volume_;
  }

  setVolumeButtonMuted() {
    const img = this.muteButton.querySelector('img');
    img.src = this.muteImgSrc;
  }

  setVolumeButtonUnMuted() {
    const img = this.muteButton.querySelector('img');
    img.src = this.volumeImgSrc;
  }

  initVolumeEventListeners() {
    this.volumeElement.addEventListener('input', ({ target }) => {
      this.volume = target.value;
      this.lastVolume = target.value;
      if (this.currentPlayingElement) {
        this.currentPlayingElement.volume = this.volume;
      }
    });
    this.muteButton.addEventListener('click', () => {
      if (+this.volume === 0) {
        this.volume = this.lastVolume;
      } else {
        this.volume = 0;
      }
    });
  }

  play(audioElement) {
    this.currentPlayingElement = audioElement;
    this.currentPlayingElement.volume = this.volume;
    this.currentPlayingElement.play();
    this.isPlaying = true;
    this.currentPlayingElement.addEventListener('ended', this.stop);
    this.setCurrentButtonStop();
  }

  stop = () => {
    this.currentPlayingElement.pause();
    this.currentPlayingElement.removeEventListener('ended', this.stop);
    this.currentPlayingElement.currentTime = 0;
    this.currentPlayingElement = null;
    this.isPlaying = false;
    this.setCurrentButtonPlay();
  }

  setButtonImg(button, src, alt) {
    const img = button.querySelector('img');
    img.src = src;
    img.alt = alt;
  }

  setButtonPlay(button) {
    this.setButtonImg(button, this.playImgSrc, 'play');
  }

  setButtonStop(button) {
    this.setButtonImg(button, this.pauseImgSrc, 'stop');
  }

  setCurrentButtonPlay() {
    this.setButtonPlay(this.currentButton);
  }

  setCurrentButtonStop() {
    this.setButtonStop(this.currentButton);
  }
}

const player = document.querySelector('#playerWrapper');
if (player) {
  new AudioPlayer();
}

// class ExtendedAudioPlayer extends AudioPlayer {
//   constructor(options) {
//     super(options.playerSelector);
//     // this.isPlaying = false;
//     this.options = { ...options };
//     this.volume_ = this.options.volume;
//     // this.currentPlayingElement = null;
//     // this.player = document.querySelector(this.options.playerSelector);
//     this.trackWrappers = this.playerWrapper.querySelectorAll(this.options.trackSelector);
//     this.volumeElement = this.playerWrapper.querySelector(this.options.volumeSelector);
//     // this.volumeElement.value = this.volume;
//     this.muteButton = this.playerWrapper.querySelector(this.options.muteButtonSelector);
//     this.currentButton = null;
//     this.currentTime = 0;
//     this.lastVolume = this.volume;
//     this.init();
//     console.log(this);
//   }

//   init() {
//     this.initPlayButtonsEventListeners();
//   }

//   initPlayButtonsEventListeners() {
//     this.trackWrappers.forEach(wrapper => {
//       const beforeAudioElement = wrapper.querySelector(this.options.beforeSelector);
//       const afterAudioElement = wrapper.querySelector(this.options.afterSelector);
//       const nameElement = wrapper.querySelector(this.options.nameSelector);
//       nameElement.addEventListener('click', ({ target }) => {
//         const currentButton = this.currentButton;
//         this.currentButton = target.parentElement.parentElement.querySelector('.button');
//         if (!this.isPlaying) {
//           if (this.isBeforeInputChecked(wrapper)) {
//             this.play(beforeAudioElement);
//           } else {
//             this.play(afterAudioElement);
//           }
//         } else {
//           const currentPlayyingElement = this.currentPlayingElement;

//         }
//       });
//       this.isBeforeInputChecked(wrapper);
//     });
//   }

//   isBeforeInputChecked(wrapper) {
//     const beforeInput = wrapper.querySelector('input[data-before]');
//     if (beforeInput && beforeInput.checked) {
//       return true;
//     }
//     return false;
//   }

//   play(audioElement) {
//     this.currentPlayingElement = audioElement;
//     this.currentPlayingElement.volume = this.volume;
//     this.currentPlayingElement.currentTime = this.currentTime;
//     console.log(this.currentPlayingElement);
//     this.currentPlayingElement.play();
//     this.isPlaying = true;
//     this.currentPlayingElement.addEventListener('ended', this.stop);
//     this.setCurrentButtonStop();
//   }

//   stop = () => {
//     this.currentPlayingElement.pause();
//     this.currentPlayingElement.removeEventListener('ended', this.stop);
//     this.currentPlayingElement.currentTime = 0;
//     this.currentPlayingElement = null;
//     this.isPlaying = false;
//     this.setCurrentButtonPlay();
//   };

// }

// class PlayButton {

//   constructor(element, options) {
//     this.options = options;
//     this.element = element;
//     this.img = this.element.querySelector('img');
//     this.init();
//   }

//   init(){
//     this
//   }

// }

class Track {

  constructor(element, options, n) {
    this.options = options;
    this.element = element;
    this.n = n;
    this.name = element.querySelector(this.options.nameSelector);
    this.playButtonImg = this.element.querySelector('img');
    this.currentPlayingElement = null;
    this.isPlaying = false;
    this.init();
  }

  init() {
    this.beforeRadioButton.id = `audio-${this.n}-before`;
    this.afterRadioButton.id = `audio-${this.n}-after`;
    this.beforeLabel.htmlFor = `audio-${this.n}-before`;
    this.afterLabel.htmlFor = `audio-${this.n}-after`;
    this.beforeRadioButton.name = `audio-${this.n}-name`;
    this.afterRadioButton.name = `audio-${this.n}-name`;
    this.beforeRadioButton.setAttribute('checked', 'checked');
    this.afterRadioButton.removeAttribute('checked');
  }

  set volume(value) {
    this.currentPlayingElement.volume = value;
  }

  get volume() {
    return this.currentPlayingElement ? this.currentPlayingElement.volume : this.options.volume;
  }

  get beforeLabel() {
    return this.element.querySelector(this.options.beforeLabelSelector);
  }

  get afterLabel() {
    return this.element.querySelector(this.options.afterLabelSelector);
  }

  get beforeAudio() {
    return this.element.querySelector(this.options.beforeSelector);
  }

  get afterAudio() {
    return this.element.querySelector(this.options.afterSelector);
  }

  get beforeRadioButton() {
    return this.element.querySelector(this.options.beforeRadioSelector);
  }

  get afterRadioButton() {
    return this.element.querySelector(this.options.afterRadioSelector);
  }

  get isBefore() {
    return Boolean(this.beforeRadioButton.checked);
  }

  get currentTime() {
    return this.currentPlayingElement ? this.currentPlayingElement.currentTime : 0;
  }

  play(element, volume, time) {
    element.currentTime = time;
    element.volume = volume;
    element.play();
    this.currentPlayingElement = element;
    this.isPlaying = true;
    this.setButtonStop();
    this.currentPlayingElement.addEventListener('ended', this.stop);
  }

  pause = () => {
    this.currentPlayingElement.pause();
    this.isPlaying = false;
    this.setButtonPlay();
  };

  stop = () => {
    if (this.currentPlayingElement) {
      this.currentPlayingElement.pause();
      this.currentPlayingElement.currentTime = 0;
      this.isPlaying = false;
      this.setButtonPlay();
      this.currentPlayingElement.removeEventListener('ended', this.stop);
    }
  };

  setButtonPlay() {
    this.playButtonImg.src = this.options.playImgSrc;
  }

  setButtonStop() {
    this.playButtonImg.src = this.options.pauseImgSrc;
  }

  playBefore(volume, time) {
    this.play(this.beforeAudio, volume, time);
  }

  playAfter(volume, time) {
    this.play(this.afterAudio, volume, time);
  }

  setVolume(value) {
    if (this.currentPlayingElement) {
      this.currentPlayingElement.volume = value;
    }
  }

}

class ExtendedPlayer {

  constructor(options) {
    this.options = options;
    this.player = document.querySelector(this.options.playerSelector);
    this.tracks = [];
    this.volume_ = this.options.volume;
    this.volume = this.options.volume;
    this.lastVolume = this.volume;
    this.currentPlayingTrack = null;
    this.init();
  }

  init() {
    this.tracks = [...this.player.querySelectorAll(this.options.trackSelector)]
      .map((element, idx) => new Track(element, this.options, idx));
    this.initTrackEventListeners();
    this.initVolumeEventListeners();
  }

  initTrackEventListeners() {
    this.tracks.forEach((track) => {
      track.playButtonImg.addEventListener('click', () => {
        this.onClickPlay(track, track.currentTime);
      });
      track.name.addEventListener('click', () => {
        this.onClickPlay(track, track.currentTime);
      });
      track.beforeRadioButton.addEventListener('change', () => {
        const currentTime = track.currentTime;
        const currentTrack = this.currentPlayingTrack;
        track.stop();
        if (currentTrack && currentTrack.n === track.n) {
          track.playBefore(this.volume, currentTime);
        }
      });
      track.afterRadioButton.addEventListener('change', () => {
        const currentTime = track.currentTime;
        const currentTrack = this.currentPlayingTrack;
        track.stop();
        if (currentTrack && currentTrack.n === track.n) {
          track.playAfter(this.volume, currentTime);
        }
      });
    });
  }

  initVolumeEventListeners() {
    this.volumeElement.addEventListener('input', ({ target }) => {
      this.volume = target.value;
      this.lastVolume = target.value;
      if (this.currentPlayingTrack) {
        this.currentPlayingTrack.volume = this.volume;
      }
    });
  }

  get volume() {
    return this.volume_;
  }

  set volume(value) {
    this.volume_ = value;
    this.volumeElement.value = value;
    if (+value === 0) {
      this.setVolumeButtonMuted();
    } else {
      this.setVolumeButtonUnMuted();
    }
  }

  get volumeElement() {
    return this.player.querySelector(this.options.volumeSelector)
  }

  get muteButtonImg() {
    return this.player.querySelector(this.options.muteButtonSelector).querySelector('img');
  }

  setVolumeButtonMuted() {

    this.muteButtonImg.src = this.options.muteImgSrc;
  }

  setVolumeButtonUnMuted() {
    this.muteButtonImg.src = this.options.volumeImgSrc;
  }

  onClickPlay = (track, time) => {
    if (track.isPlaying) {
      const currentPlayingTrack = this.currentPlayingTrack;
      // track.stop();
      track.pause();
    } else {
      if (this.currentPlayingTrack) {
        if (track.n !== this.currentPlayingTrack.n) {
          // this.currentPlayingTrack.stop();
          this.currentPlayingTrack.pause();
        }
      }
      this.currentPlayingTrack = track;
      if (track.isBefore) {
        track.playBefore(this.volume, time);
      } else {
        track.playAfter(this.volume, time);
      }
    }
  };

}

const options = {
  volume: 0.2,
  playerSelector: '#extendedPlayerWrapper',
  trackSelector: '.playlist__item',
  beforeSelector: 'audio[data-before]',
  afterSelector: 'audio[data-after]',
  beforeRadioSelector: 'input[data-before]',
  afterRadioSelector: 'input[data-after]',
  beforeLabelSelector: 'label[data-before]',
  afterLabelSelector: 'label[data-after]',
  nameSelector: '.music',
  volumeSelector: '.playlist-wrapper__volume-control',
  muteButtonSelector: '.playlist-wrapper__mute',
  playImgSrc: './assets/img/play.svg',
  pauseImgSrc: './assets/img/pause.svg',
  volumeImgSrc: './assets/img/volume.svg',
  muteImgSrc: './assets/img/mute.svg',
  playImgWidthAndHeight: 40
}

new ExtendedPlayer(options);
