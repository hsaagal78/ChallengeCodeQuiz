
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


var scoreTrue = 0;
var scoreFalse = 0;
var n = 0;
var questionschoiceRamdon = [];
var StopTimer = 0;
var minutesLeft = 1 * 60;
var timerElement = document.querySelector('.timer');
var   answerEachTime= '';




//Show the timer
function showtimer() {
    timerElement.innerText = ('Time');
}


//Countdown funtion   
function countdownTimer() {

    showtimer();

    //Funtion that control the countdown using setInterval propety that help time-interval.
    var timeInterval = setInterval(function () {
        var countDownTime = document.getElementById('countdown');
        var minutes = Math.floor(minutesLeft / 60); // Convert seconds to minutes
        var seconds = minutesLeft % 60; 
        countDownTime.innerText = minutes + ' min ' + seconds + ' sec'; 
        minutesLeft--; 

        if (minutesLeft <= 0 || n === questionschoiceRamdon.length) {
            clearInterval(timeInterval);
            countDownTime.innerText = '';
            finisheQuiz();       
        }
       
    }, 1000);
}



//loop avoid same question on the Quiz.
for (var i = 0; i < 2; i++) {
    var questionRamdon = Math.floor(Math.random() * list_Questions.length);
    if (questionschoiceRamdon[i] === questionschoiceRamdon[i - 1]) {
        questionRamdon = Math.floor(Math.random() * list_Questions.length);
    }
    questionschoiceRamdon.push(questionRamdon);

}



//Funtion to start the quiz
function startQuiz() {
    // starOneMoreTime.style.display = 'none';// hide the start the quiz
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
startButton.addEventListener('click',startQuiz);



// this funtion hide in the moment finished the quiz
function hideSecondPage() {
    
    questions.style.display = 'none';
    que1.style.display = 'none';
    que2.style.display = 'none';
    que3.style.display = 'none';
    que4.style.display = 'none';
}


//Funtion to store the score
function answerChoice(answer) {

    var current = list_Questions[questionschoiceRamdon[n]];
    if (answer === current.Answer) {
        console.log(current.Answer);
        console.log('Correct');
        scoreTrue++;
        answerEachTime='Correct'
        

    } else {
        minutesLeft -=20;
        console.log(current.Answer);
        console.log('Incorrect');

        scoreFalse++;
        answerEachTime= 'Incorrect';
    }

    n += 1;

    if (n < questionschoiceRamdon.length) {

        startQuiz();
       


    } else {
        
        finisheQuiz();
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

function finisheQuiz() {
    
    hideSecondPage();
    timerElement.innerText = '';
    studentInformation.style.display = 'block';
    resultsDiv.innerText = 'All done';
    resultsDiv.innerHTML += 'Your Final score is: ' + scoreTrue + '<br>';

  }
///////////////////////////////////////////////////////////////////////
var studentInformation = document.querySelector('#studentInf');
 var cleanScore= document.querySelector('#ClearScore');
 var startQ= document.querySelector('.againQuiz');
//  var input = document.querySelector('#StudentInicial');

 var submit = document.querySelector('#submitAction');

 function starAgain() {

    startQuiz();
    clearData()


 }
 startQ.addEventListener('click', starAgain);


  function clearData() { 
    input.value = '';
    scoreTrue= 0;
    scoreFalse=0;
    startQuiz();

  }

  cleanScore.addEventListener('click', clearData)

  function getUserData() {
    var rawData = localStorage.getItem(input.value);
    var parsed = JSON.parse(rawData) || [];
   
  return parsed;
  }
  
  function saveStudentData(arr) {
    var jsonArray = JSON.stringify(arr);
    localStorage.setItem(input.value, jsonArray); 
  }
  
  function CreateNewArray() {
    
        var userScore = {
          True: scoreTrue,
          False: scoreFalse,
          name: input.value
       
    }
    var userArray = getUserData();
    userArray.push(userScore);
    saveStudentData(userArray);
    
    }
        
    submit.addEventListener('click', CreateNewArray);
    // input.addEventListener('key',saveStudentData);

    function showScores() {
        var users = saveStudentData;
        var scoresDiv = document.querySelector('.scores');
      
        scoresDiv.innerHTML = '';
      
        if (users.length === 0) {
          scoresDiv.innerHTML = '<p> no scores have been added </p>';
        }
      
        for (var userObj of users) {
          var div = document.createElement('div');

          var li= document.createElement('li');
          li.innerText = `Name: ${userObj.name} - True: ${userObj.True}`;
          div.append(li);
    
          scoresDiv.append(div);
        }
    }
    showScores();
    
    
    


