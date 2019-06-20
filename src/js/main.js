import './vendor';
require ('./vendor/jquery.inputmask.min');
require ('./vendor/jquery.viewportchecker.min');

$(document).ready(function () {
    (function addsFocus() {
        var elementParent = $('.input-phone').parent('.form-item');
        $('.input-phone').focus(function () {
            elementParent.addClass('focus');

        });

        $('.input-phone').blur(function () {
            elementParent.removeClass('focus');
        });
    })();
    (function addNumberAfterFocus() {
        $('.user-phone').on('focus', function () {
            if (!$(this).val()) {
                $(this).val('+7 (');
            }
        });
        $('.user-phone').on('blur', function () {
            if ($(this).val().length <= 4) {
                $(this).val('');
            }
        });
    })();
    (function addPhoneMask() {
		$('.user-phone').inputmask("+7 (999) 999-99-99", {
			placeholder: "_",
            showMaskOnFocus: false,
		})
    })();
    (function validationInputForm() {
        validationForm('.product-selection', '.form-item-wrapper', '.good-text-wrapper', true);
    })();
    (function goPrev() {
        $('.prev').on('click', function (e) {
            e.preventDefault();

            $('.good-text-wrapper').removeClass('show-information');
            $('.form-item-wrapper').removeClass('hide-information');
            $('.input-phone').focus();
        });
    })();
    (function mapInit() {
        if ($('#map-init').length > 0) {

            ymaps.ready(init);

            function init() {
                var myMap = new ymaps.Map('map-init', {
                        center: [52.278407791991356,104.21523449667427],
                        zoom: 16,
                        controls: []
                    }, {
                        suppressMapOpenBlock: true,
                        searchControlProvider: 'yandex#search'
                    }),

                    myPlacemark = window.myPlacemark = new ymaps.Placemark([52.278407791991356,104.21523449667427], {
                    }, {
                        balloonShadow: false,
                        iconLayout: 'default#image',
                        iconImageHref: './images/point.svg',
                        iconImageSize: [29, 48],
                        iconImageOffset: [-14, -48]
                    });


                myMap.geoObjects.add(myPlacemark);
                myMap.behaviors.disable('scrollZoom');


                // media ('all and (min-width: 1025px)', function () {
                //     myMap.setCenter([52.278407791991356,104.21523449667427]);
                // })
                // media ('all and (max-width: 1024px)', function () {
                //     myMap.setCenter([52.278407791991356,104.21523449667427]);
                // })

            }
        }
    })();
    (function activateViewportChecker() {
        $('.viewport-checker-block').viewportChecker({
            classToRemove: 'hide-block',
            classToAdd: 'animation',
        });
        $('.product-selection:not(.other-callback)').viewportChecker({
            classToAdd: 'animateShake',
            offset: '40%',
            removeClassAfterAnimation: true,
            // callbackFunction: function () {
            //     $('.product-selection:not(.other-callback)').addClass('');
            // },
        });
    })();
    (function initCallbackForm() {
        $('.callback-link').magnificPopup({
            type: 'inline',
            focus: '.callback__phone-input',
            mainClass: 'callback-form-wrapper',
			removalDelay: 250,
            callbacks: {
                open: function () {
                    $('html').css('overflow','hidden');
                },
                close: function () {
                    $('html').removeAttr('style');
                    if ($('.form-answer').hasClass('show-information')) {
                      $('.form-input').val('');
                      $('.callback-form__wrapper').removeClass('hide-information');
                      $('.form-answer').removeClass('show-information');
                  };
                    if ($('.main-header').hasClass('open-mobile-menu')) {
                      closeMobileMenu();
                  };
              }
            },
        });
    })();
    (function validateCallbackForm() {
        validationForm('.callback','.callback-form__wrapper','.form-answer', true);
    })();
    (function fixedMenu() {
        var coordinateMenu = $('.header-wrapper').offset().top;
        $(window).scroll(function () {
            if($(this).scrollTop() > coordinateMenu) {
                $('.header-wrapper').addClass('fixed');
                $('.fake-menu').addClass('show');
            } else {
                $('.header-wrapper').removeClass('fixed');
                $('.fake-menu').removeClass('show');
        }
    });
    })();
    (function burgerMobileInit() {
        var windowCoordinate;

        $('.burger-mobile').on('click', function () {
           if (!$(this).hasClass('active')) {
               windowCoordinate = $(window).scrollTop();
               openMobileMenu();
               // calcVH();
           } else {
               closeMobileMenu();
               $(window).scrollTop(windowCoordinate);
           }
        });
    })();
    (function calculationHeight() {
        // window.addEventListener('onorientationchange', calcVH, true);
        // window.addEventListener('resize', calcVH, true);
    })();

    media('(min-width: 780px)', function () {
        closeMobileMenu();
    });
});


function openMobileMenu() {
    $('.burger-mobile').addClass('active');
    $('.main-header').addClass('open-mobile-menu');
    $('html').addClass('no-scroll');
}
function closeMobileMenu() {
    $('.burger-mobile').removeClass('active');
    $('.main-header').removeClass('open-mobile-menu');
    $('html').removeClass('no-scroll');
    $('.header-wrapper').removeAttr('style');
}
function calcVH() {
    var vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var thisElement = document.querySelector(".open-mobile-menu .header-wrapper");
    if (thisElement) {
        thisElement.setAttribute("style", "height:" + vH + "px;");
    }
};
function validationForm(formInit, formWrapper, textGood, animation) {
    $.validator.addMethod("minlenghtphone", function (value, element) {

            return value.replace(/\D+/g, '').length > 10;
        },
        "");
    $(formInit).validate({
        rules: {
            phone:  {
                minlenghtphone: true,
            },
        },
        invalidHandler: function (e, v) {
            if (animation) {
                var animationForm = v.errorContext;
                animationForm.addClass('animation');
                setTimeout(function () {
                    animationForm.removeClass('animation');
                }, 400);
            }
        },
        submitHandler: function(form) {
            var inputPhone = $(form).find('.user-phone');
            var inputValue = inputPhone.val();

            $(textGood).find('.current-phone').text(inputValue);
            $.ajax({
                type: $(form).attr('method'),
                url: $(form).attr('action'),
                data: new FormData(form),

                cache: false,
                contentType: false,
                processData: false,

                dataType: 'text',
                success: function () {
                        $(formWrapper).addClass('hide-information');
                        $(textGood).addClass('show-information');
                },
                error: function() {
                    console.log('Упс... Что-то пошло не так!');
                }
            });
            return false;
        },
    });
};
function media(mediaQueryString, action){
    'use strict';
    var handleMatchMedia = function (mediaQuery) {
        if (mediaQuery.matches) { //Попадает в запроc
            if (action  && typeof(action) === 'function') {
                action();
            }
        }
    };
    var mql = window.matchMedia(mediaQueryString); //стандартный медиазапрос для смены режима просмотра
    handleMatchMedia(mql);
    mql.addListener(handleMatchMedia);
};
