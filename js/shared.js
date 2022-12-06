
if (localStorage.getItem('EHomework1') == null) { //this null check allows us to set the value of the localStorage originally on page load, after page load it wont be null anymore so when you go to index.html again none of the ifs will fire. important for keeping the value the same when going in between tabs
    localStorage.setItem('EHomework1', '20');
}
if (localStorage.getItem('EQuiz1') == null) {
    localStorage.setItem('EQuiz1', '-');
}
if (localStorage.getItem('MHomework1') == null) {
    localStorage.setItem('MHomework1', '20');
}
if (localStorage.getItem('MQuiz1') == null) {
    localStorage.setItem('MQuiz1', '-');
}

//English Course
var ELS = [90, 80, 70, 60];	//English letter scale

const EHW1 = new Map();	//English Homework 1
EHW1.set(1,88.8);	//First value is student ID, second value is grade
EHW1.set(2,83.2);
EHW1.set(3,79.9);

const EHW2 = new Map();	//English Homework 2
EHW1.set(1,100);
EHW1.set(2,95);
EHW1.set(3,88);

const EP1 = new Map();	//English Paper 1
EHW1.set(1,90);
EHW1.set(2,85);
EHW1.set(3,82.5);

const EP2 = new Map();	//English Paper 2
EHW1.set(1,88);
EHW1.set(2,86.3);
EHW1.set(3,92.5);

const EFP = new Map();	//English Final Paper
EHW1.set(1,85.5);
EHW1.set(2,83);
EHW1.set(3,84.2);

if(localStorage.getItem('ELS' == null) {
   localStorage.setItem('ELS', JSON.stringify(ELS));
}

if (localStorage.getItem('EHW1' == null) {
	localStorage.setItem('EHW1', JSON.stringify(EHW1));	//In order to store more than just strings, JSON.stringify must be called on the object or data structure
}

if (localStorage.getItem('EHW2' == null) {
	localStorage.setItem('EHW2', JSON.stringify(EHW2));
}

if (localStorage.getItem('EP1' == null) {
	localStorage.setItem('EP1', JSON.stringify(EP1));
}

if (localStorage.getItem('EP2' == null) {
	localStorage.setItem('EP2', JSON.stringify(EP2));
}

if (localStorage.getItem('EFP' == null) {
	localStorage.setItem('EFP', JSON.stringify(EFP));
}

//Math Course
