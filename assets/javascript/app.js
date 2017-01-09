function populate(){

    if(quiz.isEnded()) {
         showScores();


    }

    else{
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show choices

        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++){
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);

        }

        countDown();

        showProgress();
    }

};

function guess (id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();

    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;

};

function countDown() {
    var element = document.getElementById("time");
    element.innerHTML = "You have " + quiz.secs + " seconds left";
    if(quiz.secs < 1) {
        clearTimeout(timer);
        element.innerHTML = "Time is Up";
        var element = document.getElementById("question");
        element.innerHTML = "The Correct answer is: " + quiz.getQuestionIndex().answer;
        console.log(timer);
        quiz.out();

    };
    quiz.secs--;
    var timer = setTimeout('countDown()', 1000);


};


function showScores(){

    var gameOverHTML = "<h1>Result</h1>";
        gameOverHTML += "<h2 id='score'> Your Score: " + quiz.score +  " out of " + quiz.questions.length + "</h2>";

    var element = document.getElementById("quiz");
        element.innerHTML = gameOverHTML;

}


var questions = [

    new Question("On what date was Monty Python's Flying Circus first broadcast on BBC2", ["20 July 1969", "5 October 1969", "6 January 1970", "15 August 1982"], "5 October 1969"),
    new Question("In the Dead Parrot sketch, what species of parrot was no more?", ["Danish Green", "Norwegian Blue", "Chinese Red", "Swedish Yellow"], "Norwegian Blue"),
    new Question("What did the Knights Who Say Ni ask King Arthur to bring them?", ["A Garnish", "An Orange", "A Shrubbery", "FLowers"], "A Shrubbery"),
    new Question("In The Life of Brian, what was Brian's surname?", ["Cohen", "Levy", "Solomons", "Judah"], "Cohen"),
    new Question("Which member of the team said Nudge, nudge, wink, wink, say no more?", ["Eric Idle", "Terry Jones", "Michael Palin", "Kurt Douglas"], "Eric Idle")
    ];

var quiz = new Quiz(questions);

populate();
