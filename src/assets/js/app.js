import $ from 'jquery';
import 'what-input';

// Foundation JS relies on a global varaible. In ES6, all imports are hoisted
// to the top of the file so if we used`import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';


$(document).foundation();

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

var currentScrollTop = 0,
	$header = $( '.header' ),
	$site = $( '.site' );
var headerHeight = $header.outerHeight();

var fixHeader = debounce( function() {

	$header.toggleClass( 'header--fixed header--hidden', ( $(window).scrollTop() < currentScrollTop ) );
	currentScrollTop = $(window).scrollTop();

	if( currentScrollTop <= 0 ) {
		$header.removeClass( 'header--fixed header--hidden');
		$site.css('margin-top', 0);
	} else if ( currentScrollTop > 20 ) {
		$header.addClass( 'header--hidden');
		$site.css('margin-top', headerHeight);
	}
	// console.log( 'fixed, ' + currentScrollTop );
	// console.log( headerHeight );
}, 100 );


jQuery(document).ready(function($) {
	$(window).on( 'scroll', fixHeader );
	$(window).on( 'resize', debounce( function() {
		headerHeight = $header.outerHeight();
	}, 150 ));
});
