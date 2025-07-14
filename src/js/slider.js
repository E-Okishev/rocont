export function initSlider() {
  new Swiper('.mySwiper', {
    loop: true,
    spaceBetween: 8,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      350: {
        slidesPerView: 1.2,
      },
      640: {
        slidesPerView: 2,
      },
      800: {
        slidesPerView: 2.5,
      },
      960: {
        slidesPerView: 2.8,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  });
}