let questionEle = document.getElementById("quizquestion");
let answersEle = document.getElementById("quizanswers");
let Pb_Score = document.getElementById("scorebar");
let Pb_Score_Opposite = document.getElementById("scorebar-opposite");

document.getElementById("btn-retry").addEventListener("click", restart);

let levelJSON;
let currentQuestion = 0;
let score = 0;
let canAnswer = true;
let badAnswers = [];
let correct = [], wrong = [], available = [];

function setupQuiz(levelData) {
    levelJSON = levelData;

    for (let i = 0; i < levelJSON.questions.length; i++) {
        available.push(i);
    }

    currentQuestion = available[Math.floor(Math.random() * available.length)];
    score = 0;
    canAnswer = true;
    badAnswers = [];

    renderQuestion();
}

function renderQuestion() {
    questionEle.innerText = levelJSON.questions[currentQuestion].question;
    while (answersEle.lastChild) {
        answersEle.removeChild(answersEle.lastChild);
    }
    for (let i = 0; i < levelJSON.questions[currentQuestion].answers.length; i++) {
        let quizAnswer = document.createElement("div");
        quizAnswer.classList.add("quizanswer");
        quizAnswer.setAttribute("answerindex", i);
        quizAnswer.innerText = levelJSON.questions[currentQuestion].answers[i];
        quizAnswer.addEventListener("click", () => answerClick(i));
        answersEle.appendChild(quizAnswer);

        //answersEle.innerHTML += "<div class=\"quizanswer\" answerindex=\"" + i + "\">" +
        //    levelJSON.questions[currentQuestion].answers[i] + "</div>";
    }

    canAnswer = true;
}

function answerClick(answerIndex) {
    if (canAnswer) {
        canAnswer = false;
        //let answerIndex = e.target.getAttribute("answerindex");
        if (answerIndex == levelJSON.questions[currentQuestion].correctAnswer) {
            score += 10;
            correct.push(currentQuestion);
            if (wrong.includes(currentQuestion)) {
                wrong = wrong.filter(e => e != currentQuestion);
            }
        }
        else {
            score -= 5;
            badAnswers.push(currentQuestion);
            if (!wrong.includes(currentQuestion)) {
                wrong.push(currentQuestion);
            }
        }
        available = available.filter(e => e != currentQuestion);

        let answerElements = document.getElementsByClassName("quizanswer");
        for (i = 0; i < answerElements.length; i++) {
            if (answerElements[i].getAttribute("answerindex") == levelJSON.questions[currentQuestion].correctAnswer) {
                answerElements[i].classList.add("goodanswer");
            }
            else {
                answerElements[i].classList.add("badanswer");
            }
        }

        setTimeout(nextQuestion, 100);
    }
}

function nextQuestion() {
    if (available.length || wrong.length) {
        document.getElementById("swart").style.height = "100vh";
        document.getElementById("swart").style.opacity = "1";

        setTimeout(() => {
            if (available.length) {
                currentQuestion = available[Math.floor(Math.random() * available.length)];
            } else if (wrong.length) {
                currentQuestion = wrong[Math.floor(Math.random() * wrong.length)];
            }
            renderQuestion();

            setTimeout(() => {
                document.getElementById("swart").style.opacity = "0";
                setTimeout(() => { document.getElementById("swart").style.height = "0"; }, 500);
            }, 250);
        }, 500);
    }
    else {
        endQuiz();
    }
}

function endQuiz() {
    document.getElementById("swart").style.height = "100vh";
    document.getElementById("swart").style.opacity = "1";

    if (score < 0) {
        score = 0;
    }

    setTimeout(() => {
        Pnl_Quiz.style.display = "none";
        document.getElementById("end").style.display = "block";

        let canvas = document.getElementById("scorec");
        let ctx = canvas.getContext("2d");
        canvas.width = canvas.getBoundingClientRect().width;
        canvas.height = canvas.getBoundingClientRect().height;
        ctx.lineWidth = 2;
        ctx.font = canvas.width / 30 + "px Arial";
        ctx.textBaseline = "top";
        ctx.textAlign = "center";
        ctx.fillStyle = "rgb(240, 240, 240)";
        ctx.fillText("Score:", canvas.width / 2, 0);
        ctx.font = canvas.width / 12 + "px Arial";
        ctx.textBaseline = "bottom";
        ctx.fillText(score + "/" + levelJSON.questions.length * 10, canvas.width / 2, canvas.height);

        let badAnswersEle = document.getElementById("wrong-answers");
        badAnswersEle.innerHTML = "";
        if (badAnswers.length) {
            {
                let H1_WrongAnswers = document.createElement("h2");
                badAnswersEle.appendChild(H1_WrongAnswers);
            }
            for (i = 0; i < badAnswers.length; i++) {
                let badQue = levelJSON.questions[badAnswers[i]];
                let Div_WrongAnswer = document.createElement("div");
                Div_WrongAnswer.classList.add("wrong-answer");

                let WrongAnswerHeader = document.createElement("h1");
                WrongAnswerHeader.innerText = badQue.question;
                Div_WrongAnswer.appendChild(WrongAnswerHeader);

                let WrongAnswerParagraph = document.createElement("p");
                WrongAnswerParagraph.innerText = badQue.answers[badQue.correctAnswer];
                Div_WrongAnswer.append(WrongAnswerParagraph);
            }
        }

        document.getElementById("swart").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("swart").style.height = "0";
            Pb_Score.style.width = (score / 10) / levelJSON.questions.length * 100 + "%";
            Pb_Score_Opposite.style.width = (100 - (score / 10) / levelJSON.questions.length * 100) + "%";
        }, 500);
    }, 750);
}

function restart() {
    document.getElementById("swart").style.height = "100vh";
    document.getElementById("swart").style.opacity = "1";
    setTimeout(() => {
        document.getElementById("end").style.display = "";
        Pb_Score.style.width = "";
        Pb_Score_Opposite.style.width = "";
        Pnl_Quiz.style.display = "initial";
        setupQuiz(levelJSON);
        setTimeout(() => {
            document.getElementById("swart").style.opacity = "0";
            setTimeout(() => {
                document.getElementById("swart").style.height = "0";
            }, 500);
        }, 250);
    }, 500);
}

document.getElementById("btn-menu").addEventListener("click", toMenu);

function toMenu() {
    document.getElementById("swart").style.height = "100vh";
    document.getElementById("swart").style.opacity = "1";

    setTimeout(() => {
        document.getElementById("end").style.display = "";
        Pb_Score.style.width = "";
        Pb_Score_Opposite.style.width = "";
        document.getElementById("main").style.display = "";
        setTimeout(() => {
            document.getElementById("swart").style.opacity = "0";
            setTimeout(() => { document.getElementById("swart").style.height = "0"; }, 500);
        }, 250);
    }, 500);

    let codeElement = document.getElementById("text");
    codeElement.style.backgroundColor = "";
    codeElement.removeAttribute("disabled");

    let btn = document.getElementById("btn-load");
    btn.setAttribute("enabled", "true");
    btn.style.backgroundColor = "";
}