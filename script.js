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
    playerSelector = '.playerWrapper',
    trackSelector = '[data-player]',
    volumeSelector = '.playlist-wrapper__volume-control',
    muteButtonSelector = '.playlist-wrapper__mute',
    playImgSrc = '/assets/img/play.svg',
    pauseImgSrc = '/assets/img/pause.svg',
    volumeImgSrc = '/assets/img/volume.svg',
    muteImgSrc = '/assets/img/mute.svg',
    playImgWidthAndHeight = 40,
  ) {
    this.isPlaying = false;
    this.volume_ = 0.2;
    this.currentPlayingElement = null;
    this.playerWrapper = document.querySelector(playerSelector);
    this.trackWrappers = document.querySelectorAll(trackSelector);
    this.volumeElement = document.querySelector(volumeSelector);
    this.volumeElement.value = this.volume;
    this.muteButton = document.querySelector(muteButtonSelector);
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

new AudioPlayer();