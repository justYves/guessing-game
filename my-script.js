$(document).ready(function(){

	var randNum = Math.floor(Math.random()*100)+1;
	console.log(randNum);
	var numberOfGuesses = 5;
	var userGuesses =[];

	//submit button
	$(".submit").on("click",function(e){
		e.preventDefault();   
		var guessedNum = $("#userInput").val();
		if(guessedNum == randNum) {
			alert ("congratulations! You\'ve found the number!");
		} else {
			userGuesses.push($("#userInput").val());
			$(".empty:first")
			.text(guessedNum)
			.removeClass("empty")
			.addClass("wrong"); 
			updateProgressBar();
			$("#userInput").val("");
		}

	})

		//hint button
		$("#hint").on("click",function(e){
			e.preventDefault();   
			alert("The number that you have to guess is : " + randNum);
	})

		//function that updates the progress bar
		var updateProgressBar = function(){
			var percentage = userGuesses.length * 20;
			console.log(percentage)
			$(".progress-bar").css("width", percentage +"%");
		}



	


})
