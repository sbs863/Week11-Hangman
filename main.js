var inquirer = require('inquirer');
var Word = require('./word.js');
var value = require('./game.js');

// console.log("    _____________________________");
// console.log(" [ ]__________________(-)________]");
// console.log(" [ ]   /  /           (-)");
// console.log(" [ ]  /  /            (-)");
// console.log(" [ ] /  /            _(_)_");
// console.log(" [ ]/  /            / *_* \ "); 
// console.log(" [ ]  /             ] ___ [ ");
// console.log(" [ ] /              \_____/ ");
// console.log(" [ ]/          _______[ ]_______");
// console.log(" [ ]          [_______[ ]_______]");
// console.log(" [ ]                  [ ]");
// console.log(" [ ]                  [ ]");
// console.log(" [ ]                 / _ \\ ");
// console.log(" [ ]                / / \\ \\ ");
// console.log(" [ ]               / /   \\ \\ ");
// console.log(" [ ]              /_/     \\_\\ ");
// console.log(" [ ]");                                      
// console.log(" [_]_____________________________");
// console.log(" [________________________________]");

var gallows = " 			    _____________________________\n			 [ ]__________________-(-)________]\n			 [ ]   /  /            (-)\n			 [ ]  /  /             (-)\n 			 [ ] /  /              (_)\n			 [ ]/  / \n			 [ ]  / \n			 [ ]  \n			 [ ]/\b \n 			 [ ]\b\n 			 [ ]\n			 [ ]\n			 [ ]\n			 [ ]\n			 [ ]\n			 [ ]\n			 [ ]\n 			 [_]_____________________________\n			 [________________________________]";
var head = "_(_)_ \n 			 [ ]/  /  	     / *_* \\\n			 [ ]  /   	     ] ___ [ \n 			 [ ] /	     	     \\_____/\b\n 	";
var leftArm = "[ ]/          ________[ ]\n 			 [ ]          [________";
var arms = "[ ]/           _______[ ]_______ \n 			 [ ]           [_______[ ]_______]\n 			 ";
var leftLeg = "[ ]                   [ ] \n 		 	 [ ]                   [ ]  \n 			 [ ]                  / _ \n 			 [ ]                 / / \n 		    	 [ ]                / / \n 			 [ ]               /_/\n 			 ";
var legs = "[ ]		       [ ]\n	    	 	 [ ]                  / _ \\ \n 			 [ ]                 / / \\ \\ \n 			 [ ]                / /   \\ \\ \n 			 [ ]               /_/     \\_\\ \n 		 	 ";
var deathClock = 0;
// console.log(gallows);
var headPosition = gallows.indexOf("(_)\n");
// console.log(headPosition);
var strikeOne = [gallows.slice(0, 163), head, gallows.slice(194)].join('');
// console.log(strikeOne);

var strikeTwo = [strikeOne.slice(0, 262), leftArm, strikeOne.slice(262)].join('');
// console.log(strikeTwo);

var strikeThree = [strikeOne.slice(0, 262), arms, strikeOne.slice(262)].join('');
// console.log(strikeThree);

var strikeFour = [strikeThree.slice(0, 340), leftLeg, strikeThree.slice(340)].join('');
// console.log(strikeFour);

var strikeFive = [strikeThree.slice(0, 340), legs, strikeThree.slice(340)].join('');
// console.log(strikeFive);



var word = new Word(value);
console.log(word.value);

var start = function() {

    inquirer.prompt([{
        type: 'confirm',
        name: 'letsPlay',
        message: 'Choose wisely, you have five guesses before he dies! Are you ready?',
        default: true
    }]).then(function(answer) {

        if (answer.letsPlay === true) {
            console.log('working');
            deathClock = 0;
            process.stdout.write('\033c');
            life();
            console.log(word.show());
            displayWord();
        }
    });
};
start();

var life = function() {
    if (deathClock === 0) {
        console.log(gallows);
    } else if (deathClock === 1) {
        console.log(strikeOne);
    } else if (deathClock === 2) {
        console.log(strikeTwo);
    } else if (deathClock === 3) {
        console.log(strikeThree);
    } else if (deathClock === 4) {
        console.log(strikeFour);
    }
};

var displayWord = function() {

    if (deathClock === 5) {
        return death();
    }

    inquirer.prompt([{
        type: 'input',
        message: 'Please Choose a letter ',
        name: 'guess',

    }]).then(function(answer) {

        if (word.guess(answer.guess) === true) {
            process.stdout.write('\033c');
            life();
            console.log(word.show(answer.guess));

            return displayWord();
        } else {
            deathClock++;
            process.stdout.write('\033c');
            life();
            console.log(word.show(answer.guess));
            return displayWord();
        }
    });
};


var death = function() {


    process.stdout.write('\033c');
    console.log(strikeFive);
    console.log("\n The correct answer was " + word.value);

    inquirer.prompt([{
        type: 'confirm',
        name: 'playAgain',
        message: '\n He\'s dead Jim! Would like to try and save another?',
        default: true
    }]).then(function(answer) {

        if (answer.playAgain === true) {
            start();
        } else {
            process.exit();
        }
    });
};
