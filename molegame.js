// Assignment #1 - Whack-A-Mole


var moleGame = {};
moleGame.top = [300, 400, 410, 205, 5, 75, 140, 0];
moleGame.left = [380, 105, 630, 115, 98, 330, 580, 640];
moleGame.score = 0;
moleGame.level = 1;
moleGame.time = 60;
var mole = 1;
var displayMoleTime = 1500;
$("#mole").addClass("normMole");
$("#mole").hide();

var handler = function() {
	moleGame.hitMoleSound.currentTime = 0;
	moleGame.hitMoleSound.play();
	$("#mole").removeClass("normMole");
	$("#mole").addClass("hitMole");
	moleGame.score++;
	$("#score").html(moleGame.score);
	
	if (moleGame.score == 3) {
		displayMoleTime = 1000;
		moleGame.level = 2;
		$("#level").html(moleGame.level);
	}
	if (moleGame.score == 6) {
		displayMoleTime = 900;
		moleGame.level = 3;
		$("#level").html(moleGame.level);
	}
	if (moleGame.score == 12) {
		displayMoleTime = 800;
		moleGame.level = 4;
		$("#level").html(moleGame.level);
	}
	if (moleGame.score == 18) {
		displayMoleTime = 750;
		moleGame.level = 5;
		$("#level").html(moleGame.level);
	}
	if (moleGame.score == 20) {
		moleGame.level = 5;
		$("#level").html(moleGame.level);
		moleGame.background.pause();
		alert("Congratulations! You have saved your lawn!\nPlay again?");
		setTimeout(location.reload(true), 1000);
	}
	$("#mole").unbind('click', handler);
}

$("#mole").bind('click', handler);

$(function(){
	moleGame.hitMoleSound = document.getElementById("hitMole");
	moleGame.hitMoleSound.volume = 1.0;
	moleGame.missSound = document.getElementById("missMole");
	moleGame.missSound.volume = 0.6;
	moleGame.background = document.getElementById("background");
	moleGame.background.volume = 0.2;
	$("#button").click(function(){
		$("#menu").hide("fade", "slow");
		$("#game").click(function() {
			moleGame.missSound.currentTime = 0;
			moleGame.missSound.play();
		});
		moleGame.background.currentTime = 0;
		moleGame.background.play();
		moleGame.clock = setInterval(decreaseClock, 1000);
		moleGame.timer = setInterval(gameloop, 2000);
	});
});

function decreaseClock() {
	moleGame.time = moleGame.time - 1;
	$("#time").html(moleGame.time);
	if (moleGame.time == 0) {
		moleGame.background.pause();
		alert("You have lost your lawn!\nPlay again?");
		setTimeout(location.reload(true), 1000);
	}
}

function displayMole() {
	chooseHole();
	if (mole != 1) {
		$("#mole").bind('click', handler);
	}
	$("#mole").show( "drop", {direction: "down" }, 200);
	mole = 0;
}

function removeMole() {
	$("#mole").hide("drop", {direction: "down" }, 50);
	$("#mole").removeClass("hitMole");
	$("#mole").addClass("normMole");
}

function gameloop() {
	displayMole();
	setTimeout(removeMole, displayMoleTime);
	setTimeout(unbind, displayMoleTime);
}

function chooseHole() {
	var hole = Math.floor(Math.random() * 8);
	$("#mole").css({"top":moleGame.top[hole]});
	$("#mole").css({"left":moleGame.left[hole]});
}

function unbind() {
	$("#mole").unbind('click', handler);
}
