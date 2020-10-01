'use strict';
// Setting
const DURATION_LONG = 1000,
  DURATION_MEDIUM = 800,
  DURATION_REGULAR = 500,
  DURATION_SHORT = 300,
  DURATION_MICRO = 200,
  DURATION_SLIDE = 1300;

const RESPONSE_WIDTH = 768,
  MAP_WIDTH = 500,
  MAP_HEIGHT = 400;

// Navigation

const pickers = document.querySelectorAll('.nav__picker');
const navSections = document.querySelectorAll('.nav__section');

const nav = document.querySelector('.nav');
const sections = document.querySelectorAll('section');
const back = document.querySelector('.back');
const wave = document.querySelector('.nav__wave');
const navContent = document.querySelector('.nav__content');
let state;

pickers.forEach((picker) => {
  picker.addEventListener('click', (event) => {
    event.preventDefault();
    state = event.target.dataset.id || event.target.parentNode.dataset.id;
    console.log(state);

    const target = document.querySelector(`.${state}`);

    console.log(target);
    // 클릭한 section을 표시함
    sections.forEach((section) => {
      if (section !== target) {
        section.style.display = 'none';
      } else {
        section.style.display = 'block';
      }
    });
    console.log(wave.classList);
    // 물결효과 시작
    wave.classList.remove('down_100vh');
    console.log(wave.classList);
    setTimeout(() => {
      navContent.classList.add('up_150vh');
    }, DURATION_MICRO);
    // 시간을 두고
    setTimeout(() => {
      navSections.forEach((navSection) => {
        navSection.classList.add('up_150vh');
      });
    }, DURATION_SHORT);

    // 시간을 두고 wave 올리면서 section 자체를 올림
    setTimeout(function () {
      wave.classList.add('up_100vh');
      sections.forEach((section) => {
        section.classList.add('up_100vh');
      });
    }, DURATION_LONG);
    // back버튼을 활성화 함
    back.classList.add('back--active');
    // nav의 zIndex는 내림
    nav.style.zIndex = '-1';
  });
});

function handleBack(event) {
  event.preventDefault();
  back.classList.remove('back--active');
  wave.classList.remove('up_100vh');
  setTimeout(function () {
    sections.forEach((section) => {
      section.classList.remove('up_100vh');
    });
  }, DURATION_MICRO);

  setTimeout(() => {
    navSections.forEach((navSection) => {
      navSection.classList.remove('up_150vh');
    });
  }, DURATION_SHORT);

  setTimeout(function () {
    wave.classList.add('down_100vh');
  }, DURATION_MEDIUM);

  setTimeout(() => {
    navContent.classList.remove('up_150vh');
  }, DURATION_LONG);

  sections.forEach((section) => {
    section.style.display = 'none';
  });

  nav.style.zIndex = '0';
}

back.addEventListener('click', handleBack);
