import './vendor';

(function addsFocus() {
    var elementParent = $('.input-phone').parent('.form-item');
    $('.input-phone').focus(function () {
        elementParent.addClass('focus');
    });

    $('.input-phone').blur(function () {
        elementParent.removeClass('focus');
    });
})();

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
}
