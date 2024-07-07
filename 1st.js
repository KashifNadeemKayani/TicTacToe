let boxes = document.querySelectorAll(".boxes");
let reset = document.querySelector("#reset");
let news = document.querySelector("#new");
let msgBox = document.querySelector(".cont");
let msg = document.querySelector("#msg");

let turnX = true;
let count = 0;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
    }
}

const resetGame = () => {
    turnX = true;
    count = 0;
    enableBoxes();
    boxes.forEach(box => box.innerText = "");
    msgBox.classList.add("hide");
    reset.disabled = false;
}

const draw = () => {
    if (count == 9) {
        msg.innerText = "The game has drawn, start a new one!";
        msgBox.classList.remove("hide");
        disableBoxes();
        reset.disabled = true;
    }
}

news.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);

const showWinner = (pos1) => {
    msg.innerText = `Congratulations, the winner is ${pos1}`;
    msgBox.classList.remove("hide");
    disableBoxes();
    reset.disabled = true;
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        
        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 == pos2 && pos2 == pos3) {
                showWinner(pos1);
                return; // Exit the function once a winner is found
            }
        }
    }
    draw();
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX) {
            box.innerText = "X";
            box.style.color = "red";
        } else {
            box.innerText = "O";
            box.style.color = "blue";
        }
        box.disabled = true;
        count++;
        turnX = !turnX;
        checkWinner();
    })
});