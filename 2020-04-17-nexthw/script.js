var questions = document.getElementById("introQuestions")
var answers = document.getElementById("answers")
var rightWrong = document.getElementById("rightWrong")
var timer = document.getElementById("timer")
var pauseMessage = document.getElementById("pauseMessage")
var pause = document.getElementById("pause")
var highScore = document.getElementById("highScore")
var highScores = document.getElementById("highScores")
var start = document.getElementById("start")
var nameEntry = document.getElementById("nameEntry")
// $("#start")

var startTime = 75
var currentQuestion = 0
var counter = startTime;
var interval;
var paused = false;
var showingScores = false;

var highScoresList = localStorage["highScores"] || "[]";
highScoresList = JSON.parse(highScoresList);

var score = 0;

var qAndA = [ 
	{
		question: "what is your name",
		answers: ["Brandon", "Brayden", "Bob", "Sam"],
		correct: 0
	},
	{
		question: "What do you like to do",
		answers: ["Golf", "Eat", "Sleep", "Game"],
		correct: 2
	},
	{
		question: "Is the sun green",
		answers: ["Yes", "No"],
		correct: 0
	},
];

function countdown() {
	interval = setInterval(function() {
		counter--;
		if (counter <= 0) {
			finishQuiz();
			return;
		} else {
			timer.innerText = counter
			// $('#timer').text(counter);
			console.log("Timer --> " + counter);
		}
	}, 1000);
}

function togglePause() {
	paused = !paused;
	
	if (paused) {
		questions.classList.add("hidden");
		answers.classList.add("hidden");
		rightWrong.classList.add("hidden");
		timer.classList.add("hidden");
		
		pauseMessage.classList.remove("hidden");
		
		clearInterval(interval);
		
	} else {
		questions.classList.remove("hidden");
		answers.classList.remove("hidden");
		rightWrong.classList.remove("hidden");
		timer.classList.remove("hidden");
		
		pauseMessage.classList.add("hidden");
		
		countdown();
	}
		
}

function toggleHighScores() {
	
	showingScores = !showingScores;
	
	if (showingScores) {
		questions.classList.add("hidden");
		answers.classList.add("hidden");
		rightWrong.classList.add("hidden");
		timer.classList.add("hidden");
		start.classList.add("hidden");
		
		highScores.classList.remove("hidden");
		
		renderHighScores();
		
		
	} else {
		questions.classList.remove("hidden");
		answers.classList.remove("hidden");
		rightWrong.classList.remove("hidden");
		timer.classList.remove("hidden");
		start.classList.remove("hidden");
		
		highScores.classList.add("hidden");
		
	}
	
}

function renderQuestion(question) {	
	if (question) {
		//display the current question [] mean address.
		questions.innerHTML = question.question
		
		//display buttons with the text of the answers
		answers.innerText = "Answers:";
		for (var i = 0; i < question.answers.length; i++) {
			var button = document.createElement('button');
			var div = document.createElement('div');
			
			button.classList.add("btn");
			button.innerText = question.answers[i];
			button.addEventListener("click", (question.correct == i) ? correctAnswer : wrongAnswer);
			
			div.append(button);
			answers.append(div);
		}
	} else {
		finishQuiz();
	}
}

function renderHighScores() {
	
	highScores.innerHTML = "High Scores:"
	
	for (var i = 0; i < highScoresList.length && i < 20; i++) {
		var li = document.createElement('li');
		var sc = highScoresList[i];
		li.innerText = `${sc.name || "Unnamed"} Got Score: ${sc.score} Time Left: ${sc.counter}`;
		
		highScores.append(li);
	}
	
	if (highScoresList.length === 0) {
		highScores.innerHTML += "<br/> No Scores Yet!";
	}
	
}

function correctAnswer() {
	rightWrong.innerText = "Correct answer!";
	currentQuestion += 1;
	score += 10;
	renderQuestion(qAndA[currentQuestion]);
}

function wrongAnswer() {
	counter -= 5;
	rightWrong.innerText = "Wrong answer! You lost 5 seconds!";
	score -= 1;
}


function startQuiz() {
	
	score = 0;
	counter = startTime;
	countdown();
	
	highScore.classList.add("hidden");
	start.classList.add("hidden");
	pause.classList.remove("hidden");
	
	currentQuestion = 0;
	renderQuestion(qAndA[currentQuestion]);
	
}

function finishQuiz() {
	clearInterval(interval);
	
	highScore.classList.remove("hidden");
	start.classList.remove("hidden");
	pause.classList.add("hidden");
	
	timer.innerText = "";
	
	if (counter < 0) { // 'clamp' counter to 0 at minimum
		counter = 0;
	}
	
	var userName = nameEntry.value;
	var scoreEntry = { score, counter, name: userName };
	// Long Version:
	// var scoreEntry = { };
	// scoreEntry.counter = counter;
	// scoreEntry.score = score;
	highScoresList.push(scoreEntry);
	console.log("Added score: ", scoreEntry);
	// Sort them by score
	function compareScores(a, b){
		// if we return a zero, means a and b are equal
		// if we return a negative value that means a comes before b
		// if we return a positive value that means b comes before a
		
		// If the scores are not the same, order descending by score:
		if (a.score !== b.score) {
			return b.score - a.score;
		}
		// If the scores are the same, order ascending by counter.
		return a.counter - b.counter;
	}
	highScoresList.sort(compareScores);
	
	localStorage["highScores"] = JSON.stringify(highScoresList);
	
	questions.innerText = "You are done!"
	answers.innerText = "Here's your score: " + score + " and you had " + counter + " seconds remaining.";
	rightWrong.innerText = "";
	
}


