var questionEle = document.getElementById("quizquestion");
var answersEle = document.getElementById("quizanswers");

var levelJSON;
var currentQuestion = 0;
var score = 0;
var canAnswer = true;
var badAnswers = [];

function setup(levelData) {
    levelJSON = levelData;

    currentQuestion = 0;
    score = 0;
    canAnswer = true;
    badAnswers = [];

    renderQuestion();
}

function renderQuestion() {
    questionEle.innerHTML = levelJSON.questions[currentQuestion].question;
    answersEle.innerHTML = "";
    for (i = 0; i < levelJSON.questions[currentQuestion].answers.length; i++) {
        answersEle.innerHTML += "<div class=\"quizanswer\" answerindex=\"" + i +"\">" +
        levelJSON.questions[currentQuestion].answers[i] + "</div>";
    }

    var answers = document.getElementsByClassName("quizanswer");
    for (i = 0; i < answers.length; i++) {
        answers[i].addEventListener("click", answerClick);
    }

    canAnswer = true;
}

function answerClick(e) {
    if (canAnswer) {
        canAnswer = false;
        var answerIndex = e.target.getAttribute("answerindex");
        if (answerIndex == levelJSON.questions[currentQuestion].correctAnswer) {
            score = score + 10;
        }
        else {
            badAnswers.push(currentQuestion);
        }

        var answers = document.getElementsByClassName("quizanswer");
        for (i = 0; i < answers.length; i++) {
            if (answers[i].getAttribute("answerindex") == levelJSON.questions[currentQuestion].correctAnswer) {
                answers[i].style.backgroundColor = "rgb(100, 255, 100)";
            }
            else {
                answers[i].style.backgroundColor = "rgb(255, 100, 100)";
            }
        }

        setTimeout(nextQuestion, 100);
    }
}

function nextQuestion() {
    if (currentQuestion + 1 != levelJSON.questions.length) {
        console.log("question++");

        document.getElementById("swart").style.height = "100vh";
        document.getElementById("swart").style.opacity = "1";

        setTimeout(function () {
            currentQuestion++;
            renderQuestion();

            setTimeout(function () {
                document.getElementById("swart").style.opacity = "0";
                setTimeout(function () { document.getElementById("swart").style.height = "0"; }, 500);
            }, 250);
        }, 500);
    }
    else {
        endQuiz();
    }
}

function endQuiz() {
    console.log("swart");

    document.getElementById("swart").style.height = "100vh";
    document.getElementById("swart").style.opacity = "1";

    setTimeout(function () {
        document.getElementById("end").style.display = "block";

        var canvas = document.getElementById("scorec");
        var ctx = canvas.getContext("2d");
        canvas.width = canvas.getBoundingClientRect().width;
        canvas.height = canvas.getBoundingClientRect().height;
        ctx.lineWidth = 2;
        ctx.font = canvas.width * 10 / 100 + "px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeText("Score: " + score + "/" + levelJSON.questions.length * 10, canvas.width / 2, canvas.height / 2);

        var badAnswersEle = document.getElementById("wrong-answers");
        badAnswersEle.innerHTML = "";
        badAnswersEle.innerHTML += "<h2>These were your wrong answers:</h2>";
        for (i = 0; i < badAnswers.length; i++) {
            var badQue = levelJSON.questions[badAnswers[i]];
            badAnswersEle.innerHTML += "<div class=\"wrong-answer\"><h1> " +
            badQue.question + "</h1><p>" + badQue.answers[badQue.correctAnswer] + "</p></div>";
        }

        document.getElementById("swart").style.opacity = "0";
        setTimeout(function () { document.getElementById("swart").style.height = "0"; }, 500);
    }, 750);

    console.log("end, score was " + score);
}

document.getElementById("btn-retry").addEventListener("click", restart);

function restart() {
    document.getElementById("swart").style.height = "100vh";
    document.getElementById("swart").style.opacity = "1";
    setTimeout(function() {
        document.getElementById("end").style.display = "";
        setup(levelJSON);
        setTimeout(function() {
            document.getElementById("swart").style.opacity = "0";
            setTimeout(function() { document.getElementById("swart").style.height = "0"; }, 500);
        }, 250);
    }, 500);
}

document.getElementById("btn-menu").addEventListener("click", toMenu);

function toMenu() {
    document.getElementById("swart").style.height = "100vh";
    document.getElementById("swart").style.opacity = "1";

    setTimeout(function() {
        document.getElementById("end").style.display = "";
        document.getElementById("main").style.display = "";
        setTimeout(function() {
            document.getElementById("swart").style.opacity = "0";
            setTimeout(function() { document.getElementById("swart").style.height = "0"; }, 500);
        }, 250);
    }, 500);

    var codeElement = document.getElementById("text");
    codeElement.style.backgroundColor = "";
    codeElement.removeAttribute("disabled");

    var btn = document.getElementById("btn-load");
    btn.setAttribute("enabled", "true");
    btn.style.backgroundColor = "";
    
    var canvas = document.getElementById("colorcode");
    canvas.style.height = "";

    document.getElementById("status").innerHTML = "Ready to load";
}