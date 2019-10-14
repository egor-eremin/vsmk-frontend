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
            // showMaskOnFocus: false,
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
                    var windowCoordinate = closeMobileMenu();

                    $('html').css({'overflow':'hidden', 'position': 'fixed', 'top': '' + (-windowCoordinate) + ''});
                    $('.callback__phone-input').focus();
                    if ($('.main-header').hasClass('open-mobile-menu')) {
                        $('.mfp-wrap.callback-form-wrapper').css('top', '' + (-windowCoordinate) + 'px');
                        $(window).scrollTop(-windowCoordinate);
                    };
                },
                close: function () {
                    var htmlCoordinate = $('html').css('top');
                    var thisForm = this.items["0"].src;

                    $('html').removeAttr('style');
                    $(window).scrollTop(-htmlCoordinate);
                    if ($('' + thisForm + ' .form-answer').hasClass('show-information')) {
                        $('' + thisForm + ' .form-input').val('');
                      $('' + thisForm + ' .callback-form__wrapper').removeClass('hide-information');
                      $('' + thisForm + ' .form-answer').removeClass('show-information');
                  };

              }
            },
        });
    })();
    (function validateCallbackForm() {
        validationForm('#callback-form','#callback-form .callback-form__wrapper','#callback-form .form-answer', true);
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
               openMobileMenu(windowCoordinate);
               // calcVH();
           } else {
               windowCoordinate = closeMobileMenu();
               $(window).scrollTop(-windowCoordinate);
           }
        });
    })();
    (function addedTabs() {
        addTabs('.constructor-tabbed');
    })();
    (function openInfo() {
        $('.info-icon').on('click', function () {
            var thisWrapper = $(this).next('.info-content-wrapper');

            if (!thisWrapper.hasClass('active')) {
                $('.info-content-wrapper').removeClass('active');
                $('.info-content-wrapper').fadeOut(300);
                thisWrapper.addClass('active');
                thisWrapper.fadeIn(300);
            } else {
                thisWrapper.removeClass('active');
                thisWrapper.fadeOut(300);
            }

        });
    })();
    (function closeInfo() {
        $('.button-close-info').on('click', function () {
           $(this).parent('.info-content-wrapper').fadeOut(300);
        });
        $(document).mouseup(function (e) {
            var infoContainer = $(".info-content-wrapper");
            var infoIcon = $('.info-icon');
            if (infoContainer.has(e.target).length === 0 && infoIcon.has(e.target).length === 0){
                infoContainer.fadeOut(300);
            }
        });
    })();
    (function initCostCalculationForm() {
        $('.btn-calculate').magnificPopup({
            type: 'inline',
            focus: '.callback__phone-input',
            mainClass: 'callback-form-wrapper',
            removalDelay: 250,
            callbacks: {
                open: function () {
                    var windowCoordinate = closeMobileMenu();

                    $('html').css({'overflow': 'hidden', 'position': 'fixed', 'top': '' + (-windowCoordinate) + ''});
                    $('.callback__phone-input').focus();
                    if ($('.main-header').hasClass('open-mobile-menu')) {
                        $('.mfp-wrap.callback-form-wrapper').css('top', '' + (-windowCoordinate) + 'px');
                        $(window).scrollTop(-windowCoordinate);
                    }
                    ;
                },
                close: function () {
                    var htmlCoordinate = $('html').css('top');
                    var thisForm = this.items["0"].src;

                    $('html').removeAttr('style');
                    $(window).scrollTop(-htmlCoordinate);
                    if ($('' + thisForm + ' .form-answer').hasClass('show-information')) {
                        $('' + thisForm + ' .form-input').val('');
                        $('' + thisForm + ' .callback-form__wrapper').removeClass('hide-information');
                        $('' + thisForm + ' .form-answer').removeClass('show-information');
                    }
                    ;

                }
            },
        })
    })();
    (function validateCostCalculationForm() {
        validationForm('#calculator-form','#calculator-form .callback-form__wrapper','#calculator-form .form-answer', true);
    })();
    (function switchedConstructorImg() {
        let constructorImages = {
            roof: {
                view: {
                    view__1: "images/home_1x.jpg",
                    view__2: "images/home_1x.jpg",
                    view__3: "images/home_1x.jpg",
                    view__4: "images/home_1x.jpg",
                    view__5: "images/home_1x.jpg",
                }
            },
            roofing: {
                material: {
                    material__1: {
                        shape: {
                            shape__1: {
                                color: {
                                    color__1: 'images/home_1x.jpg',
                                    color__2: 'images/home_1x.jpg',
                                    color__3: 'images/home_1x.jpg',
                                    color__4: 'images/home_1x.jpg',
                                    color__5: 'images/home_1x.jpg',
                                    color__6: 'images/home_1x.jpg',
                                }
                            },
                            shape__2: {
                                color: {
                                    color__1: 'images/home_1x.jpg',
                                    color__2: 'images/home_1x.jpg',
                                    color__3: 'images/home_1x.jpg',
                                    color__4: 'images/home_1x.jpg',
                                    color__5: 'images/home_1x.jpg',
                                    color__6: 'images/home_1x.jpg',
                                }
                            }
                        }
                    },
                    material__2: {
                        shape: {
                            shape__1: {
                                color: {
                                    color__1: 'images/home_1x.jpg',
                                    color__2: 'images/home_1x.jpg',
                                    color__3: 'images/home_1x.jpg',
                                    color__4: 'images/home_1x.jpg',
                                    color__5: 'images/home_1x.jpg',
                                    color__6: 'images/home_1x.jpg',
                                }
                            },
                            shape__2: {
                                color: {
                                    color__1: 'images/home_1x.jpg',
                                    color__2: 'images/home_1x.jpg',
                                    color__3: 'images/home_1x.jpg',
                                    color__4: 'images/home_1x.jpg',
                                    color__5: 'images/home_1x.jpg',
                                    color__6: 'images/home_1x.jpg',
                                }
                            }
                        }
                    }
                }
            },
            facade: {
                material: {
                    material__1: {
                        shape: {
                            shape__1: {
                                color: {
                                    color__1: "images/home_1x.jpg",
                                    color__2: "images/home_1x.jpg",
                                    color__3: "images/home_1x.jpg",
                                    color__4: "images/home_1x.jpg",
                                    color__5: "images/home_1x.jpg",
                                    color__6: "images/home_1x.jpg",
                                }
                            },
                            shape__2: {
                                color: {
                                    color__1: "images/home_1x.jpg",
                                    color__2: "images/home_1x.jpg",
                                    color__3: "images/home_1x.jpg",
                                    color__4: "images/home_1x.jpg",
                                    color__5: "images/home_1x.jpg",
                                    color__6: "images/home_1x.jpg",
                                }
                            },
                            shape__3: {
                                color: {
                                    color__1: "images/home_1x.jpg",
                                    color__2: "images/home_1x.jpg",
                                    color__3: "images/home_1x.jpg",
                                    color__4: "images/home_1x.jpg",
                                    color__5: "images/home_1x.jpg",
                                    color__6: "images/home_1x.jpg",
                                }
                            },
                        }
                    },
                    material__2: {
                        shape: {
                            shape__1: {
                                color: {
                                    color__1: "images/home_1x.jpg",
                                    color__2: "images/home_1x.jpg",
                                    color__3: "images/home_1x.jpg",
                                    color__4: "images/home_1x.jpg",
                                    color__5: "images/home_1x.jpg",
                                    color__6: "images/home_1x.jpg",
                                }
                            },
                            shape__2: {
                                color: {
                                    color__1: "images/home_1x.jpg",
                                    color__2: "images/home_1x.jpg",
                                    color__3: "images/home_1x.jpg",
                                    color__4: "images/home_1x.jpg",
                                    color__5: "images/home_1x.jpg",
                                    color__6: "images/home_1x.jpg",
                                }
                            },
                            shape__3: {
                                color: {
                                    color__1: "images/home_1x.jpg",
                                    color__2: "images/home_1x.jpg",
                                    color__3: "images/home_1x.jpg",
                                    color__4: "images/home_1x.jpg",
                                    color__5: "images/home_1x.jpg",
                                    color__6: "images/home_1x.jpg",
                                }
                            },
                        }
                    }
                }
            }
        };

        $('.section-tabs-controls').each(function (index, item) {
            var tier = $(item).data('object-property');
            var thisControlsItem = $(item).find('.control-constructor');

            console.log(thisControlsItem);
            // $('.control-constructor').each(function (i, e) {
            //
            // })
        });
        switchedActiveControls();
    })();
    (function startConstructor() {
        $('.btn-start-constructor').on('click', function () {
           $('.constructor-first-page').fadeOut(300);
           setTimeout(function () {
               $('.constructor-start-page').css({opacity: 0, display: 'flex'}).animate({
                   opacity: 1
               }, 300);
           }, 300);

        });
    })();
    media('(min-width: 780px)', function () {
        closeMobileMenu();
    });
});


