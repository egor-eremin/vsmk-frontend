import './vendor';

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
    (function addPhoneMask() {
        $('.input-phone').mask('+7 (000) 000-00-00', {placeholder: "+7 (___) ___-__-__"});
    })();
    (function validationInputForm() {
        validationForm('.product-selection', '.form-item-wrapper', '.good-text');
    })();

});

function validationForm(formInit, formWrapper, textGood, textBad) {
    $(formInit).validate({
        invalidHandler: function (e, v) {
            v.errorContext.addClass('animate');
        },
        submitHandler: function(form) {
            $(form).removeClass('animate');
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
                    console.log('Упс... Что-то пошло по пизде!');
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
}
