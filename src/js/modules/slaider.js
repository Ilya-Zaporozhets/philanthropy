$(document).ready(function () {
  $('.slider').slick({
    arrows: true,
    dots: false,
    adaptiveHeight: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    speed: 1000,
    easing: 'ease',
    infinite: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnFocus: true,
    pauseOnHover: true,
    draggable: true,
    swipe: true,
    touchThreshold: 2,
    touchMove: false,
    waitForAnimate: true,
  });
});
