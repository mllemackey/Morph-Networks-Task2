// letter array holds all letters
let letter = document.getElementsByClassName("letter-num");
let letters = [...letter];

let numbers = [...Array.from({length: 26}, (v, k) => k + 1)];

var shuffled_numbers = shuffle(numbers);

let random_number = 0;
var interval;
var difficulty;

function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

//disable difficulty radio buttons
function disable() {
    var diffs = document.getElementsByName("difficulty");

    for (let i = 0; i < diffs.length; i++) {
        document.getElementsByName("difficulty")[i].disabled = true;
    }
}

//disable difficulty radio buttons
function enable() {
    var diffs = document.getElementsByName("difficulty");

    for (let i = 0; i < diffs.length; i++) {
        document.getElementsByName("difficulty")[i].disabled = false;
    }
}

let start = true;
document.getElementById("start_game").onclick = () => {
    if (start) {
        startGame();
    }
    else {
        stopGame();
    }
};

function missed() {
    letters[shuffled_numbers[random_number] - 1].classList.add("red");
    document.getElementById("miss").innerHTML++;
}

function next_key() {
    document.getElementById("input_letter").value = "";
    random_number++;
    document.getElementById("random_number").innerHTML = shuffled_numbers[random_number];
    document.getElementById("left").innerHTML--;


}

var interval_f = function () {
    missed();
    next_key();
};

function match_keys(event) {

    if (event.defaultPrevented) {
        return;
    }

    var key = event.key;

    if (key.toUpperCase() == letter[shuffled_numbers[random_number] - 1].querySelector('span.letter').innerText) {
        letters[shuffled_numbers[random_number] - 1].classList.add("green");
        document.getElementById("hit").innerHTML++;
    } else {
        missed();
    }
    next_key();

    resetInterval();

    if (random_number == 26) {
        let score_points = "Game Over! Your Score: " +
            "Hits: " + document.getElementById("hit").innerText +
            " Misses: " + document.getElementById("miss").innerText;
        stopGame();
        alert(score_points);

    }
}
function resetInterval() {
    clearInterval(interval);
    interval = setInterval(interval_f, difficulty);
}

function startGame() {

    start = false;
    difficulty = document.querySelector('input[name="difficulty"]:checked').value;
    document.getElementById("start_game").innerText = "Stop Game";
    document.getElementById("random_number").innerHTML = shuffled_numbers[random_number];
    document.getElementById("input_letter").disabled = false;
    document.getElementById("input_letter").focus();

    //disable difficulty radio buttons
    disable();

    document.addEventListener('keyup', match_keys);

    interval = setInterval(interval_f, difficulty);

}

function stopGame() {
    start = true;
    document.getElementById("input_letter").disabled = true;
    document.getElementById("start_game").innerText = "Start Game";
    //shuffle numbers for new game
    shuffled_numbers = shuffle(numbers);
    random_number = 0;

    document.getElementById("random_number").innerHTML = 0;

    // remove all exisiting classes from each letter
    for (var i = 0; i < letters.length; i++) {
        letters[i].classList.remove("red", "green");
    }

    //disable difficulty radio buttons
    enable();

    //reset scores
    document.getElementById("hit").innerHTML = 0;
    document.getElementById("miss").innerHTML = 0;
    document.getElementById("left").innerHTML = 26;

    clearInterval(interval);
    document.removeEventListener('keyup', match_keys);
}