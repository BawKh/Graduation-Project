let currentUrl;
if (localStorage.selectedQuiz) {
    currentUrl = localStorage.getItem("selectedQuiz");
} else {
    localStorage.setItem("selectedQuiz", "html-questions.json");
    currentUrl = localStorage.getItem("selectedQuiz");
}
// Select elements
let countSpan = document.querySelector(".quiz-info .count span");
let categorySpan = document.querySelector(".quiz-info .category span");
let bulletsSpan = document.querySelector(".quiz-app .bullets-q .spans");
let bulletsRemove = document.querySelector(".bullets-q");
// let MyTests = document.querySelectorAll(".quiz-element");
let QuizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let ResultsView = document.querySelector(".results");
let countDownElement = document.querySelector(".countdown");
// MyTests = Array.from(MyTests);

// Set Options
let currentIndex = 0;
let theRightAnswers = 0;
let Chosen = currentUrl.split("-")[0];
console.log(Chosen);
let countDownInterval;
let RandomArray = [1, 2, 3, 4];
RandomArray = getRandomItems(RandomArray, 3);
getQuestions(`js/${currentUrl}`);
// Get Questions Function
function getQuestions(links = `../js/${currentUrl}`) {
    let MyRequest = new XMLHttpRequest();
    MyRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //   console.log(this.responseText);
            let questionsObject = JSON.parse(this.responseText);
            questionsObject = getRandomItems(Array.from(questionsObject), 9);
            let questionsCount = questionsObject.length;
            // Create Bullets and set Questions count

            if (bulletsSpan.hasChildNodes() === false) {
                createBullets(questionsCount);
            } else {
                removeAllChild(bulletsSpan);
                createBullets(questionsCount);
            }

            // Add Question Data
            addQuestionData(questionsObject[currentIndex], questionsCount);
            // Click On Submit
            submitButton.addEventListener("click", () => {
                RandomArray = getRandomItems(RandomArray, 3);
                // Get Right Answer
                let rightAnswer = questionsObject[currentIndex].right_answer;
                // Increase Index
                console.log(rightAnswer);
                // Check The Answer
                checkAnswer(rightAnswer, questionsCount);
                currentIndex++;

                // remove Previous Questions
                QuizArea.innerHTML = "";
                answersArea.innerHTML = "";

                // Add Question Data
                addQuestionData(questionsObject[currentIndex], questionsCount);
                // Handle Bullets Classes
                handleBullets();
                clearInterval(countDownInterval);
                countDown(60, questionsCount);
                // Show result
                showResults(questionsCount);
            });
            // count down
            countDown(60, questionsCount);
        }
    };

    MyRequest.open("GET", links, true);
    MyRequest.send();
}

// Function to handle button clicks
function handleButtonClick(event) {
    // MyTests.forEach((e) => {
    //   e.classList.remove("active");
    // });
    // event.currentTarget.classList.add("active");
    // let link = event.currentTarget.getAttribute("data_link");
    // restartQuiz();
    // currentUrl = link;
    localStorage.setItem(
        "selectedQuiz",
        event.currentTarget.getAttribute("data-link")
    );
    currentUrl = localStorage.getItem("selectedQuiz");
}

// Add a click event listener to each button only once
// MyTests.forEach((el) => {
//   // el.removeEventListener("click", (event) => {
//   //   handleButtonClick(event);
//   // }); // Remove any existing listeners to prevent duplicates
//   el.addEventListener("click", (event) => {
//     document.location.href = "quiz.html";
//     handleButtonClick(event);
//   });
// });

function createBullets(num) {
    countSpan.innerHTML = num;
    // create Spans
    for (let i = 0; i < num; i++) {
        let span = document.createElement("span");
        if (i === 0) {
            span.classList.add("on");
        }
        bulletsSpan.appendChild(span);
    }
}

