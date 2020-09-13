// Setting
const DURATION_LONG = 1000,
  DURATION_MEDIUM = 800,
  DURATION_REGULAR = 500,
  DURATION_SHORT = 300,
  DURATION_MICRO = 200,
  DURATION_SLIDE = 1300;

const RESPONSE_WIDTH = 768,
  MAP_WIDTH = 500;
MAP_HEIGHT = 400;

// Navigation

const pickers = document.querySelectorAll('.nav__picker'),
  headers = document.querySelectorAll('.nav__header'),
  nav = document.querySelector('.nav'),
  sections = document.querySelectorAll('section'),
  back = document.querySelector('.back'),
  wave = document.querySelector('.nav__wave');

let state;

function handlePick(event) {
  event.preventDefault();

  state = event.target.dataset.id;
  const target = document.querySelector(`.${event.target.dataset.id}`);

  sections.forEach((section) => {
    if (section !== target) {
      section.style.display = 'none';
    } else {
      section.style.display = 'block';
    }
  });

  wave.classList.remove('down_100vh');

  setTimeout(function () {
    headers.forEach((header) => {
      header.classList.add('up_150vh');
    });
  }, DURATION_SHORT);

  setTimeout(function () {
    pickers.forEach((picker) => {
      picker.classList.add('up_150vh');
    });
  }, DURATION_REGULAR);

  setTimeout(function () {
    wave.classList.add('up_100vh');
    sections.forEach((section) => {
      section.classList.add('up_100vh');
    });
  }, DURATION_MEDIUM);

  back.classList.add('back--active');

  nav.style.zIndex = '-1';
}

function handleBack(event) {
  event.preventDefault();
  const target = document.querySelector(`.${state}`);

  sections.forEach((section) => {
    section.style.display = 'none';
  });

  nav.style.zIndex = '0';
  wave.classList.remove('up_100vh');

  setTimeout(function () {
    pickers.forEach((picker) => {
      picker.classList.remove('up_150vh');
    });
  }, DURATION_SHORT);

  setTimeout(function () {
    headers.forEach((header) => {
      header.classList.remove('up_150vh');
    });
  }, DURATION_REGULAR);

  setTimeout(function () {
    wave.classList.add('down_100vh');
    sections.forEach((section) => {
      section.classList.remove('up_100vh');
    });
  }, DURATION_MEDIUM);

  back.classList.remove('back--active');
}

// About > Rotation on Scrolling

const balls = document.querySelectorAll('.container>img');

function handleScrolling(event) {
  event.preventDefault();
  balls.forEach((ball) => {
    ball.style.transform = `rotate(${window.pageYOffset / 6}deg)`;
  });
}

// init

function init() {
  window.addEventListener('scroll', handleScrolling);
  pickers.forEach((picker) => {
    picker.addEventListener('click', handlePick);
  });
  back.addEventListener('click', handleBack);
}

init();
