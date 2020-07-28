// The pattern that the user needs to match in order to 
// "win" the level
const gamePattern = [];

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