function addQuestionData(obj, count) {
    if (currentIndex < count) {
        categorySpan.innerHTML = Chosen;

        function createH2() {
            // Create H2 question Title
            let QuestionTitle = document.createElement("h2");
            // Create questions Text
            let questionsText = document.createTextNode(obj.title);
            // Append Text To H2
            QuestionTitle.appendChild(questionsText);
            // Append H2 To QuizArea
            QuizArea.appendChild(QuestionTitle);
        }

        if (QuizArea.hasChildNodes() === false) {
            createH2();
        } else {
            removeAllChild(QuizArea);
            createH2();
        }

        // Create The Answers
        function createAnswers() {
            for (let i = 1; i <= 4; i++) {
                // Create Main Answer div
                let mainDiv = document.createElement("div");
                // Add Class To MAin Div
                mainDiv.classList.add("answer");
                // Change the order of the answer div
                mainDiv.style.order = `${RandomArray[i - 1]}`;
                // Create Radio Input
                let RadioInp = document.createElement("input");
                // Add Type + Name + Id + Data-Attribute
                RadioInp.setAttribute("type", "radio");
                RadioInp.setAttribute("name", "questions");
                RadioInp.setAttribute("id", `answer_${i}`);
                RadioInp.dataset.answer = obj[`answer_${i}`];
                // Make first question checked
                if (RandomArray[i - 1] === 1) {
                    RadioInp.checked = true;
                }
                // Create Label
                let theLabel = document.createElement("label");
                // Add For Attribute
                theLabel.htmlFor = `answer_${i}`;
                // Create Label Text
                let theLabelText = document.createTextNode(obj[`answer_${i}`]);
                // Append The Label Text To The Label Node
                theLabel.appendChild(theLabelText);
                // Append Radio and label to the main div
                mainDiv.appendChild(RadioInp);
                mainDiv.appendChild(theLabel);
                // append the main div to the answers-area
                answersArea.appendChild(mainDiv);
            }
        }
        if (answersArea.hasChildNodes() === false) {
            createAnswers();
        } else {
            removeAllChild(answersArea);
            createAnswers();
        }
    }
}

function removeAllChild(node) {
    while (node.firstChild) {
        node.removeChild(node.lastChild);
    }
}
// 1:07:43

function checkAnswer(rAnswer, count) {
    if (currentIndex < count) {
        let answers = document.getElementsByName("questions");
        answers = Array.from(answers);
        let theChosenAnswer;

        answers.forEach((el) => {
            if (el.checked) {
                theChosenAnswer = el.dataset.answer;
            }
        });
        if (rAnswer === theChosenAnswer) {
            console.log("Good Answer");
            theRightAnswers++;
        }
    }
}

function handleBullets() {
    let AllBulletsSpan = document.querySelectorAll(".bullets-q .spans span");
    AllBulletsSpan = Array.from(AllBulletsSpan);
    AllBulletsSpan.forEach((span, index) => {
        if (index === currentIndex) {
            span.classList.add("on");
        }
    });
}

// showResults function
function showResults(count) {
    let theResults;
    if (currentIndex === count) {
        QuizArea.style.display = "none";
        answersArea.style.display = "none";
        submitButton.style.display = "none";
        bulletsRemove.style.display = "none";
        let image_con = document.createElement("div");
        image_con.classList.add("image_container");
        let image_res = document.createElement("img");
        if (theRightAnswers >= count / 2 && theRightAnswers < count) {
            theResults = `<span class="good">Good</span> ${theRightAnswers} From ${count}`;
            image_res.setAttribute("src", "images/good.jpg");
        } else if (theRightAnswers === count) {
            theResults = `<span class="perfected">Perfect</span> ${theRightAnswers} From ${count}`;
            image_res.setAttribute("src", "images/perfect.jpg");
        } else {
            theResults = `<span class="bad">Bad</span> ${theRightAnswers} From ${count}`;
            image_res.setAttribute("src", "images/bad.jpg");
        }
        image_con.appendChild(image_res);
        ResultsView.innerHTML = theResults;
        ResultsView.appendChild(image_con);
        ResultsView.style.padding = "10px";
        ResultsView.style.backgroundColor = "#fff";
        ResultsView.style.textAlign = "center";
        let quizInfo = document.querySelector(".quiz-info");
        console.log(quizInfo.offsetHeight);
        ResultsView.style.height = `375px`;
    }
}

function restartDiv() {
    if (
        QuizArea.style.display === "none" &&
        answersArea.style.display === "none" &&
        submitButton.style.display === "none" &&
        bulletsRemove.style.display === "none"
    ) {
        QuizArea.style.display = "block";
        answersArea.style.display = "block";
        submitButton.style.display = "block";
        bulletsRemove.style.display = "flex";
    }
}

function countDown(duration, count) {
    if (currentIndex < count) {
        let minutes, seconds;
        countDownInterval = setInterval(function () {
            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);
            countDownElement.innerHTML = `
      <span class="minutes">${
          minutes < 10 ? `0${minutes}` : minutes
      }</span> : <span class="seconds">${
                seconds < 10 ? `0${seconds}` : seconds
            }</span>
      `;
            if (--duration < 0) {
                clearInterval(countDownInterval);
                submitButton.click();
            }
        }, 1000);
    }
}
// a group of random element
function getRandomItems(arr, n) {
    if (n > arr.length) {
        throw new Error("n is greater than array length");
    } else {
        let result = new Set();
        while (result.size <= n) {
            result.add(arr[Math.floor(Math.random() * arr.length)]);
        }
        return Array.from(result);
    }
}
// console.log(RandomArray);
// console.log(getRandomItems(RandomArray, 4));
function restartQuiz() {
    currentIndex = 0;
    restartDiv();
}
