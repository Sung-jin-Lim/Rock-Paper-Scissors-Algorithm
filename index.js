// button cooldown:
// function myFunction() {
//   console.log("clicked !!");
//   document.getElementsByClassName("selection").disabled = true;
//   setTimeout(function () {
//     document.getElementsByClassName("selection").disabled = false;
//   }, 2000);
// }

const selectionButtons = document.querySelectorAll("[data-selection]");
const finalColumn = document.querySelector("[data-final-column]");
const computerScoreSpan = document.querySelector("[data-computer-score]");
const yourScoreSpan = document.querySelector("[data-your-score]");
let latestHumanMove = document
  .getElementsByClassName("results")[0]
  .getElementsByClassName("result-selection")[0];

let roundNumber = document.querySelector(".roundNumber").innerHTML;
const SELECTIONS = [
  {
    name: "rock",
    emoji: "✊",
    beats: "scissors",
  },
  {
    name: "paper",
    emoji: "✋",
    beats: "rock",
  },
  {
    name: "scissors",
    emoji: "✌",
    beats: "paper",
  },
];
// event adder
selectionButtons.forEach((selectionButton) => {
  selectionButton.addEventListener("click", (e) => {
    const selectionName = selectionButton.dataset.selection;
    const selection = SELECTIONS.find(
      (selection) => selection.name === selectionName
    );
    makeSelection(selection);
  });
});

function makeSelection(selection) {
  if (document.querySelector(".roundNumber").innerHTML < 1) {
    var computerSelection = randomSelection();
  }

  // checks input value

  if (document.querySelector(".roundNumber").innerHTML >= 1) {
    // for loop for 1-100

    for (let i = 0; i < 101; i++) {
      if (document.querySelector("input").value == i) {
        const randomHundred = Math.floor(Math.random() * 100);
        if (randomHundred < i) {
          var computerSelection = superSelection();
        } else {
          var computerSelection = randomSelection();
        }
      } else {
        var computerSelection = randomSelection();
      }
    }
  }
  const yourWinner = isWinner(selection, computerSelection);
  const computerWinner = isWinner(computerSelection, selection);

  addSelectionResult(computerSelection, computerWinner);
  addSelectionResult(selection, yourWinner);

  if (yourWinner) incrementScore(yourScoreSpan);
  if (computerWinner) incrementScore(computerScoreSpan);

  document.querySelector(".roundNumber").innerHTML = 1 + roundNumber++;
}

function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

function addSelectionResult(selection, winner) {
  const div = document.createElement("div");
  div.innerText = selection.emoji;
  div.classList.add("result-selection");
  if (winner) div.classList.add("winner");
  finalColumn.after(div);
}

// winner display
function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name;
}

// randomizer
function randomSelection() {
  let latestHumanMove = document
    .getElementsByClassName("results")[0]
    .getElementsByClassName("result-selection")[0];

  const randomIndex = Math.floor(Math.random() * SELECTIONS.length);

  return SELECTIONS[randomIndex];
}
// the non random algorithm
function superSelection() {
  let latestHumanMove = document
    .getElementsByClassName("results")[0]
    .getElementsByClassName("result-selection")[0];
  let latestComputerMove = document
    .getElementsByClassName("results")[0]
    .getElementsByClassName("result-selection")[1];

  // decides wheter to activate latestComputerMove or latestHumanMove
  if (latestComputerMove.innerHTML === latestHumanMove.innerHTML) {
    switch (latestHumanMove.innerHTML) {
      case "✊":
        return SELECTIONS[2];
      case "✋":
        return SELECTIONS[0];
      case "✌":
        return SELECTIONS[1];

      default:
        console.log("urmom");
    }
  }

  // decide based on if latesthumanmove draws
  switch (latestComputerMove) {
  }

  // decide based on if latesthumanmove wins or loses
  switch (latestHumanMove.innerHTML) {
    case "✊":
      if (latestHumanMove.classList.contains("winner")) {
        return SELECTIONS[1];
      } else {
        return SELECTIONS[0];
      }
    case "✋":
      if (latestHumanMove.classList.contains("winner")) {
        return SELECTIONS[2];
      } else {
        return SELECTIONS[1];
      }
    case "✌":
      if (latestHumanMove.classList.contains("winner")) {
        return SELECTIONS[0];
      } else {
        return SELECTIONS[2];
      }
    default:
      console.log("urmom");
  }
}
