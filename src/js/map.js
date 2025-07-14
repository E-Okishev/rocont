import mapIcon from '../image/mapIcon.svg';

export function initYandexMap() {
  ymaps.ready(function () {
    const myMap = new ymaps.Map('app', {
      center: [59.994282, 30.437958],
      zoom: 17,
      controls: ['zoomControl'],
    });

    const myPlacemark = new ymaps.Placemark(
      [59.994282, 30.437958],
      {
        balloonContent: 'Мы здесь!',
      },
      {
        iconLayout: 'default#image',
        iconImageHref: mapIcon,
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -40],
      }
    );

    myMap.geoObjects.add(myPlacemark);
  });
}
