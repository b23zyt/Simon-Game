var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//start the game
$(document).keydown(function(evt){
    if (!started && evt.key === "Enter"){
        $("#level-title").text("Level " + level);  //change the text of h1 to level 1
        nextSequence();
    }
});


$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);  //every time the element of the array +1
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);  //check each index of the array (whenever the user click it
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }

    else {
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press 'Enter' to Restart");

        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];  //每次清零

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor); //add one more element in the array

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3")
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}