function switchedActiveControls() {
  $('.control-button').on('click', function () {
      var thisWrapper = $(this).parent('.control-constructor');

      if (!$(this).hasClass('active')) {
          thisWrapper.find('.control-button').removeClass('active');
          $(this).addClass('active')
      }
  });
};
function addTabs(tabbed_selector) {
    var tabbed = document.querySelector(tabbed_selector);
    var tablist = tabbed.querySelector('ul');
    var tabs = tablist.querySelectorAll('a');
    var panels = tabbed.querySelectorAll('[id^="section"]');
    var switchTab = function switchTab(oldTab, newTab) {
        newTab.focus();
        newTab.removeAttribute('tabindex');
        newTab.setAttribute('aria-selected', 'true');
        oldTab.removeAttribute('aria-selected');
        oldTab.setAttribute('tabindex', '-1');
        var index = Array.prototype.indexOf.call(tabs, newTab);
        var oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
        panels[oldIndex].hidden = true;
        panels[index].hidden = false;
    };
    tablist.setAttribute('role', 'tablist');
    Array.prototype.forEach.call(tabs, function (tab, i) {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('id', 'tab' + (i + 1));
        tab.setAttribute('tabindex', '-1');
        tab.parentNode.setAttribute('role', 'presentation');
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            var currentTab = tablist.querySelector('[aria-selected]');
            if (e.currentTarget !== currentTab) {
                switchTab(currentTab, e.currentTarget);
            }
        });
        tab.addEventListener('keydown', function (e) {
            var index = Array.prototype.indexOf.call(tabs, e.currentTarget);
            var dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? 'down' : null;
            if (dir !== null) {
                e.preventDefault();
                dir === 'down' ? panels[i].focus() : tabs[dir] ? switchTab(e.currentTarget, tabs[dir]) : void 0;
            }
        });
    });
    Array.prototype.forEach.call(panels, function (panel, i) {
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('tabindex', '-1');
        var id = panel.getAttribute('id');
        panel.setAttribute('aria-labelledby', tabs[i].id);
        panel.hidden = true;
    });
    tabs[0].removeAttribute('tabindex');
    tabs[0].setAttribute('aria-selected', 'true');
    panels[0].hidden = false;
}
function openMobileMenu(coordinateWindow) {
    $('.burger-mobile').addClass('active');
    $('.main-header').addClass('open-mobile-menu');
    $('body').addClass('no-scroll');
    $('body').css('top', '-' + coordinateWindow + 'px');
}
function closeMobileMenu() {
    var bodyTop = parseInt($('body').css('top'));

    $('.burger-mobile').removeClass('active');
    $('.main-header').removeClass('open-mobile-menu');
    $('body').removeClass('no-scroll');
    $('body').removeAttr('style');
    $('.header-wrapper').removeAttr('style');
    return bodyTop;
    $(window).scrollTop(-bodyTop);
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
