// needed DOM elements
const qwerty = document.getElementById("qwerty");
const phraseContainer = document.getElementById("phrase");
const overlay = document.getElementById('overlay');
const resetButton = document.querySelector(".btn__reset");
const tries = document.getElementsByClassName("tries");

// global variables
let missed = 0;
let phrases = [
    "let sleeping dogs lie",
    "hark the herald angels sing",
    "arrow functions",
    "array iteration methods",
    "template literals"
];
let phrase;


// return a random phrase from an array
const getRandomPhraseAsArray = arr => {

    // select a random index using the length of the array
    const randomIndex = Math.round(Math.random() * phrases.length);

    // return the array element at the random index
    return arr[randomIndex];
}

// adds the letters of a string to the display
const addPhraseToDisplay = arr => {


    // iterate through arr string and add character to DOM
    for (let i = 0; i < arr.length; i++) {

        // create an empty LI tag
        let li = document.createElement('LI');
        li.textContent = arr[i];

        // check if current character is a letter or space
        if (li.textContent !== ' ') {
            li.className = "letter";
        } else {
            li.className = "space";
        }

        // add li to display
        phraseContainer.appendChild(li);
    }
}


// listen for the reset game button to be pressed
resetButton.addEventListener('click', () => {

    // select a random string from the array
    phrase = getRandomPhraseAsArray(phrases);

    // select a phrase and display it
    addPhraseToDisplay(phrase);

    // hide the start screen overlay
    overlay.style.display = "none";

    overlay.classList.remove("win", "lose");
});


