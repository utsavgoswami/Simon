

let gameStarted = false;
let level = 0;


// The sequence of patterns the user needs to match in order to 
// "win" the current level
const gamePattern = [];

// The position of the gamePattern array where the button the user needs to press correctly resides
let patternPos = 0; 

// The set of colors of all the buttons 
const buttonColors = ["red", "blue", "green", "yellow"];

const sounds = {
    'red': 'sounds/red.mp3',
    'blue': 'sounds/blue.mp3',
    'green': 'sounds/green.mp3',
    'yellow': 'sounds/yellow.mp3',
    'wrong': 'sounds/wrong.mp3'
}


// Randomly generates & displays the next move that the user must perform
const nextSequence = () => {

    // Updates the level heading to the number of the new level 
    ++level;
    $("h1").text("Level " + level);

    // Choose a random button to press using random indexing
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];

    // Push this pattern into the sequence of patterns the user must match
    gamePattern.push(randomChosenColor);

    const chosenButton = $("." + randomChosenColor);

    // Temporary Fade Animation
    chosenButton.fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);
}

// Controls the flow of action when a user presses any of the buttons
$(".btn").on("click", function() {

    // Get the color of the button the user presses
    const userChosenColor = $(this).attr("id");

    playSound(userChosenColor);
    animatePress(userChosenColor);

    if (gameStarted && userChosenColor === gamePattern[patternPos]) {
        // Move pattern position to the next pattern the user needs to match
        ++patternPos;
            
        // User has successfully matched the pattern
        if (patternPos === gamePattern.length) {
            // Reset pattern position 
            patternPos = 0;

            setTimeout(() => { nextSequence(); }, 900);
        }
    } else {
        animateWhenUserIsWrong();
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
})

const startOver = () => {
    // Reset the values of level, gamePattern, & started 
    level = 0;
    gamePattern.length = 0;
    gameStarted = false;
    patternPos = 0;
}

const animateWhenUserIsWrong = () => {
    playSound("wrong");

    const body = $("body");
    body.addClass("game-over");

    setTimeout(() => { body.removeClass("game-over"); }, 200);
}

const playSound = name => {
    let audio = new Audio(sounds[name]);
    audio.play();
}

const animatePress = currentColor => {
    const btn = $("." + currentColor);
    btn.addClass("pressed");

    setTimeout(() => { btn.removeClass("pressed"); }, 100);
}

// Whenever a keyboard button is pressed
$(document).keydown(event => {

    // For starting the game 
    if (!gameStarted) {
        gameStarted = true;
        nextSequence();

        $("h1").text("Level " + level);
    }
})