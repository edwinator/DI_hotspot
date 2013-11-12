var CUEPOINTS = new Array(8.4, 14.3, 21.6, 22.6, 29.25, 30.330);
var TITLES = new Array("Chapter 1: Interactive Video Hot Spots", "Chapter 2: Interactive Video Chapters", "Chapter 3: Interactive Video Links", "Chapter 4: Interactive Video Quiz");
var currState = "init";

var popcorn;
var popcornEventID;
var popcornEventID2;
var vidReady = 0;
var vidTimer = setInterval(function(){isVidReady()}, 50);

document.addEventListener( "DOMContentLoaded", function() {

	document.getElementById("waitText").style.display = "none";
	document.getElementById("title").className = 'fadein';
	document.getElementById("instructHotpot").className = 'fadein';

	document.getElementById("hotspot").addEventListener("click", hotspotClicked, false);
	document.getElementById("hotspot").addEventListener("mouseover", hotspotMouseOver, false);
	document.getElementById("hotspot").addEventListener("mouseout", hotspotMouseOut, false);


	document.getElementById("chap1").addEventListener("click", chap1Clicked, false);
	document.getElementById("chap2").addEventListener("click", chap2Clicked, false);
	document.getElementById("chap3").addEventListener("click", chap3Clicked, false);
	document.getElementById("chap4").addEventListener("click", chap4Clicked, false);
	document.getElementById("launchQuiz").addEventListener("click", showQuiz, false);
	document.getElementById("submitBtn").addEventListener("click", chap1Clicked, false);

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
    }
}

function hotspotClicked(evt) {
	document.getElementById("hotspot").style.display = "none";
	document.getElementById("sheen").style.display = "none";
	playCurrVideoSection();
}

function hotspotMouseOver(evt) {
	document.getElementById("sheen").className = 'fadein';
}

function hotspotMouseOut(evt) {
	document.getElementById("sheen").className = '';
}

function playCurrVideoSection() {
	console.log("currState:"+currState);
	if (currState == "init") {
		console.log("init")
		currState = "chapters";
		document.getElementById("quiz").style.display = "none";
		document.getElementById("instructHotpot").className = '';
		document.getElementById("instructQuiz").className = '';
		document.getElementById("launchQuiz").className = '';
		document.getElementById("title").className = '';
	    popcorn.currentTime(CUEPOINTS[1]);
	    popcorn.cue(CUEPOINTS[2], function() {video3done()});
	    popcornEventID = popcorn.getLastTrackEventId();
	    popcorn.play();		
	}else if (currState == "chapters") {
		console.log("chapters")
		currState = "chapters_menu";
		document.getElementById("instructChapters").className = '';
		document.getElementById("title").className = '';
	    popcorn.currentTime(CUEPOINTS[2]);
	    popcorn.cue(CUEPOINTS[3], function() {showChapterMenu()});
	    popcornEventID = popcorn.getLastTrackEventId();
	    popcorn.cue(CUEPOINTS[4], function() {video4done()});
	    popcornEventID2 = popcorn.getLastTrackEventId();
	    popcorn.play();	
	}else if (currState == "pdf") {
		console.log("pdf")
		currState = "quiz";
	    popcorn.currentTime(0);
	    popcorn.cue(CUEPOINTS[0], function() {video1done()});
	    popcornEventID = popcorn.getLastTrackEventId();
	    popcorn.play();	
	}else if (currState == "quiz") {
		console.log("quiz")
		currState = "init";
		document.getElementById("instructPdf").className = '';
		document.getElementById("pdfLink").className = '';
		document.getElementById("title").className = '';
	    popcorn.currentTime(CUEPOINTS[0]);
	    popcorn.cue(CUEPOINTS[1], function() {video2done()});
	    popcornEventID = popcorn.getLastTrackEventId();
	    popcorn.play();	
	}else if (currState == "chapters_menu") {
		if (document.getElementById("menu").className == "menu_div") {
			document.getElementById("menu").className = "menu_div show"
		}else{
			document.getElementById("menu").className = "menu_div"
		}
		document.getElementById("hotspot").style.display = 'block';
		document.getElementById("sheen").style.display = 'block';
	}
}

function chap1Clicked(evt) {
	// console.log("chap1Clicked")
	currState = "init";
	document.getElementById("menu").className = 'menu_div';
	document.getElementById("instructChoose").className = '';
	document.getElementById("title").className = '';
	playCurrVideoSection();
}

function chap2Clicked(evt) {
	// console.log("chap2Clicked")
	currState = "chapters";
	document.getElementById("menu").className = 'menu_div';
	document.getElementById("instructChoose").className = '';
	document.getElementById("title").className = '';
	playCurrVideoSection();
}

function chap3Clicked(evt) {
	// console.log("chap3Clicked")
	currState = "pdf";
	document.getElementById("menu").className = 'menu_div';
	document.getElementById("instructChoose").className = '';
	document.getElementById("title").className = '';
	playCurrVideoSection();
}

function chap4Clicked(evt) {
	// console.log("chap4Clicked")
	currState = "quiz";
	document.getElementById("menu").className = 'menu_div';
	document.getElementById("instructChoose").className = '';
	document.getElementById("titleText").innerHTML = TITLES[1];
	document.getElementById("title").className = '';
	playCurrVideoSection();
}

function showQuiz(evt) {	
	document.getElementById("launchQuiz").className = '';
	// document.getElementById("instructQuiz").className = '';
	document.getElementById("quiz").style.display = 'block';
}

function video3done() {  // Chapter 1 HotSpots done
	console.log("video3done")
	popcorn.pause();
	popcorn.removeTrackEvent(popcornEventID);
	document.getElementById("instructChapters").className = 'fadein';
	document.getElementById("titleText").innerHTML = TITLES[1];
	document.getElementById("title").className = 'fadein';
	document.getElementById("hotspot").style.display = 'block';
	document.getElementById("sheen").style.display = 'block';
}

function showChapterMenu() { 
	console.log("showChapterMenu")
	popcorn.removeTrackEvent(popcornEventID);
	// popcorn.pause();
	document.getElementById("menu").className = 'menu_div show';
}

function video4done() {  // Chapter 2 Chapters done
	console.log("video4done")
	popcorn.pause();
	popcorn.removeTrackEvent(popcornEventID2);
	document.getElementById("hotspot").style.display = 'block';
	document.getElementById("sheen").style.display = 'block';
	document.getElementById("instructChoose").className = 'fadein';
	document.getElementById("titleText").innerHTML = TITLES[1];
	document.getElementById("title").className = 'fadein';
}

function video1done() {  // Chapter 3 Links done
	console.log("video1done")
	popcorn.pause();
	popcorn.removeTrackEvent(popcornEventID);
	document.getElementById("instructPdf").className = 'fadein';
	document.getElementById("titleText").innerHTML = TITLES[2];
	document.getElementById("title").className = 'fadein';
	document.getElementById("pdfLink").className = 'fadein';
	document.getElementById("hotspot").style.display = 'block';
	document.getElementById("sheen").style.display = 'block';
}

function video2done() {  // Chapter 4 Quiz done
	console.log("video2done")
	popcorn.pause();
	popcorn.removeTrackEvent(popcornEventID);
	document.getElementById("instructQuiz").className = 'fadein';
	document.getElementById("launchQuiz").className = 'fadein';
	document.getElementById("titleText").innerHTML = TITLES[3];
	document.getElementById("title").className = 'fadein';
	document.getElementById("hotspot").style.display = 'block';
	document.getElementById("sheen").style.display = 'block';
}