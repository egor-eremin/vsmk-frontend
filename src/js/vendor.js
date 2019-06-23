import '@babel/polyfill';
import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import 'jquery-mask-plugin';
import 'magnific-popup';
import 'jquery-validation';
import 'focus-visible';
import objectFitImages from 'object-fit-images';

objectFitImages();

svg4everybody();

window.$ = $;
window.jQuery = $;

require('ninelines-ua-parser');
