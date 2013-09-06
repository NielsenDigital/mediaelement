/*!
 * Adds Internationalization and localization to objects.
 *
 * What is the concept beyond i18n?
 *   http://en.wikipedia.org/wiki/Internationalization_and_localization
 *
 *
 * This file both i18n methods and locale which is used to translate
 * strings into other languages.
 *
 * Default translations are not available, you have to add them
 * through locale objects which are named exactly as the langcode
 * they stand for. The default language is always english (en).
 *
 *
 * Wrapper built to be able to attach the i18n object to
 * other objects without changing more than one line.
 *
 *
 * LICENSE:
 *
 *   The i18n file uses methods from the Drupal project (drupal.js):
 *     - i18n.methods.t() (modified)
 *     - i18n.methods.checkPlain() (full copy)
 *     - i18n.methods.formatString() (full copy)
 *
 *   The Drupal project is (like mediaelementjs) licensed under GPLv2.
 *    - http://drupal.org/licensing/faq/#q1
 *    - https://github.com/johndyer/mediaelement
 *    - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 *
 *
 * @author
 *   Tim Latz (latz.tim@gmail.com)
 *
 * @see
 *   me-i18n-locale.js
 *
 * @params
 *  - context - document, iframe ..
 *  - exports - CommonJS, window ..
 *
 */(function(e,t,n){"use strict";var r={locale:{language:"",strings:{}},methods:{}};r.locale.getLanguage=function(){return r.locale.language||navigator.language};typeof mejsL10n!="undefined"&&(r.locale.language=mejsL10n.language);r.locale.INIT_LANGUAGE=r.locale.getLanguage();r.methods.checkPlain=function(e){var t,n,r={"&":"&amp;",'"':"&quot;","<":"&lt;",">":"&gt;"};e=String(e);for(t in r)if(r.hasOwnProperty(t)){n=new RegExp(t,"g");e=e.replace(n,r[t])}return e};r.methods.formatString=function(e,t){for(var n in t){switch(n.charAt(0)){case"@":t[n]=r.methods.checkPlain(t[n]);break;case"!":break;case"%":default:t[n]='<em class="placeholder">'+r.methods.checkPlain(t[n])+"</em>"}e=e.replace(n,t[n])}return e};r.methods.t=function(e,t,n){r.locale.strings&&r.locale.strings[n.context]&&r.locale.strings[n.context][e]&&(e=r.locale.strings[n.context][e]);t&&(e=r.methods.formatString(e,t));return e};r.t=function(e,t,n){if(typeof e=="string"&&e.length>0){var i=r.locale.getLanguage();n=n||{context:i};return r.methods.t(e,t,n)}throw{name:"InvalidArgumentException",message:"First argument is either not a string or empty."}};t.i18n=r})(document,mejs);(function(e,t){"use strict";typeof mejsL10n!="undefined"&&(e[mejsL10n.language]=mejsL10n.strings)})(mejs.i18n.locale.strings);