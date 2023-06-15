var firstPage = document.getElementById('quiz');
var resultsDiv = document.getElementById('result');
var startButton = document.getElementById('start');
var questions = document.getElementById('questions');
var answerOption = document.getElementById('answer');
var que1 = document.getElementById('btn1');
var que2 = document.getElementById('btn2');
var que3 = document.getElementById('btn3');
var que4 = document.getElementById('btn4');
var mainEl = document.getElementById('main');
var studentInformation = document.querySelector('#studentInf');
var scoreTrue = 0;
var scoreFalse = 0;
var n = 0;
var questionschoiceRamdon = [];
var StopTimer = 0;
var minutesLeft = 1 * 60;
var timerElement = document.querySelector('.timer');
var answerEachTime = '';

//Show the timer
function showtimer() {
  timerElement.innerText = ('Time');
}

//Countdown function   
function countdownTimer() {
  showtimer();

  //Function that controls the countdown using setInterval property to help time-interval.
  var timeInterval = setInterval(function () {
    var countDownTime = document.getElementById('countdown');
    var minutes = Math.floor(minutesLeft / 60); // Convert seconds to minutes
    var seconds = minutesLeft % 60; 
    countDownTime.innerText = minutes + ' min ' + seconds + ' sec'; 
    minutesLeft--; 

    if (minutesLeft <= 0 || n === questionschoiceRamdon.length) {
      clearInterval(timeInterval);
      countDownTime.innerText = '';
      showResults();       
    }
  }, 1000);
}

//Loop to avoid same question on the Quiz.
function RamdonQuestion() {
  for (var i = 0; i < 2; i++) {
    var questionRamdon = Math.floor(Math.random() * list_Questions.length);
    if (questionschoiceRamdon[i] === questionschoiceRamdon[i - 1]) {
      questionRamdon = Math.floor(Math.random() * list_Questions.length);
    }
    questionschoiceRamdon.push(questionRamdon);
  }
}
RamdonQuestion();

//Function to start the quiz
function startQuiz() {
  if (n === 0) {
    resultsDiv.innerText = answerEachTime;
    firstPage.style.display = 'none';
    answerOption.style.display = "block";
    countdownTimer();
    var current = list_Questions[questionschoiceRamdon[n]];
    questions.innerHTML = current.Question;
    que1.innerHTML = current.Choices[0];
    que2.innerHTML = current.Choices[1];
    que3.innerHTML = current.Choices[2];
    que4.innerHTML = current.Choices[3];
  }
}
startButton.addEventListener('click', startQuiz);

//This function hides the second page when the quiz is finished
function hideSecondPage() {
  questions.style.display = 'none';
  que1.style.display = 'none';
  que2.style.display = 'none';
  que3.style.display = 'none';
  que4.style.display = 'none';
}

//Function to store the score
function answerChoice(answer) {
  var current = list_Questions[questionschoiceRamdon[n]];
  if (answer === current.Answer) {
    console.log(current.Answer);
    console.log('Correct');
    scoreTrue++;
    answerEachTime = 'Correct';
  } else {
    minutesLeft -= 20;
    console.log(current.Answer);
    console.log('Incorrect');
    scoreFalse++;
    answerEachTime = 'Incorrect';
  }

  n += 1;

  if (n < questionschoiceRamdon.length) {
    startQuiz();
  } else {
    showResults();
    console.log('Quiz finished');
    console.log('Correct answers:', scoreTrue);
    console.log('Incorrect answers:', scoreFalse);
  }
}

que1.onclick = function (event) {
  event.stopPropagation();
  answerChoice(que1.innerHTML);
};

que2.onclick = function (event) {
  event.stopPropagation();
  answerChoice(que2.innerHTML);
};

que3.onclick = function (event) {
  event.stopPropagation();
  answerChoice(que3.innerHTML);
};

que4.onclick = function (event) {
  event.stopPropagation();
  answerChoice(que4.innerHTML);
};

function showResults() {
  hideSecondPage();
  timerElement.innerText = '';
  studentInformation.style.display = 'block';
  resultsDiv.innerText = 'All done';
  resultsDiv.innerHTML += 'Your Final score is: ' + scoreTrue + '<br>';
}

var cleanScore = document.querySelector('#ClearScore');
var startQ = document.querySelector('.againQuiz');
var input = document.querySelector('#StudentInicial');
var submit = document.querySelector('#submitAction');
var USER_DATA_KEY = 'userData';

function clearData() { 
  input.value = '';
  scoreTrue = 0;
  scoreFalse = 0;
}

cleanScore.addEventListener('click', clearData);

function starAgain() {
  startQuiz();
  clearData();
}

startQ.addEventListener('click', starAgain);

function getUserData() {
  var rawData = localStorage.getItem(USER_DATA_KEY);
  var parsed = [];

  if (rawData !== null) {
    parsed = JSON.parse(rawData) || [];
  }

  return parsed;
}

function saveStudentData(arr) {
  var jsonArray = JSON.stringify(arr);
  localStorage.setItem(USER_DATA_KEY, jsonArray);
}

function CreateNewArray(eventObj) {
  eventObj.preventDefault();
  var el = eventObj.target;
  if (el.tagName === 'BUTTON') {
    var userScore = {
      True: scoreTrue,
      False: scoreFalse,
      name: input.value
    };
    var userArray = getUserData();
    userArray.push(userScore);
    saveStudentData(userArray);
    showResults();
    clearData();
    showScores();
  }
}

submit.addEventListener('click', CreateNewArray);

function showScores() {
  var users = getUserData();
  var scoresDiv = document.querySelector('.scores');

  scoresDiv.innerHTML = '';

  if (users.length === 0) {
    scoresDiv.innerHTML = '<p>No scores have been added</p>';
  } else {
    var ul = document.createElement('ul');

    for (var i = 0; i < users.length; i++) {
      var li = document.createElement('li');
      li.innerText = 'Name: ' + users[i].name + ' , Score: ' + users[i].True ;
      ul.appendChild(li);
    }

    scoresDiv.appendChild(ul);
  }
}

showScores();
    


