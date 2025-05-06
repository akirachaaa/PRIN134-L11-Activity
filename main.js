const gameArea = document.getElementById("gameArea");
const scoreBoard = document.getElementById("scoreBoard");
let score = 0;
let setNum = 1;
let totalTargets = 0;

function generateTargets() {
    const count = parseInt(document.getElementById("targetCount").value);
    if (!count || count < 1) return;

    setNum = 1;
    totalTargets = count;
    gameArea.innerHTML = ""; // Clear previous targets

    for (let i = 1; i <= count; i++) {
        const target = document.createElement("div");
        target.classList.add("target");
        target.textContent = i;
        target.dataset.number = i;

        target.addEventListener("contextmenu", function (event) {
            event.preventDefault();
            const clickedNumber = parseInt(this.dataset.number);

            if (clickedNumber === setNum) {
                this.remove();
                setNum++;
                enableNext();

                if (setNum > totalTargets) {
                    score++;
                    scoreBoard.textContent = `Score: ${score}`;
                    setTimeout(() => {
                        generateTargets();
                    }, 300);
                }
            }
        });

        gameArea.appendChild(target);
        moveTarget(target);
    }
    enableNext();
}

function enableNext() {
    const targets = document.querySelectorAll(".target");
    targets.forEach(t => {
        const num = parseInt(t.dataset.number);
        if (num === setNum) {
            t.style.pointerEvents = "auto";
        } else {
            t.style.pointerEvents = "none";
        }
    });
}

function moveTarget(target) {
    const gameAreaRect = gameArea.getBoundingClientRect();
    const maxX = gameAreaRect.width - target.offsetWidth;
    const maxY = gameAreaRect.height - target.offsetHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
}

document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "O") {
        event.preventDefault();
        score = 0;
        scoreBoard.textContent = `Score: ${score}`;
    }
});