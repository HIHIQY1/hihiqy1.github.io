document.getElementById("btn-queplus").addEventListener("click", quePlus);
document.getElementById("btn-quemin").addEventListener("click", queMin);
document.getElementById("btn-queprev").addEventListener("click", quePrev);
document.getElementById("btn-quenext").addEventListener("click", queNext);
document.getElementById("btn-ansplus").addEventListener("click", addAns);
document.getElementById("btn-ansmin").addEventListener("click", remAns);
document.getElementById("btn-savequestion").addEventListener("click", save);
document.getElementById("btn-get").addEventListener("click", getCode);
document.getElementById("btn-loadfromcode").addEventListener("click", loadFromCode);

var levelJSON;
var selectedQuestion = 0;

function setUP() {
    levelJSON = {
        "name": "",
        "author": "",
        "creationDate": "",
        "questions": [
            {
                "question": "",
                "answers": [
                    ""
                ],
                "correctAnswer": 0
            }
        ]
    };
    fillIn();
    console.log("endsetup");
} setUP();

function quePlus() {
    levelJSON.questions.push({
        "question": "",
        "answers": [
            ""
        ],
        "correctAnswer": 0
    });

    save();
    fillIn();
}

function queMin() {
    if (levelJSON.questions.length - 1 > 0) {
        levelJSON.questions.pop();
    }

    save();
    if (selectedQuestion == levelJSON.questions.length) {
        selectedQuestion = levelJSON.questions.length - 1;
    }
    fillIn();
}

function quePrev() {
    save();

    if (selectedQuestion - 1 >= 0) {
        selectedQuestion--;
    }

    fillIn();
}

function queNext() {
    save();

    if (selectedQuestion + 1 <= levelJSON.questions.length - 1) {
        selectedQuestion++;
    }

    fillIn();
}

function questionCount() {
    document.getElementById("questionnumber").innerHTML = "Question " + selectedQuestion + " out of " + (levelJSON.questions.length - 1);
}

function fillIn() {
    questionCount();

    document.getElementById("name").value = levelJSON.name;
    document.getElementById("author").value = levelJSON.author;

    document.getElementById("question").value = levelJSON.questions[selectedQuestion].question;

    var answersElement = document.getElementById("answers");
    answersElement.innerHTML = "";
    for (i = 0; i < levelJSON.questions[selectedQuestion].answers.length; i++) {
        var answer = levelJSON.questions[selectedQuestion].answers[i];
        answersElement.innerHTML += "<input class=\"answer\" value=" + JSON.stringify(levelJSON.questions[selectedQuestion].answers[i]) +">" +
        "<input type=\"radio\" class=\"correct-answer\" name=\"correct-answer\">" +
        "<span></span><br>";
    }

    var answersDiv = document.getElementById("answers");
    var answersDivChilds = answersDiv.children;
    answersDivChilds[1 + levelJSON.questions[selectedQuestion].correctAnswer * 4].checked = true;
}

function addAns() {
    levelJSON.questions[selectedQuestion].answers.push("");
    save();
    fillIn();

    focusLastAnswer();
}

function remAns() {
    if (levelJSON.questions[selectedQuestion].answers.length > 1) {
        levelJSON.questions[selectedQuestion].answers.pop();
    }
    fillIn();
    save();

    focusLastAnswer();
}

function save() {
    levelJSON.name = document.getElementById("name").value;
    levelJSON.author = document.getElementById("author").value;
    levelJSON.lastEdited = new Date();
    
    levelJSON.questions[selectedQuestion].question = document.getElementById("question").value;
    
    var answersDiv = document.getElementById("answers");
    var answersDivChilds = answersDiv.children;
    for (i = 0; i < answersDivChilds.length; i += 4) {
        var answerValue = answersDivChilds[i].value;
        levelJSON.questions[selectedQuestion].answers[i / 4] = answerValue;
    }
    for (i = 1; i < answersDivChilds.length; i += 4) {
        if (answersDivChilds[i].checked) {
            levelJSON.questions[selectedQuestion].correctAnswer = (i - 1) / 4;
        }
    }
}

function getCode() {
    save();
    document.getElementById("code").value = btoa(JSON.stringify(levelJSON));
    console.log("base64 code is " + btoa(JSON.stringify(levelJSON)).length);
    console.log("json.stringify code is " + JSON.stringify(levelJSON).length);
    console.log("base64 code is " + (btoa(JSON.stringify(levelJSON)).length - JSON.stringify(levelJSON).length) + " characters more than json.stringify code")
}

function loadFromCode() {
    var answer = prompt("Are you sure you want to load from code?\nAll your current questions will be erased from memory!\nType \"yes\" to confirm your choice.");
    if (answer == "yes") {
        var newCode = atob(document.getElementById("code").value);
        answer = prompt("Are you REALLY SURE?\nType \"YES\" to confirm your choice.");
        if (answer == "YES") {
            levelJSON = JSON.parse(newCode);
            fillIn();
        }
    }
}

function focusLastAnswer() {
    var answersDiv = document.getElementById("answers");
    var answersDivChilds = answersDiv.children;
    answersDivChilds[answersDivChilds.length - 4].focus();
}