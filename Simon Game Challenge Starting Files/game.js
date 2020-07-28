// The pattern that the user needs to match in order to 
// "win" the level
const gamePattern = [];

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
    
    // Play sound
    new Audio("sounds/" + randomChosenColor + ".mp3").play();
}


// Step 4
$(".btn").on("click", function() {
    const userChosenColor = this.id;
})