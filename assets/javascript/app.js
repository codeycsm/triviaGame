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
    options: [5, 1, 7, 4],
    answer: 4
  },
  {
    question: "Which object use to be a planet but is now a dwarf planet?",
    options: ["Pluto", "Venus", "Uranus", "Mars"],
    answer: "Pluto"
  },
  {
    question: "What is the name of the galaxy our solar system lives?",
    options: ["Andromeda", "Tadpole", "Whirlwind", "Milky Way"],
    answer: "Milky Way"
  },
  {
    question: "Which man made satellite has travled the farthest?",
    options: ["Aura", "Voyager 1", "CALIPSO", "PARASOL"],
    answer: "Voyager 1"
  },
  {
    question: "Which planet is considered Earth's sister planet?",
    options: ["Mars", "Neptune", "Venus", "Saturn"],
    answer: "Venus"
  },
  {
    question: "The _____ ______ lies between Mars and Jupiter?",
    options: ["Ceres", "Ort Cloud", "Astroid Belt", "Halley's Comet"],
    answer: "Astroid Belt"
  },
  {
    question: "How often does Halley's Comet appear?",
    options: [
      "About 75 years",
      "About 70 years",
      "About 45 years",
      "About 100 years"
    ],
    answer: "About 75 years"
  },
  {
    question: "Which planet is farthest from the sun?",
    options: ["Neptune", "Jupiter", "Saturn", "Pluto"],
    answer: "Neptune"
  }
];

let correctGuesses = 0;
let incorrectGuesses = 0;
let questionsIndex = 0;
let guessTime = 10;
let timer = null;

// "Start" button click to begin trivia.
function startTrivia() {
  $("#timer").html(guessTime);
  $("#startTrivia").on("click", function() {
    $("#startTrivia").css("display", "none");
    displayQuestion();
  });
}
// Displays the questions and answers to chose from
function displayQuestion() {
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
  clearInterval(timer);
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
    $(".option").unbind();
    $("#question, #options").empty("slow");
    checkGuess(this);
  });
}
// Checks if the answer the user clicked is the correct answer
function checkGuess(guess) {
  let correctIcon = "<i class='fas fa-check' id='right'></i>";
  let incorrectIcon = "<i class='fas fa-times' id='wrong'></i>";
  if ($(guess).html() == questions[questionsIndex].answer) {
    correctGuesses++;
    $("#answer").html(
      correctIcon +
        " You guessed " +
        questions[questionsIndex].answer +
        " correctly."
    );
  } else {
    incorrectGuesses++;
    $("#options").html(incorrectIcon + " You guessed: " + $(guess).text());
    $("#answer").html(
      correctIcon +
        " The correct answer is: " +
        questions[questionsIndex].answer
    );
  }
  setTimeout(function() {
    triviaOver();
  }, 1500);
}
// check if player finished the trivia game
function triviaOver() {
  if (questionsIndex === questions.length - 1) {
    $("#question").html("Answered correctly: " + correctGuesses);
    $("#options").html("Answered incorrectly: " + incorrectGuesses);
    $("#answer").html(
      "Score: " + Math.round((correctGuesses / questions.length) * 100) + "%"
    );
    $("#startTrivia")
      .html("Retake")
      .css("display", "inline-block");
    $("#startTrivia").on("click", function() {
      reset();
    });
  } else {
    questionsIndex++;
    setTimeout(function() {
      displayQuestion();
    }, 1500);
  }
}
// reset trivia game
function reset() {
  guessTime = 10;
  questionsIndex = 0;
  correctGuesses = 0;
  incorrectGuesses = 0;
  $("#question,#options,#answer").empty();
  displayQuestion();
}
