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
  return Boolean(target.closest('.burger') || target.closest('.top-menu__nav'));
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