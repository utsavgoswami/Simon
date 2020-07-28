// The pattern that the user needs to match in order to 
// "win" the level

let gameStarted = false;
let level = 0;

const gamePattern = [];
const userPattern = [];

const sounds = {
    'red': new Audio('sounds/red.mp3'),
    'blue': new Audio('sounds/blue.mp3'),
    'green': new Audio('sounds/green.mp3'),
    'yellow': new Audio('sounds/yellow.mp3')
}

// The set of colors of all the buttons 
const buttonColors = ["red", "blue", "green", "yellow"];

// Randomly generates the next move that the user must perform
function nextSequence() {
    ++level;

    $("h1").text("Level " + level);

    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    const chosenButton = $("." + randomChosenColor);

    // Temporary Fade Animation
    chosenButton.fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);
}


$(".btn").on("click", function() {
    const userChosenColor = this.id;

    userPattern.push(userChosenColor);

    // Check whether userPattern matches game pattern
    if (gamePattern.length === userPattern.length) {
        let totalMatches = 0;
        for (let i = 0; i < gamePattern.length; i++) {
            if (gamePattern[i] === userPattern[i]) {
                ++totalMatches;
            }
        }

        if (totalMatches === gamePattern.length) {
            // Reset user pattern history
            userPattern.length = 0;

            setTimeout(function() {
                // Move on to next round 
                nextSequence();
            }, 600);

        }
    }

    // Play sound
    playSound(userChosenColor);

    // Animate
    animatePress(userChosenColor);
})

function playSound(name) {
    // Play sound
    sounds[name].play();
}

function animatePress(currentColor) {
    const btn = $("." + currentColor);
    btn.addClass("pressed");

    setTimeout(function() {
        btn.removeClass("pressed");
    }, 100);
}

$(document).keydown(function (event) {

    // For starting the game 
    if (!gameStarted) {
        gameStarted = true;
        nextSequence();

        $("h1").text("Level " + level);
    }
})