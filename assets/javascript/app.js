$(document).ready(function() {
  startTrivia();
});

let questions = [
  {
    question: "What planet in our solar system is the biggest?",
    options: ["Neptune", "Saturn", "Jupiter", "Mercury"],
    answer: "Jupiter"
  },
  {
    question: "Which planet is the closest to the sun?",
    options: ["Earth", "Mercury", "Venus", "Mars"],
    answer: "Mercury"
  },
  {
    question: "How many planets in our solar system have rings?",
    options: [5, 1, 4, 7],
    answer: 4
  },
  {
    question: "Which planet is a dwarf planet?",
    options: ["Venus", "Uranus", "Mars", "Pluto"],
    answer: "Pluto"
  }
];

let correctGuesses = 0;
let incorrectGuesses = 0;
let questionsIndex = 0;
let guessTime = 10;
let timer = null;

// "Start" button click to begin trivia.
function startTrivia() {
  clearInterval(timer);
  $("#startTrivia").on("click", function() {
    $("#startTrivia").css("display", "none");
    displayQuestion();
  });
}
// Displays the questions and answers to chose from
function displayQuestion() {
  clearInterval(timer);
  $("#question,#answer,#options").empty();
  $("#question").html(questions[questionsIndex].question);
  for (let i = 0; i < questions[questionsIndex].options.length; i++) {
    let option =
      "<div class='option'>" + questions[questionsIndex].options[i] + "</div>";
    $("#options").append(option);
  }
  startTimer();
}
// timer for each question
function startTimer() {
  timer = setInterval(function() {
    $("#timer").html(guessTime);
    if (guessTime === 0) {
      clearInterval(timer);
      incorrectGuesses++;
      guessTime = 10;
      triviaOver();
    }
    guessTime--;
  }, 1000);

  $(".option").on("click", function() {
    clearInterval(timer);
    guessTime = 10;
    checkGuess(this);
  });
}
// Checks if the answer the user clicked is the correct answer
function checkGuess(guess) {
  clearInterval(timer);
  if ($(guess).html() == questions[questionsIndex].answer) {
    correctGuesses++;
    $("#answer").html(
      "You guessed " + questions[questionsIndex].answer + " correctly"
    );
  } else {
    incorrectGuesses++;
    $("#answer").html(
      "The correct answer is: " + questions[questionsIndex].answer
    );
  }
  setTimeout(function() {
    triviaOver();
  }, 1500);
}
// check if player finished the trivia game
function triviaOver() {
  clearInterval(timer);
  if (questionsIndex === questions.length - 1) {
    $("#question").html("Answered correctly: " + correctGuesses);
    $("#options").html("Answered incorrectly: " + incorrectGuesses);
    $("#answer").html(
      "Score: " + (correctGuesses / questions.length) * 100 + "%"
    );
    setTimeout(function() {
      reset();
    }, 6000);
  } else {
    questionsIndex++;
    setTimeout(function() {
      displayQuestion();
    }, 1500);
  }
}
// reset trivia game
function reset() {
  clearInterval(timer);
  guessTime = 10;
  questionsIndex = 0;
  correctGuesses = 0;
  incorrectGuesses = 0;
  $("#timer").html(guessTime);
  $("#question,#options,#answer").empty();
  $("#startTrivia").css("display", "inline-block");
  startTrivia();
}
