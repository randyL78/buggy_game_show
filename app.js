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



// check if a letter is in the phrase
const checkLetter = button => {

    // get the LIs from the phrase container
    let lis = phraseContainer.getElementsByTagName("LI");

    // store whether a match is found in the phrase
    let match = null;

    // iterate through the phrase 
    for (let i = 0; i < lis.length; i++) {

        // test if the button's text matches the phrase's current character
        if (lis[i].textContent.toLowerCase() === button.textContent.toLowerCase()) {
            lis[i].classList.add("show");
            match = button.textContent.toLowerCase();
        }
    }

    return match;
}

// check if the game has been won or lost
const checkWin = () => {

    let letters = phraseContainer.getElementsByClassName("letter");
    let shown = phraseContainer.getElementsByClassName("show");

    // if the length of the arrays are the same, the user won
    if (letters.length === shown.length) {

        // change start screen to win screen
        overlay.classList.add('win');
        overlay.querySelector("h2").textContent = "You Win";

        // show the win screen overlay
        overlay.style.display = "flex";
    }

    if (missed > 4) {

        // change start screen to lose screen
        overlay.classList.add('lose');
        overlay.querySelector("h2").textContent = "You Lose";

        // show the lose screen overlay
        overlay.style.display = "flex";
    }
}


// listen for the reset game button to be pressed
resetButton.addEventListener('click', () => {

    // reset game
    missed = 0;
    phraseContainer.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        tries[i]
            .getElementsByTagName("IMG")[0]
            .setAttribute("src", "images/liveHeart.png");
    }

    let keys = qwerty.getElementsByTagName('BUTTON');

    for (let i = 0; i < keys.length; i++) {
        keys[i].classList.remove("chosen");
    }

    // select a random string from the array
    phrase = getRandomPhraseAsArray(phrases);

    // select a phrase and display it
    addPhraseToDisplay(phrase);

    // hide the start screen overlay
    overlay.style.display = "none";

    overlay.classList.remove("win", "lose");
});


// listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', e => {

    // filter out whitespace clicks and buttons that are already pressed
    if (e.target.tagName === 'BUTTON' && !e.target.classList.contains("chosen")) {

        // disable the button so that it can't be clicked twice
        e.target.classList.add("chosen");

        let match = checkLetter(e.target);

        // increment missed counter if not a match
        if (!match) {

            // change the current heart to a lossed heart
            let heartImage = tries[missed].getElementsByTagName("IMG")[0];
            heartImage.setAttribute("src", "images/lostHeart.png");

            // increment counter
            missed++;
        }

        // chek for a winner or loser
        checkWin();
    }
})

