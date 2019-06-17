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
        // $('.user-phone').mask('+7 (000) 000-00-00', {
        //     placeholder: "+7 (___) ___-__-__",
        //     });
		$('.user-phone').inputmask("+7 (999) 999-99-99", {
			placeholder: "_",
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
            // repeat: true,
            offset: '40%',
        });
    })();
    (function initCallbackForm() {
        $('.callback-link').magnificPopup({
            type: 'inline',
            focus: '.callback__phone-input',
            mainClass: 'callback-form-wrapper',
			removalDelay: 250,
            callbacks: {
              close: function () {
                  if ($('.form-answer').hasClass('show-information')) {
                      $('.form-input').val('');
                      $('.callback-form__wrapper').removeClass('hide-information');
                      $('.form-answer').removeClass('show-information');
                  }
              }
            },
        });
    })();
    (function validateCallbackForm() {
        validationForm('.callback','.callback-form__wrapper','.form-answer', true);
    })();
    (function fixedMenu() {
        var coordinateMenu = $('.header-wrapper').offset().top;
        // console.log(coordinateMenu);
        $(window).on('scroll', function () {
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
        $('.burger-mobile').on('click', function () {
           if (!$(this).hasClass('active')) {
               $(this).addClass('active');
               $('.main-header').addClass('open-mobile-menu');
           } else {
               $(this).removeClass('active');
               $('.main-header').removeClass('open-mobile-menu');
           }
        });
    })();
});

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
