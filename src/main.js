import { initBurgerMenu } from "./js/burger.js";
import { initSlider } from "./js/slider.js";
import { maskPhone, validateForm } from "./js/form.js";
import { initYandexMap } from "./js/map.js";

document.addEventListener("DOMContentLoaded", () => {
  initYandexMap();
  initBurgerMenu();
  initSlider();
  maskPhone('input[name="phone"]');
  validateForm(".form__body");
});
