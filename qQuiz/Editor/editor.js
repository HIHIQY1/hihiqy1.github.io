document.getElementById("btn-queplus").addEventListener("click", quePlus);
document.getElementById("btn-quemin").addEventListener("click", queMin);
document.getElementById("btn-queprev").addEventListener("click", quePrev);
document.getElementById("btn-quenext").addEventListener("click", queNext);
document.getElementById("btn-ansplus").addEventListener("click", addAns);
document.getElementById("btn-ansmin").addEventListener("click", remAns);
document.getElementById("btn-savequestion").addEventListener("click", save);
document.getElementById("btn-get").addEventListener("click", getCode);
document.getElementById("btn-loadfromcode").addEventListener("click", loadFromCode);

let levelJSON;
let selectedQuestion = 0;

setupQuiz();

function setupQuiz() {
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
}

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
    document.getElementById("questionnumber").innerHTML = "Question " + (selectedQuestion + 1) + " out of " + levelJSON.questions.length;
}

function fillIn() {
    questionCount();

    document.getElementById("name").value = levelJSON.name;
    document.getElementById("author").value = levelJSON.author;

    document.getElementById("question").value = levelJSON.questions[selectedQuestion].question;

    let answersElement = document.getElementById("answers");
    answersElement.innerHTML = "";
    for (i = 0; i < levelJSON.questions[selectedQuestion].answers.length; i++) {
        let answer = levelJSON.questions[selectedQuestion].answers[i];
        answersElement.innerHTML += "<input class=\"answer\" value=" + JSON.stringify(levelJSON.questions[selectedQuestion].answers[i]) + ">" +
            "<input type=\"radio\" class=\"correct-answer\" name=\"correct-answer\">" +
            "<span></span><br>";
    }

    let answersDiv = document.getElementById("answers");
    let answersDivChilds = answersDiv.children;
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

    let answersDiv = document.getElementById("answers");
    let answersDivChilds = answersDiv.children;
    for (i = 0; i < answersDivChilds.length; i += 4) {
        let answerValue = answersDivChilds[i].value;
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
    try {
        document.getElementById("code").value = LZString.compressToUTF16(JSON.stringify(levelJSON));
        console.log(document.getElementById("code").value.length / btoa(JSON.stringify(levelJSON)).length * 100 + "%");
    } catch {
        document.getElementById("code").value = btoa(JSON.stringify(levelJSON));
        console.log("LZString library wasn't available. Used default Base64 encoding instead.");
    }
}

function loadFromCode() {
    let answer = prompt("Are you sure you want to load from code?\nAll your current questions will be erased from memory!\nType \"yes\" to confirm your choice.");
    if (answer == "yes") {
        let newCode;
        try {
            newCode = atob(document.getElementById("code").value);
        }
        catch {
            newCode = LZString.decompressFromUTF16(document.getElementById("code").value);
        }
        console.log(newCode);
        answer = prompt("Are you REALLY SURE?\nType \"YES\" to confirm your choice.");
        if (answer == "YES") {
            levelJSON = JSON.parse(newCode);
            fillIn();
        }
    }
}

function focusLastAnswer() {
    let answersDiv = document.getElementById("answers");
    let answersDivChilds = answersDiv.children;
    answersDivChilds[answersDivChilds.length - 4].focus();
}