//These variables are for scoring and timer. 

//Made global variable for this, but also used locally within functions. timeResponsive uses time for timer. 
//Time is span element in HTML id = "time"
var time = 0;
var timeResponsive;

//Player score starts from zero. variable is adjusted as they answer questions 
var playerScore = 0;

//This variable is for use with running questions. 
var startingQ = -1;

//starts the countdown timer once user clicks the 'Go!' 
//onclick event in the HTML (line 31)
function begin() {

    time = 75;

    document.getElementById("time").innerHTML = time;

    timeResponsive = setInterval(function() {
        time--;
        document.getElementById("time").innerHTML = time;
        //this will end the game if the time is less than zero. 
        //Have two functions that +/- time with correct/incorrect answers below.
        if (time<= 0) {
            clearInterval(timeResponsive);
            finish(); 
        }

    }, 1000);

    nextQ();
}


//this  stores highscore on browser. 
function scorePlayer() {

    localStorage.setItem("highscore", playerScore);

    localStorage.setItem("highscoreName",  document.getElementById('name').value);

    getScore();

}


function getScore() {

    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 

    <button onclick="clearScore()">Clear score!</button><button onclick="beginAgain()">Play Again!</button>

    `;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//this will clear the score and also the name, then run beginAgain.
function clearScore() {
    localStorage.setItem("highscore", "");

    localStorage.setItem("highscoreName",  "");

    beginAgain();
}

//reset the game 
function beginAgain() {
    clearInterval(timeResponsive);
    playerScore = 0;
    startingQ = -1;
    time = 0;
    timeResponsive = null;

    document.getElementById("time").innerHTML = time;

    //this is the html that gets reloaded when you finish and you want to play it again. 
    //back ticked again. Local variable. 
    var quizContent = `
    <h1>
        Coding Quiz
    </h1>
    <h3>

    Press 'Go!' to Begin  
        
    </h3>

    <button onclick="begin()">Go!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//the two functions below add and subtract based on what answer the user gives. 
function incorrect() {

    time -= 15; 
    nextQ();
}

function correct() {

    playerScore += 20;
    nextQ();
}



//This function processes questions.
function nextQ() {

    startingQ++;

    //if conditional for ending the game. 
    //calls end function from above. 
    //this is logic that governs if game should end. 
    //then finish() is what actually happens. 
    if (startingQ > questions.length - 1) {
        finish();
        return;
}

//stop the timer to end the game 
function finish() {

    clearInterval(timeResponsive);

    //ending html. created in JS but using HTML structure. 
    //used back tick for this which made thing a lot easier. Didn't have to do everything individually. 
    var quizContent = `
    <h2>GAME OVER</h2>
    <h3>YOUR SCORE IS ` + playerScore +  ` /100!</h3>
    <h3>YOU GOT ` + playerScore / 20 +  ` QUESTIONS RIGHT.</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="scorePlayer()">Set score!</button>`;

    //changes original quizBody to HTML created by finish()
    document.getElementById("quizBody").innerHTML = quizContent;
}



//this is how the question/answers interact with each other. 
var quizContent = "<h2>" + questions[startingQ].title + "</h2>"

    for (var qButton = 0; qButton < questions[startingQ].options.length; qButton++) {

        var buttonR = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 

        buttonR = buttonR.replace("[CHOICE]", questions[startingQ].options[qButton]);

        //below is what happens when users answers right/wrong. 
        if (questions[startingQ].options[qButton] == questions[startingQ].rightA) {

            buttonR = buttonR.replace("[ANS]", "correct()");

        } else {

            buttonR = buttonR.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonR
    }


        document.getElementById("quizBody").innerHTML = quizContent;
}


//All the quiz questions stored as an array. 
var questions = [
    
        {

        title: "How do you add >= 1 elements to the front of the array and then return the new length?",

        options: ["unshift( )", "sort( )", "splice( )", "toString( )"],

        rightA: "unshift( )"
        },

         {
        title: "Why are semantic tags important for HTML?", 

        options: ["They look good", "They enable better organisation and help with SEO", "They reduce load time", "They make CSS work better"], 

        rightA: "They enable better organisation and help with SEO"
        },


        {
        title: "What would add one or more elements to the end of an array and return the new length of the array?",

        options: ["last( )", "put( )", "push( )", "pop( )"],

        rightA: "push( )"
        },

        {
        title: "What would you use to return the characters in a string, specifying the location?",

        options: ["substr( )", "getSubstring( )", "slice( )", "None of the above."],

        rightA: "substr( )"
         },


         {
        title: "What would add and/or remove elements from an array object?",

        options: ["toSource( )", "sort( )", "unshift( )", "splice( )"],

        rightA: "splice( )"
         },


         {
        title: "How would you combine the contents of two strings, and then return this combination is a single string?",

        options: ["add( )", "concat( )", " merge( )", "append( )"],

        rightA: "concat( )"
         }
    ]