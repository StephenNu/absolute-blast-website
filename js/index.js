/*!
 * loadCSS: load a CSS file asynchronously.
 * [c]2014 @scottjehl, Filament Group, Inc.
 * Licensed MIT
 * */
function loadCSS( href, before, media ){
	"use strict";
	// Arguments explained:
	// `href` is the URL for your CSS file.
	// `before` optionally defines the element we'll use as a reference for injecting our <link>
	// By default, `before` uses the first <script> element in the page.
	// However, since the order in which stylesheets are referenced matters, you might need a more specific location in your document.
	// If so, pass a different reference element to the `before` argument and it'll insert before that instead
	// note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
	var ss = window.document.createElement( "link" );
	var ref = before || window.document.getElementsByTagName( "script" )[ 0 ];
	var sheets = window.document.styleSheets;
	ss.rel = "stylesheet";
	ss.href = href;
	// temporarily, set media to something non-matching to ensure it'll fetch without blocking render
	ss.media = "only x";
	// inject link
	ref.parentNode.insertBefore( ss, ref );
	// This function sets the link's media back to `all` so that the stylesheet applies once it loads
	// It is designed to poll until document.styleSheets includes the new sheet.
	function toggleMedia(){
		var defined;
		for( var i = 0; i < sheets.length; i++ ){
			if( sheets[ i ].href && sheets[ i ].href.indexOf( href ) > -1 ){
				defined = true;
			}
		}
		if( defined ){
			ss.media = media || "all";
		}
		else {
			setTimeout( toggleMedia );
		}
	}
	toggleMedia();
	return ss;
}
      loadCSS("css/below-the-fold.min.css",document.getElementById("inline-style"));
      loadCSS("http://fonts.googleapis.com/css?family=Open+Sans");
(function($) {
 $.QueryString = (function(a) {
	 if (a == "") return {};
	 var b = {};
	 for (var i = 0; i < a.length; ++i)
	 {
	 var p=a[i].split('=');
	 if (p.length != 2) continue;
	 b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
	 }
	 return b;
	 })(window.location.search.substr(1).split('&'))
 })(jQuery);
function save_state(file, title, address) {
	history.pushState({loc: file}, title, address);
}
function replace_state(options) {
	console.log("replacing");
	history.replaceState({loc: options.loc}, options.title, options.address);
}
function change_content(content_html, options) {
	$("#slider1_container").remove();
	console.log("location: " + window.location.href + " also content: " + content_html);
	$("#body #content").load(content_html, function() {
			if ($("#slider1_container").length) {
			slider_starter("slider1_container");
			}
			$("#menu-button.menu-opened").toggleClass("menu-opened");
			$(".open").css("display", "none");
			$(".open").toggleClass("open");
			if (options.save) {
			save_state(content_html, options.title, options.address);
			} else if (options.replace) {
			replace_state(options);
			} 
			});
}
if (!jQuery.browser.mobile) {
	jQuery('body').on('click', 'a[href^="tel:"]', function() {
			jQuery(this).attr('href', jQuery(this).attr('href').replace(/^tel:/, 'callto:'));
			});
}
$(document).ready(function() {
		var parameter_loc = $.QueryString["loc"];
		if (parameter_loc !== undefined) {
		change_content(parameter_loc, {save: false, title: "", address: "?loc=" + parameter_loc, replace: false});
		}
		$("#navigation a.index").hover(function() {
			$("#imagebar img.exterior").toggleClass("transparent");
			$("#imagebar img.interior").toggleClass("transparent");
			$("#imagebar img.industrial").toggleClass("transparent");
			$("#imagebar img.contact").toggleClass("transparent");
			}); 
		$("#navigation a.exterior").hover(function() {
			$("#imagebar img.index").toggleClass("transparent");
			$("#imagebar img.interior").toggleClass("transparent");
			$("#imagebar img.industrial").toggleClass("transparent");
			$("#imagebar img.contact").toggleClass("transparent");
			}); 
		$("#navigation a.interior").hover(function() {
			$("#imagebar img.index").toggleClass("transparent");
			$("#imagebar img.exterior").toggleClass("transparent");
			$("#imagebar img.industrial").toggleClass("transparent");
			$("#imagebar img.contact").toggleClass("transparent");
			});
		$("#navigation a.industrial").hover(function() {
				$("#imagebar img.index").toggleClass("transparent");
				$("#imagebar img.exterior").toggleClass("transparent");
				$("#imagebar img.interior").toggleClass("transparent");
				$("#imagebar img.contact").toggleClass("transparent");
				});
		$("#navigation a.contact").hover(function() {
				$("#imagebar img.index").toggleClass("transparent");
				$("#imagebar img.interior").toggleClass("transparent");
				$("#imagebar img.industrial").toggleClass("transparent");
				$("#imagebar img.exterior").toggleClass("transparent");
				});
		var locations = {
			"index" : "/index_c.html",

			"exterior" : "/exteriors/exterior.html",
			"historic" : "/exteriors/historic-restoration.html",
			"cleaning" : "/exteriors/cleaning.html",

			"interior" : "/interiors/interior.html",
			"controlled" : "/interiors/controlled-blasting.html",
			"confined" : "/interiors/confined-spaces.html",

			"industrial" : "/industrial/industrial.html",
			"equipment" : "/industrial/heavy-equipment.html",
			"marine" : "/industrial/marine.html",

			"contact" : "/contact.html"
		}
		$("#navigation a").each(function() {
				$(this).on("click", function() {
					var _id = $(this).attr("id");
					if (_id !== undefined)
					change_content(locations[_id], {save: true, title: _id, address: "?loc="+locations[_id]});
					return false;
					});
				});
});
$(window).load(function() {
		$("#imagebar img.exterior").css("display", "block");
		$("#imagebar img.interior").css("display", "block");
		$("#imagebar img.industrial").css("display", "block");
		$("#imagebar img.contact").css("display", "block");
		});
window.onpopstate = function(event) {

	$("#slider1_container").remove();
	console.log("content1: " + JSON.stringify(event.state));
	if (JSON.stringify(event.state) == "null") {
		var _loc = $.QueryString['loc'];
		if (_loc !== undefined) {
			change_content(_loc, {save: false});
		} else {
			change_content("index_c.html", {save: false});
		}
	} else {
		change_content(event.state.loc, {save: false});
	}
};
$.fn.toPx = function(settings){
	settings = jQuery.extend({
scope: 'body'
}, settings);
var that = parseFloat(this[0]),
    scopeTest = jQuery('<div style="display: none; font-size: 1em; margin: 0; padding:0; height: auto; line-height: 1; border:0;">&nbsp;</div>').appendTo(settings.scope),
    scopeVal = scopeTest.height();
scopeTest.remove();
return Math.round(that * scopeVal) + 'px';
};

