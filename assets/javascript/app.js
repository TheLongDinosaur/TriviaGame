
// this will clear the start button as soon as it is clicked
$("#start").on("click", function() {
    $("#outSpacetwo").remove();
    game.loadQuestion();
    console.log(loadQuestion);
})

// this will log the answer clicked
$(document).on("click", ".answer-button", function(e) {
    game.clicked(e);
})

// a reset option is supposed to become available at the end of the game,
// but currently does not show up properly
$(document).on("click", "#reset", function() {
    game.reset();
})

// these are our questions, available answers, correct answers and accompanying image, which is
// supposed to appear after the answer has been selected, or time runs out
var questions = [{
    question: "Where is the Sea of Tranquility?",
    answerOptions: ["Neptune", "The Triangulum Galaxy", "Saturn", "The Moon", "Andromeda II"],
    correctAnswer: "The Moon",
    image: "../images/mare_tranquillitatis.jpeg"
  },  {
    question: "Who is often considered The Father of Modern Rocketry?",
    answerOptions: ["Herman Oberth", "Konstantin Tsiolkovsky", "Albert Einstein", "Robert H. Goddard", "Neil Armstrong"],
    correctAnswer: "Hermann Oberth", // Robert H. Goddard would have also been correct
    image: "../images/hermann_oberth.jpeg",
  },  {
    question: "When was the first rendezvous between two manned spacecraft?",
    answerOptions: ["Soyuz 2 and Soyuz 3", "Gemini 3 and Titan II", "Vostok 3 and Skylab", "Apollo and Salyut", "Gemini 6 and Gemini 7"],
    correctAnswer: "Gemini 6 and Gemini 7",
    image: "../images/gem_6_7_meet.jpeg"
  },  {
    question: "What is the name of the largest volcano in the solar system?",
    answerOptions: ["Pillan Patera", "Mons Hansteen", "Sotra Patera", "Olympus Mons", "Doom Mons"],
    correctAnswer: "Olympus Mons",
    image: "../images/olympus_mons.jpeg"
  },  {
    question: "Who was the first American woman in space?",
    answerOptions: ["Samantha Cristoforetti", "Mae Jemison", "Sally Ride", "Yelena V. Kondakova", "Judith Resnik"],
    correctAnswer: "Sally Ride",
    image: "../images/sally_ride.jpeg"
  },  {
    question: "Who made the first U.S. spacewalk?",
    answerOptions: ["Buzz Aldrin", "Ed White", "Daniel Bursch", "Neil Armstrong", "Scott Carpenter"],
    correctAnswer: "Ed White",
    image: "../images/ed_white_spacewalk.jpeg"
}]

// this sets our game variables and defines the countdown function
var game = {
    questions:questions,
    currentQuestion:0,
    counter:30,
    correct:0,
    incorrect:0,
    countDown: function() {
        game.counter--;
        $("#counter").html(game.counter);
        if(game.counter <= 0) {
            console.log("Time is up!");
            game.timeUp();
        }

    // this is supposed to load the questions
    // currently the console states this function is undefined,
    // though it seems to work for the most part :-\
    },
    loadQuestion: function() {
        timer = setInterval(game.countDown, 1000);        
        $("#outerSpacetwo").html("<h2> Seconds remaining <span id='counter'>30</span></h2>");
        $("#outerSpacetwo").append("<h2>" + questions[game.currentQuestion].question + "</h2>");
        for(var i=0; i < questions[game.currentQuestion].answerOptions.length; i++) {
            $("#outerSpacetwo").append("<button class='answer-button' id='button- " +i+ " ' data-name= '" + questions[game.currentQuestion].answerOptions[i] + " '> " + questions[game.currentQuestion].answerOptions[i] + " </button>");
            console.log(loadQuestion);
        }
    },

    // moves to the next question once answer is chosen for previous question
    // or time runs out, and resets the counter
    nextQuestion: function() {
        game.counter = 30;
        $("#counter").html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },

    // this is the function which sets the counter back to 0 if time has run out
    // and also displays the correct answer
    timeUp: function() {
        clearInterval(timer);
        game.unanswered++;
        $("#outerSpacetwo").html("<h2>You ran out of time!</h2>");
        $("#outerSpacetwo").append("<h3>The correct answer was: " + questions[game.currentQuestion].correctAnswer + " </h3>");
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results, 3*1000);
        } else {
            setTimeout(game.nextQuestion, 3*1000);
        }
    },

    // this displays the results when all of the questions have run through and is
    // supposed to display a reset button
    // this function only behaves correctly if you let the timer run out on all the
    // questions
    // otherwise, if you select any answers, it never appears
    results: function() {
        clearInterval(timer);
        $("#outerSpacetwo").html("<h2>Your final score</h2");
        $("#outerSpacetwo").append("<h3>Correct: " + game.correct + " </h3>");
        $("#outerSpacetwo").append("<h3>Incorrect: " + game.incorrect + " </h3>");
        $("#outerSpacetwo").append("<h3>Unanswered: " + game.unanswered + " </h3>");
        $("#outerSpacetwo").append("<button id='reset'>Reset</button>");
    },

    // this takes the user input and records whether they answered the question
    // correctly, or if the got it wrong and runs the function for correct answer
    // or incorrect answer accordingly
    clicked: function(e) {
        clearInterval(timer);
        if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer) {
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }
    },

    // displays if the question was answered correctly, resets the counter and 
    // moves on to the next question
    answeredCorrectly: function() {
        clearInterval(timer);
        game.correct++;
        $("#outerSpacetwo").html("<h2>You are correct!</h2>");
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results, 3*1000);
        } else {
            setTimeout(game.nextQuestion, 3*1000);
        }
    },

    // displays if the user answered incorrectly, shows the correct answer,
    // resets the counter and moves to the next question
    answeredIncorrectly: function() {
        clearInterval(timer);
        game.incorrect++;
        $("#outerSpacetwo").html("<h1>Wrong!</h>");
        $("#outerSpacetwo").append("<h3>The correct answer was: "+questions[game.currentQuestion].correctAnswer+" </h3>");
            if(game.currentQuestion==questions.length-1) {
        } else {
            setTimeout(game.nextQuestion, 3*1000);
        }
    },
    
    // resets the game via a reset button, which currently does not appear :-(
    // clears the counter and number of questions answered, as well as the number
    // answered correctly and incorrectly
    reset: function(){
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();

    }
}