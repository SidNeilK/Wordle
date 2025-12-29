const easyWords = "braid bring chair crowd taste medal slant match think visit".split(" ");

const mediumWords = "basis stick offer union fever chest haunt".split(" ");

const hardWords = "smell slump allow".split(" ");

let score = 0;
let scoreAdd = 2;
let currentWords = mediumWords
let gameWin = false;
let word1 = currentWords[Math.floor(Math.random() * currentWords.length)];
console.log(word1);

let attempt = 0;

const grid = document.getElementById("grid");

for (let i = 0; i < 6; i++) {
    const row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < 5; j++) {
        cell = document.createElement("div");
        cell.className = "cell";
        row.appendChild(cell);
    }
    grid.appendChild(row);
}
function reset() {
    attempt = 0;
    score = 0;
    gameWin = false;
    updateScore();
    word1 = currentWords[Math.floor(Math.random() * currentWords.length)];
    console.log(word1);

    for (let i=0; i<grid.children.length; i++) {
        const row = grid.children[i];
        for (let j =0; j<row.children.length; j++) {
            const cell = row.children[j]
            cell.textContent = "";
            cell.classList.remove("green", "yellow", "red")

        }
    }
    document.getElementById("guess").value = "";
}

function easy() {
    currentWords = easyWords
    scoreAdd = 1;
    reset();
}
function medium() {
    currentWords = mediumWords
    scoreAdd = 2;
    reset();
}
function hard() {
    currentWords = hardWords
    scoreAdd = 3;
    reset();
}

function guess_input() {

    if (attempt >= 6) return;

    let guess = document.getElementById("guess").value.toLowerCase();
    if (guess.length !== 5) return;

    let guess_list = guess.split("");
    let word_list = word1.split("");

    if (guess === word1 && !gameWin) {
        alert("You guessed the correct word!");
        score += scoreAdd;
        updateScore();
        gameWin = true;
    }

    let words_processed = [];
    let row = grid.children[attempt];

    for (let y = 0; y < guess_list.length; y++) {
        if (guess_list[y] === word_list[y]) {
            words_processed.push(y);
            row.children[y].textContent = guess_list[y];
            row.children[y].classList.add("green");
            guess_list[y] = "green";
        }
    }

    for (let i = 0; i < guess_list.length; i++) {
        if (guess_list[i] !== "green" && word_list.includes(guess_list[i])) {
            for (let x = 0; x < word_list.length; x++) {
                if (word_list[x] === guess_list[i] && !words_processed.includes(x)) {
                    words_processed.push(x);
                    row.children[i].textContent = guess[i];
                    row.children[i].classList.add("yellow");
                    break;
                }
            }
        }
    }

    for (let i = 0; i < 5; i++) {
        if (row.children[i].textContent === "") {
            row.children[i].textContent = guess[i];
            row.children[i].classList.add("red");
        }
    }

    attempt++;
    document.getElementById("guess").value = "";
}
function updateScore() {
    document.getElementById("score").textContent = score;
}
