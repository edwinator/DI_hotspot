// var currIndex = 0;

// var bTitlesAnimating = false;

// var SHEEN_TIME = 5000;
// var SHEEN_XS = new Array(-250, 110);
// var SHEEN_YS = new Array(-250, 110);

// var TITLE_YS = new Array(433, 468, 502);
// var D_TITLE_Y = 30;

// var CUEPOINTS = new Array(.234, 8.408, 14.348, 21.655, 29.296, 30.330);
// var CUEPOINTS = new Array(.234, 8.408, 14.348, 21.655, 29, 30.330);
var CUEPOINTS = new Array(8.408, 14.25, 21.5, 29.3, 30.330);
var currState = "init";

var popcorn;
var popcornEventID;
var vidReady = 0;
var vidTimer = setInterval(function(){isVidReady()}, 50);

document.addEventListener( "DOMContentLoaded", function() {

	document.getElementById("waitText").style.opacity = 0;
	document.getElementById("instructHotpot").className = 'fadein';

	document.getElementById("hotspot").addEventListener("click", hotspotClicked, false);
	document.getElementById("chap1").addEventListener("click", chap1Clicked, false);
	document.getElementById("chap2").addEventListener("click", chap2Clicked, false);
	document.getElementById("chap3").addEventListener("click", chap3Clicked, false);
	document.getElementById("chap4").addEventListener("click", chap4Clicked, false);

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
		// document.getElementById("hotspot").style.display = "none";
    }
}

function hotspotClicked(evt) {

	// alert("evt:"+evt+" dest:"+dest)

	// document.getElementById("instructHotpot").style.display = "none";
	document.getElementById("hotspot").style.display = "none";

	playCurrVideoSection();

	// if (currState == "init") {
	// 	currState = "chapters";
	//     popcorn.currentTime(CUEPOINTS[2]);
	//     popcorn.cue(CUEPOINTS[3], function() {video3done()});
	//     popcorn.play();		
	// }else if (currState == "chapters") {
	// 	currState = "init";
	//     popcorn.currentTime(CUEPOINTS[3]);
	//     popcorn.cue(CUEPOINTS[4], function() {video4done()});
	//     popcorn.play();	
	// }
}

function playCurrVideoSection() {
	if (currState == "init") {
		console.log("init")
		currState = "chapters";
		document.getElementById("instructHotpot").style.display = "none";
		document.getElementById("instructHotpot").className = '';
		document.getElementById("instructQuiz").style.display = "none";
		document.getElementById("instructQuiz").className = '';
		// document.getElementById("screenshot").style.display = "none";
		// document.getElementById("instructHotpot").style.opacity = 0;
	    // alert(evt.target.id);
	    // alert(popcorn);
	    popcorn.currentTime(CUEPOINTS[1]);
	    popcorn.cue(CUEPOINTS[2], function() {video3done()});
	    popcornEventID = popcorn.getLastTrackEventId();
	    popcorn.play();		
	}else if (currState == "chapters") {
		console.log("chapters")
		currState = "chapters_menu";
		document.getElementById("instructChapters").style.display = "none";
		document.getElementById("instructChapters").className = '';
	    popcorn.currentTime(CUEPOINTS[2]);
	    popcorn.cue(CUEPOINTS[3], function() {video4done()});
	    popcornEventID = popcorn.getLastTrackEventId();
	    popcorn.play();	
	}else if (currState == "pdf") {
		console.log("pdf")
		currState = "quiz";
		// document.getElementById("instructPdf").style.display = "none";
		// document.getElementById("instructPdf").className = '';
	    popcorn.currentTime(0);
	    popcorn.cue(CUEPOINTS[0], function() {video1done()});
	    popcornEventID = popcorn.getLastTrackEventId();
	    popcorn.play();	
	}else if (currState == "quiz") {
		console.log("quiz")
		currState = "init";
		document.getElementById("instructPdf").style.display = "none";
		document.getElementById("instructPdf").className = '';
		document.getElementById("pdfLink").style.display = "none";
		document.getElementById("pdfLink").className = '';
		// document.getElementById("instructQuiz").style.display = "none";
		// document.getElementById("instructQuiz").className = '';
	    popcorn.currentTime(CUEPOINTS[0]);
	    popcorn.cue(CUEPOINTS[1], function() {video2done()});
	    popcornEventID = popcorn.getLastTrackEventId();
	    popcorn.play();	
	}
}

function chap1Clicked(evt) {
	// console.log("chap1Clicked")
	currState = "init";
	document.getElementById("menu").style.display = "none";
	playCurrVideoSection();
}

function chap2Clicked(evt) {
	// console.log("chap2Clicked")
	currState = "chapters";
	document.getElementById("menu").style.display = "none";
	playCurrVideoSection();
}

function chap3Clicked(evt) {
	// console.log("chap3Clicked")
	currState = "pdf";
	document.getElementById("menu").style.display = "none";
	playCurrVideoSection();
}

function chap4Clicked(evt) {
	// console.log("chap4Clicked")
	currState = "quiz";
	document.getElementById("menu").style.display = "none";
	playCurrVideoSection();
}

function video3done() {  // Chapter 1 HotSpots done
	console.log("video3done")
	popcorn.pause();
	popcorn.removeTrackEvent(popcornEventID);
	// alert("pasue")
	// document.getElementById("instructHotpot").innerHTML = "Click the link below to download a pdf, or click the logo to<br>advance to chapter 4 to see an Interactive Video Quiz.";
	// alert("video3done")
	document.getElementById("instructChapters").style.display = "block";
	document.getElementById("instructChapters").className = 'fadein';
	document.getElementById("hotspot").style.display = "block";
}

function video4done() {  // Chapter 2 Chapters done
	console.log("video4done")
	popcorn.pause();
	popcorn.removeTrackEvent(popcornEventID);
	// alert("pasue")
	// document.getElementById("instructHotpot").innerHTML = "Click the link below to download a pdf, or click the logo to<br>advance to chapter 4 to see an Interactive Video Quiz.";
	// document.getElementById("instructHotpot").style.display = "block";
	document.getElementById("hotspot").style.display = "block";
	document.getElementById("menu").style.display = "block";
}

function video1done() {  // Chapter 3 Links done
	console.log("video1done")
	popcorn.pause();
	popcorn.removeTrackEvent(popcornEventID);
	// alert("pasue")
	// document.getElementById("instructHotpot").innerHTML = "Click the link below to download a pdf, or click the logo to<br>advance to chapter 4 to see an Interactive Video Quiz.";
	// document.getElementById("instructHotpot").style.display = "block";
	document.getElementById("instructPdf").style.display = "block";
	document.getElementById("instructPdf").className = 'fadein';
	document.getElementById("pdfLink").style.display = "block";
	document.getElementById("pdfLink").className = 'fadein';
	document.getElementById("hotspot").style.display = "block";
}

function video2done() {  // Chapter 3 Links done
	console.log("video2done")
	popcorn.pause();
	popcorn.removeTrackEvent(popcornEventID);
	// alert("pasue")
	// document.getElementById("instructHotpot").innerHTML = "Click the link below to download a pdf, or click the logo to<br>advance to chapter 4 to see an Interactive Video Quiz.";
	// document.getElementById("instructHotpot").style.display = "block";
	document.getElementById("instructQuiz").style.display = "block";
	document.getElementById("instructQuiz").className = 'fadein';
	document.getElementById("hotspot").style.display = "block";
}

// test.addEventListener("click", whatClicked, false);