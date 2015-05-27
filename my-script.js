$(document).ready(function(){

	var randNum = Math.floor(Math.random()*100)+1; 
	console.log(randNum);
	var numberOfGuesses = 5;
	var userGuesses =[];
	var hasGuessed = false; 
	var noGuessesLeft = false; 


	//submit button
	$(".submit").on("click",function(e){
		e.preventDefault();   
		$("#warningText").text("");
		if(!hasGuessed && !noGuessesLeft ){
			var guessedNum = +$("#userInput").val();
			if (!(guessedNum > 0 && guessedNum <= 100 ))	{
				alert("This is not a valid number. Please submit a number between 1 and 100 ");
			} else if (userGuesses.indexOf(guessedNum) != -1){
				alert("You already chose this number. Please choose another one.");
				$("#userInput").val("");
			} else {
				if(guessedNum == randNum) {
					hasGuessed = true; 
				}
				userGuesses.push(guessedNum);
				if(userGuesses.length == numberOfGuesses){
					noGuessesLeft = true;
				}
				interfaceUpdate(guessedNum);
			}
		}
	});


	//function that updates the interface
	var interfaceUpdate = function(num){
		if (hasGuessed){
			$(".empty:first").addClass("correct");
		} else {
			$(".empty:first").addClass("wrong");
		}
		$(".empty:first").text(num).removeClass("empty");
		updateProgressBar();
		messageUpdate();
		$("#userInput").val("")
		warmOrCold();
		$(".correct").closest("div").effect( "bounce", {times:3}, 500);
	};


	//function that returns how "warm or cold" the guessed number is
	var warmOrCold = function (){
		var message = "";
		var userCurrentGuess = userGuesses[userGuesses.length-1];
		if (hasGuessed){
			message = "Congratulations! You found the number!";
			$("#temp").addClass("correct-answer");
			$("#hintText").html("");

		} else {
			var diff = Math.abs(userCurrentGuess- randNum);;
			if(diff < 5) {
				message = "You're boiling!"; 
			} else if (diff <10) {
				message = "You're hot!";
			} else if (diff <15) { 
				message = "You're warm.";
			} else if (diff <25) {
				message = "You're cold";
			} else if (diff < 100) {
				message = "You're ice cold."

			}

			if ((userCurrentGuess - randNum) > 0 ){
				message += " Guess lower."
			} else {
				message += " Guess higher."
			}
		};

		$("#temp").html(message);

	};

		//hint button
		$("#hint").on("click",function(e){
			e.preventDefault(); 
			var message ="";
			var warningMessage="";
			console.log(userGuesses.length)
			if(userGuesses.length == 0 ){
			 warningMessage = "You must submit a guess first!";  
			} else if (noGuessesLeft){

			} else if (($("#hintText").text()=="") ){
				message = "<b>HINT:</b> The number that you have to guess is : " + randNum ;   
				$("#hintText").html(message);
		}
		$("#warningText").html(warningMessage);

		});


		//<!---- End hint ----> 

		//function that return the number of guesses remaining 
		var messageUpdate = function(){
			var remainingGuesses = numberOfGuesses - userGuesses.length;
			var message ="";
			if(!hasGuessed){
				if (remainingGuesses > 0 ) {
					message = "You have " + remainingGuesses + " guess" + ((remainingGuesses >1 ) ? "es" : "" )+ " remaining...";

				} else {
					message = "Sorry, you have no guess left. The number was " +  randNum  + ".</br>	Please play again!"

				}
			}
			$(guess).html(message);
		};
		

		//function that updates the progress bar
		var updateProgressBar = function(){
			var percentage = userGuesses.length * 20;
			console.log(percentage)
			$(".progress-bar").css("width", percentage +"%");
			if(hasGuessed){
				$(".progress-bar").removeClass("progress-bar-warning").addClass("progress-bar-success");
			} else {
				$(".progress-bar").removeClass("progress-bar-success").addClass("progress-bar-warning");
			}
		};

		//function that refresh all to play again 
		$("#play-again").on("click",function(e){
			e.preventDefault(); 
			//reset variables
			userGuesses =[];
			userGuesses.length = 0 ;
			hasGuessed = false; 
			noGuessesLeft = false;
			messageUpdate();
			//resest messages been restarted, submit a new guess!");
			$("#hintText").html("");
			$("#temp").removeClass("correct-answer").html("Your game has been restarted, submit a new guess!");
			//generate a new random number
			randNum = Math.floor(Math.random()*100)+1;; 
			console.log(randNum);
			//reset the progress bar
			$(".wrong").text("?").addClass("empty").removeClass("wrong");
			$(".correct").text("?").addClass("empty").removeClass("correct");
			updateProgressBar();


		});

	});






