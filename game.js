
//Array to hold different colors.
var buttonColours = [
    "red",
    "blue",
    "green",
    "yellow"];
//Uses nextSequence function to pick a number, which correlates to an index in buttonColours array.

//Create Array for selected colors to store.
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var levelString = "Level " + level;
var started = false;

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length);
    
});
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    
});
function checkAnswer(currentLevel) {
    var indexCurrLevel = currentLevel - 1;
    if (userClickedPattern[indexCurrLevel] === gamePattern[indexCurrLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        setBackgroundRed();
        startOver();
    }
}

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    levelString = "Level " + level;
    started = false;
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function playWrongSound() {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    
}
function setBackgroundRed() {
    playWrongSound();
    $("body").addClass("game-over");

    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
}

function nextSequence() {
    userClickedPattern = [];
    level = level + 1;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);

}