/*
    This project is about recreating the game "hangman". In this game 
    your objectives is to try and guess a word, letter by letter, that 
    another player establishes at first (i.e. player 1 2ill enter a word,
    that player 2 will try to guess, letter by letter).

    Each time player 2 makes a mistake we record this, and after x number 
    of mistakes the ends.
 */

// This is a record of the word  that player 2 must array to guess
let word = prompt("Welcome to Hangman! Player 1, please enter a word for Player 2 to guess.").toUpperCase();
console.log(word);

// true | false values for which letters were guessed correctly
let revealedLetters = new Array(word.length);

// fill up our array with false values. No letters were guessed at the start.
revealedLetters.fill(false);

const maxStrikes = 6; // the maximum number of allowed mistakes
let strikes = 0; // the number of incorrect guesses made so far

// This is to show maxStrikes at the beginning 
let strikeLeft = document.getElementById("strikeLeft").innerHTML = "<strong>" + maxStrikes + "</strong>";

// this will contain every letter that has been incorrectly guessed.
let strikeLetters = new Array(maxStrikes);

// run this now, to draw the empty word at the start of the game.
drawWordProgress();

/*
    Manipulates the DOM to write all the strike letters to the appropriate 
    section in hangman.html.
*/
function drawStrikeLetters() {
    // your DOM manipulation code here
    // Create a string variable to hold the letters from the strike letters array, fill rest with empty
    let strikeText = strikeLetters.join("");

    // Put the wrongGuess in the id wrongGuess
    let wrongGuess = document.getElementById("wrongGuess").innerHTML = "<strong>" + strikeText + "</strong>";
    console.log(wrongGuess);

    // Every time the user makes mistakes, maxStrikes decrease
    strikeLeft = document.getElementById("strikeLeft").innerHTML = maxStrikes - strikes;

    // Game over
    if (strikeLeft == 0) {
        alert("Sorry,the game is over!");
    }
}

/*
    Manipulates the DOM to write the sucessfully guessed letters of the 
    word,replacing them with dashes if not yet guessed
*/
function drawWordProgress() {
    // Create a variable string to represent the word to write to HTML area
    let currentProgress = "";

    // Create a for loop for the length of "revealedLetters"
    for (let index = 0; index < revealedLetters.length; index++) {
        if (revealedLetters[index] == true) {
            currentProgress += word[index];
        } else {
            currentProgress += " _ ";
        }
    }
    // DOM manipulation to write the word in hangman page
    document.getElementById("word-section").innerHTML = currentProgress;

    // If every guessed letter match the word, player 2 wins
    if (currentProgress == word) {
        alert("Player 2 wins, Well done!");
    }
}

// Manipulates the DOM to update the image of the gallows for the current game state.
function drawGallows() {
    // Create and update an img element in html page, gallows-section
    const image = document.getElementById("gallows-image").src = "../work-images/Hangman-images/strike-" + strikes + ".png";
}

// The processGuess function will be call each time 
document.getElementById("submit-button").addEventListener("click", processGuess);

function processGuess(e) {
    // This preventDefault function is required to stop our form from refreshing our page
    e.preventDefault();

    if (strikes < maxStrikes) {
        // game logic goes here...
        // Check the guessed letter value from the input in form 
        let guessLetter = document.getElementById("guess").value.toUpperCase();
        console.log("The player guessed: " + guessLetter);

        // Check the guessed letter value against every letter in 'word'
        let isLetterOnWord = false;
        for (let index = 0; index < word.length; index++) {
            if (guessLetter == word[index]) {
                isLetterOnWord = true;
                revealedLetters[index] = true; // This index is correct
            }
        }

        // Check if the guessed letter is inside the word
        if (isLetterOnWord) {
            console.log("The guessed letter was correct");

            // call drawWordProgress
            drawWordProgress();

        } else {
            console.log("The guessed letter was incorrect!");

            // Increment the strikes
            strikes++;

            // If the guessed letter is NOT inside the word
            strikeLetters[strikes] = guessLetter;

            // Call drawStrikeLetters function
            drawStrikeLetters();

            // Call drawGallows function
            drawGallows();
        }

    } else {
        alert("Too many incorrect guessed! Sorry the game is over!");
    }
}