





'use strict';

const store = {
  
  questions: [{
    question: 'what color is broccoli?',
    answers: [ 'red', 'orange', 'pink', 'green', 'blue' ],
    correctAnswer: 'green',
   
  },
  {
    question: 'what is the current year?',
    answers: [ '1970', '2015', '2020', '2005', '2000' ],
    correctAnswer: '2020',
   
  },
  {
    question: 'What is color is the sky at noon?',
    answers: [ 'black', 'blue', 'yellow', 'magenta', 'grey' ],
    correctAnswer: 'blue',
    
  },
  {
    question: 'What disease is respossible for the current pandemic?',
    answers: [ 'HIV', 'SARS', 'COVID-19', 'malaria', 'Ebola' ],
    correctAnswer: 'COVID-19',  
  },
  {
    question: 'What is next year?',
    answers: [ '1970', '2015', '2021', '2005', '2020' ],
    correctAnswer: '2021', 
  }
  ],
  feedbackGiven: true,
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  currentAnswer: ''
};

function generateMainPage() {
  return `
      <div class="mainPage">
        <h2>My Quiz</h2>
        <p>This is a quiz</p>
        <button type='submit' id="startquiz">Start Quiz</button>
        </form>
      </div>`;
}

function generateQuestionPage() {
  const question = store.questions[store.questionNumber];
  const answers = question.answers.map(function(answer,index){return `
  <input type="radio" id="answer${index}" name="answer" value="${answer}" required>
        <label for="answer${index}">${answer}</label></br>`;
  });

  return `
  <div class="mainPage">
    <form id="question">
      <h2>${question.question}</h2>
      ${answers.join('')}
      <button type="form">Submit Answer</button>
    </form>
      <div class="quiz-info">
        <p>${store.questionNumber+1}/5</p>
        <p>${store.score}/${store.questionNumber} Correct</p>
      </div>
  `;
  
}



function generateFinalPage(){
  let feedback = '';
  if(store.currentAnswer===store.questions[store.questionNumber].correctAnswer){
    feedback = `Great job! You were great!`;
  } else{
    feedback = `not bad!`;
  }
  return`
  <div class="mainPage">
      <h2>Question ${store.questionNumber+1}</h2>
      <p>The correct answer was: ${store.questions[store.questionNumber].correctAnswer}.</p>
      ${feedback}
      <p>End of the Quiz!<p>
      <p>You scored ${store.score}/${store.questionNumber+1}</p>
      <button type='submit' id="home">Home</button>
      </form>
      <button type='submit' id="try-again">Try Again</button>
      </form>
    </div>
    `;
}

function generateFeedbackPage(){
  let feedback = '';
  if(store.currentAnswer===store.questions[store.questionNumber].correctAnswer){
    feedback = `Great job! You're doing good!`;
  } else{
    feedback = `Better luck next time!`;
  }
  return`
  <div class="mainPage">
      <h2>Question ${store.questionNumber+1}</h2>
      
      <p>The correct answer was: ${store.questions[store.questionNumber].correctAnswer}.</p>
      ${feedback}
      <p>You have gotten ${store.score}/${store.questionNumber+1} questions right so far.</p>
      <button type='submit' id="continue">Continue</button>
      </form>
    </div>
    `;
}

function handleStartButton(){
  $('main').on('click','#startquiz', function(e){
    store.quizStarted = true;
    render();
  });
}

function handleTryAgainButton(){
  $('main').on('click','#try-again', function(e){
    store.currentAnswer = '';
    store.score = 0;
    store.questionNumber = 0;
    store.feedbackGiven = true;
    render();
  });
}

function handleHomeButton(){
  $('main').on('click','#home', function(e){
    store.currentAnswer = '';
    store.score = 0;
    store.questionNumber = 0;
    store.feedbackGiven = true;
    store.quizStarted = false;
    render();
  });
}

function handleSubmitButton(){
  $('main').on('submit','#question', function(e){
    e.preventDefault();
    store.currentAnswer = $(`input[name='answer']:checked`).val();
    store.feedbackGiven = false;
    if(store.currentAnswer===store.questions[store.questionNumber].correctAnswer){
      store.score++;
    }
    console.log(store.currentAnswer);
    render();
  });
}

function handleContinueButton(){
  $('main').on('click','#continue', function(e){
    store.feedbackGiven = true;
    store.currentAnswer = '';
    store.questionNumber++;
    render();
  });
}

function render() {
  let html = '';
  if (store.quizStarted === false) {
    html = generateMainPage();
  } else if (store.feedbackGiven === true) {
    html = generateQuestionPage();
  } else if (store.feedbackGiven === false && store.questionNumber === store.questions.length-1){
    html = generateFinalPage();
  } else{
    html = generateFeedbackPage();
  }
  $('main').html(html);
}

function main() {
  render();
  handleStartButton();
  handleSubmitButton();
  handleContinueButton();
  handleTryAgainButton();
  handleHomeButton();
}
$(main);