// var currIndex = 0;

// var bTitlesAnimating = false;

// var SHEEN_TIME = 5000;
// var SHEEN_XS = new Array(-250, 110);
// var SHEEN_YS = new Array(-250, 110);

// var TITLE_YS = new Array(433, 468, 502);
// var D_TITLE_Y = 30;

// var CUEPOINTS = new Array(.234, 8.408, 14.348, 21.655, 29.296, 30.330);

var popcorn;
var vidReady = 0;
var vidTimer = setInterval(function(){isVidReady()}, 50);

document.addEventListener( "DOMContentLoaded", function() {

	document.getElementById("waitText").style.opacity = 0;
	document.getElementById("instructText").className = 'fadein';

	document.getElementById("hotSpot").addEventListener("click", whatClicked, false);

	popcorn = Popcorn("#dancevideo_01");

	// popcorn.footnote({
	// 	start: CUEPOINTS[0],
	// 	end: CUEPOINTS[1],
	// 	target: "footnote",
	// 	text: "Interactive Design"
	// });

}, false );


function isVidReady() {
    vidReady = popcorn.readyState();

    if (vidReady >= 2) {

		document.getElementById("screenshot").style.display = "none";
		clearTimeout(vidTimer);
		// document.getElementById("hotSpot").style.display = "none";
    }
}

function whatClicked(evt) {

	// document.getElementById("screenshot").style.display = "none";
	document.getElementById("instructText").style.display = "none";
	document.getElementById("hotSpot").style.display = "none";
	// document.getElementById("instructText").style.opacity = 0;
    // alert(evt.target.id);
    // alert(popcorn);
    popcorn.play();
}

// test.addEventListener("click", whatClicked, false);