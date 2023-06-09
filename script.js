var container = document.getElementById("container");
var bank = document.getElementById("bank");
var codeBox = document.getElementById("codeBox");
var answerBox = document.getElementById("answer-box");
var header = document.getElementById("header");
var selectionContainer = document.getElementById("selectionContainer");
var here = document.getElementById("your-code-here");

var retry = document.getElementById("retry");
retry.addEventListener("click", reset);
var check = document.getElementById("check");
check.addEventListener("click", checkAnswer);
var boxes;

function loadBoxes() {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      boxes = data;
      makeBoxes();
    })
    .catch(error => console.error('Error loading data:', error));
}

function makeBoxes() {
  for (var i = 0; i < boxes.length; i++) {
    var code = document.createElement("div");
    bank.appendChild(code);
    code.id = boxes[i].identifier;
    code.classList.add("box");
    code.classList.add(boxes[i].correct);
    code.innerHTML = boxes[i].data;
    code.addEventListener("click", moveBox);
  }
}

function moveBox() {
    if (bank.contains(this)) {
        if (answerBox.children.length < 2) {
          answerBox.appendChild(this);
        } else {
          bank.appendChild(answerBox.children[1]);
          answerBox.appendChild(this);
        }
        here.classList.add("disappear");
    } else {
      bank.appendChild(this);
      here.classList.remove("disappear");
    }
}

function checkAnswer() {
    var answer = answerBox.children;
    console.log(answer[1]);
    if (answer[1].classList.contains("true")) correct();
    else wrong();
    bank.classList.add("disabled");
    codeBox.classList.add("disabled");
    header.classList.add("disabled");
}

function wrong() {
    var el = document.getElementById("incorrect");
    el.classList.replace("disappear", "appear");
    selectionContainer.classList.replace("disappear", "appear");
}

function correct() {
    var correct = document.getElementById("correct");
    correct.classList.replace("disappear", "appear");
    selectionContainer.classList.replace("disappear", "appear");
}

function reset() {
    bank.classList.remove("disabled");
    codeBox.classList.remove("disabled");
    header.classList.remove("disabled");
    window.location.reload();
}

loadBoxes();