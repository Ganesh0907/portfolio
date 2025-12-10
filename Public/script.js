const images = [
    "image 1.jpg",
    "image 2.jpg",
    "image 3.jpg",
    "image 4.jpg",
    "image 5.jpg",
    "image 6.jpg"
];

let cardImages = [...images, ...images];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

let firstCard = null;
let secondCard = null;
let lockBoard = false;

const gameBoard = document.getElementById("gameBoard");

function createBoard() {
    gameBoard.innerHTML = "";
    shuffle(cardImages);

    cardImages.forEach(img => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${img}" class="front">
            <div class="back">?</div>
        `;

        card.addEventListener("click", () => flipCard(card));
        gameBoard.appendChild(card);
    });
}

function flipCard(card) {
    if (lockBoard) return;
    if (card === firstCard) return;

    card.classList.add("flip");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    checkMatch();
}

function checkMatch() {
    const img1 = firstCard.querySelector(".front").src;
    const img2 = secondCard.querySelector(".front").src;

    if (img1 === img2) {
        removeMatchedCards();
    } else {
        unflipCards();
    }
}

function removeMatchedCards() {
    lockBoard = true;

    // Fade animation
    firstCard.classList.add("removed");
    secondCard.classList.add("removed");

    setTimeout(() => {
        firstCard.remove();
        secondCard.remove();
        resetBoard();
        checkGameWin();
    }, 300);
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 900);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function checkGameWin() {
    const remaining = document.querySelectorAll(".card");
    if (remaining.length === 0) {
        setTimeout(() => alert("🎉 You Won!"), 400);
    }
}

document.getElementById("restart").addEventListener("click", () => {
    cardImages = [...images, ...images];
    createBoard();
});

createBoard();
