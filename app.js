const questions = [ 
  { question: 'What color is broccoli?', answers: [ 'red', 'orange', 'pink', 'green' ], correctAnswer: 'green', qstno: '1/5'}, 
  { question: 'What is the current year?', answers: [ '1970', '2015', '2020', '2005' ], correctAnswer: '2020', qstno: '2/5' }, 
  { question: 'What is color is the sky at noon?', answers: [ 'black', 'blue', 'yellow', 'magenta' ], correctAnswer: 'blue', qstno: '3/5' }, 
  { question: 'What disease is resposible for the current pandemic?', answers: [ 'HIV', 'SARS', 'COVID-19', 'malaria' ], correctAnswer: 'COVID-19', qstno: '4/5' }, 
  { question: 'What is next year?', answers: [ '1970', '2015', '2021', '2005' ], correctAnswer: '2021', qstno: '5/5' } ];

let currentQuestion = 0;

function generateMainPage()
{
  $("main").html(`
  <div class="mainPage">
  <h2>My Quiz</h2>
  <p>This is my quiz project. Have Fun!</p>
<button type="submit" class="start">Start</button>
</div>
`)
}

function renderCurrentQuestionAndAnswers(index)
{
  $("main").html("");
  $("main").append(`
 		<form class="questionForm">
		<fieldset class="radio">
		<legend>${questions[index].question}</legend>`);
   
for (let i = 0; i < questions[index].answers.length; i++)
 {
   $(".radio").append(`
   <input type="radio" name="answers" value="${questions[index].answers[i]}" required>${questions[index].answers[i]}<br>`);
 }
  $("main").append(`
	</fieldset>
  <button type="submit" class="submit">Submit</button>
  <button class="continue">Next Question</button>
	</form>`);
  submitQuiz();
  nextQuestion();
}

function startQuiz()
{
  $(".start").on("click", function(){
    renderCurrentQuestionAndAnswers(currentQuestion);
    currentQuestion++;
  });
     
}
   
function submitQuiz()
{   
    $(".submit").on("click", function(){
     let currentQuestionIndex = currentQuestion - 1; 
     let correctAnswer = questions[currentQuestion - 1].correctAnswer;
     let selectedAnswer = $("input[name=answers]:checked").val();
     if(!selectedAnswer)
     {
       alert("Please select an option");
       return;
     }
     $('.continue').show();
     if(correctAnswer == selectedAnswer) 
     {
       alert("Correct!")
       
     }
     else
     { 
     alert("Wrong answer! Correct answer is: "+ correctAnswer);
       
     }
    
  });
}

function nextQuestion()
{
  $(".continue").on("click", function(){
  let selectedAnswer = $("input[name=answers]:checked").val();
  if(!selectedAnswer)
   {
  alert("Please select an answer")
  return;
  }
  $("#result").html("");
  if(currentQuestion == questions.length)
  {
       alert("Quiz ends");
       
   }
    renderCurrentQuestionAndAnswers(currentQuestion);
    currentQuestion++;
    
  });
}

function main()
{
  generateMainPage();
  startQuiz();
}

$(main);