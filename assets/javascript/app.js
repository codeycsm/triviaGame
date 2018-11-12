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
  }
];

let guessTime = 10;
let correctGuesses = 0;
let incorrectGuesses = 0;
let questionsIndex = 0;

startGame();
// "Start" button click to begin trivia.
function startGame() {
  $("#startTrivia").on("click", function() {
    $("#startTrivia").css("display", "none");
    displayQuestion();
  });
}
// Displays the questions and answers to chose from
function displayQuestion() {
  $("#question").html(questions[questionsIndex].question);
  for (let i = 0; i < questions[questionsIndex].options.length; i++) {
    // console.log(questions[questionsIndex].options[i]);
    let option =
      "<div class='option'>" + questions[questionsIndex].options[i] + "</div>";
    $("#options").append(option);
  }
  checkAnswer();
}
// Checks if the answer the user clicked is the correct answer
function checkAnswer() {
  $(".option").on("click", function() {
    if ($(this).html() === questions[questionsIndex].answer) {
      correctGuesses++;
      questionsIndex++;
      console.log(correctGuesses + " correct guess");
      $("#question").empty();
      $("#options").empty();
    } else {
      incorrectGuesses++;
      questionsIndex++;
      $("#question").empty();
      $("#options").empty();
    }
  });
}
