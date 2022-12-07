let studentNames = ['Stavros Halkias', 'Tony Soprano', 'Saul Goodman'];
//this is connected to the edit grades button on Homework 1, currently every edit grades button has corresponding javascipt to expand the menu
let studentNamesHw1 = document.getElementById('studentNamesHw1'); //student names is in its own div so that they are displayed on the left
//homework 1
let hw1Grades = document.getElementById('hw1Grades'); //grades and button are in the same div so that they are on the right
let hw1SaveChangesDiv = document.getElementById('hw1SaveChangesDiv');
let hw1Invis = document.getElementById('hw1Invis');
let hw1Button = document.getElementById('hw1');


function expandHw1() { //expands homework 1 and displays the names, grades and the save changes button
    studentNamesHw1.classList.remove('hidden');
    hw1Grades.classList.remove('hidden');
    hw1SaveChangesDiv.classList.remove('hidden');
    hw1Invis.classList.remove('hidden');
    hw1Button.removeEventListener("click", expandHw1);
    hw1Button.addEventListener("click", collapseHw1);
}

function collapseHw1() { 
    studentNamesHw1.classList.add('hidden');
    hw1Grades.classList.add('hidden');
    hw1SaveChangesDiv.classList.add('hidden');
    hw1Invis.classList.add('hidden');
    hw1Button.removeEventListener("click", collapseHw1);
    hw1Button.addEventListener("click", expandHw1);
}

hw1Button.addEventListener("click", expandHw1);//base event listener so the button works from the begining 

//expands homework 2 to display the names and grades 
let studentNamesHw2 = document.getElementById('studentNamesHw2');
let hw2Grades = document.getElementById('hw2Grades'); //grades and button are in the same div so that they are on the right
let hw2SaveChangesDiv = document.getElementById('hw2SaveChangesDiv');
let hw2Invis = document.getElementById('hw2Invis');
let hw2Button = document.getElementById('hw2');

function expandHw2() {
    studentNamesHw2.classList.remove('hidden');
    hw2Grades.classList.remove('hidden');
    hw2SaveChangesDiv.classList.remove('hidden');
    hw2Invis.classList.remove('hidden');
    hw2Button.removeEventListener("click", expandHw2);
    hw2Button.addEventListener("click", collapseHw2);
}

function collapseHw2() { 
    studentNamesHw2.classList.add('hidden');
    hw2Grades.classList.add('hidden');
    hw2SaveChangesDiv.classList.add('hidden');
    hw2Invis.classList.add('hidden');
    hw2Button.removeEventListener("click", collapseHw2);
    hw2Button.addEventListener("click", expandHw2);
}

hw2Button.addEventListener("click", expandHw2);//base event listener so the button works from the begining 

//expands classwork 1 to display the names and grades 
let studentNamesCw1 = document.getElementById('studentNamesCw1');
let cw1Grades = document.getElementById('cw1Grades'); //grades and button are in the same div so that they are on the right
let cw1SaveChangesDiv = document.getElementById('cw1SaveChangesDiv');
let cw1Invis = document.getElementById('cw1Invis');
let cw1Button = document.getElementById('cw1');

function expandCw1() {
    studentNamesCw1.classList.remove('hidden');
    cw1Grades.classList.remove('hidden');
    cw1SaveChangesDiv.classList.remove('hidden');
    cw1Invis.classList.remove('hidden');
    cw1Button.removeEventListener("click", expandCw1);
    cw1Button.addEventListener("click", collapseCw1);
}

function collapseCw1() { 
    studentNamesCw1.classList.add('hidden');
    cw1Grades.classList.add('hidden');
    cw1SaveChangesDiv.classList.add('hidden');
    cw1Invis.classList.add('hidden');
    cw1Button.removeEventListener("click", collapseCw1);
    cw1Button.addEventListener("click", expandCw1);
}

cw1Button.addEventListener("click", expandCw1);//base event listener so the button works from the begining


//Quiz 1, same logic as homework 1
let studentNamesQ1 = document.getElementById('studentNamesQ1');
let q1Grades = document.getElementById('q1Grades');
let q1Button = document.getElementById('q1');
let qSaveChangesDiv = document.getElementById('q1SaveChangesDiv');
let q1Invis = document.getElementById('q1Invis');

function expandQ1() {
    studentNamesQ1.classList.remove('hidden');
    q1Grades.classList.remove('hidden');
    q1SaveChangesDiv.classList.remove('hidden');
    q1Invis.classList.remove('hidden');
    q1Button.removeEventListener("click", expandQ1);
    q1Button.addEventListener("click", collapseQ1);
}

function collapseQ1() {
    studentNamesQ1.classList.add('hidden');
    q1Grades.classList.add('hidden');
    q1SaveChangesDiv.classList.add('hidden');
    q1Invis.classList.add('hidden');
    q1Button.removeEventListener("click", collapseQ1);
    q1Button.addEventListener("click", expandQ1);
}

q1Button.addEventListener("click", expandQ1);

//Exam 1, same logic as homework 1
let studentNamesE1 = document.getElementById('studentNamesE1');
let e1Grades = document.getElementById('e1Grades');
let e1Button = document.getElementById('e1');
let eSaveChangesDiv = document.getElementById('e1SaveChangesDiv');
let e1Invis = document.getElementById('e1Invis');

function expandE1() {
    studentNamesE1.classList.remove('hidden');
    e1Grades.classList.remove('hidden');
    e1SaveChangesDiv.classList.remove('hidden');
    e1Invis.classList.remove('hidden');
    e1Button.removeEventListener("click", expandE1);
    e1Button.addEventListener("click", collapseE1);
}

function collapseE1() {
    studentNamesE1.classList.add('hidden');
    e1Grades.classList.add('hidden');
    e1SaveChangesDiv.classList.add('hidden');
    e1Invis.classList.add('hidden');
    e1Button.removeEventListener("click", collapseE1);
    e1Button.addEventListener("click", expandE1);
}

e1Button.addEventListener("click", expandE1);

$(function () {
    $('#hw1Grades').on('scroll', function () {
        $('#studentNamesHw1').scrollTop($(this).scrollTop());
    });
    $('#q1Grades').on('scroll', function () {
        $('#studentNamesQ1').scrollTop($(this).scrollTop());
    });
	$('#hw2Grades').on('scroll', function () {
        $('#studentNamesHw2').scrollTop($(this).scrollTop());
    });
	$('#cw1Grades').on('scroll', function () {
        $('#studentNamesCw1').scrollTop($(this).scrollTop());
    });
	$('#e1Grades').on('scroll', function () {
        $('#studentNamesE1').scrollTop($(this).scrollTop());
    });
});

//this is the begining of the menu on the right

/* Variables */ {
	var name = 'ENGL.1010';
	var credits = 3;
	var letter_scale = [];
	var weights = [];
}

/*Load from local storage*/ {
	function loadFromLocal() {	//Calls functions that load from local storage
		load_letter_scale();
		load_category_weights();
		load_assignment_grades('MCW1');
		load_assignment_grades('MHW1');
		load_assignment_grades('MHW2');
		load_assignment_grades('MQ1');
		load_assignment_grades('ME1');
	}
}

/*Letter Scale Functions*/ {
	function load_letter_scale() {
		let test = localStorage.getItem('MLS');
		letter_scale = JSON.parse(test);
		document.getElementById('Abreak').value = letter_scale[0];
		document.getElementById('Bbreak').value = letter_scale[1];
		document.getElementById('Cbreak').value = letter_scale[2];
		document.getElementById('Dbreak').value = letter_scale[3];
		//set_letter_scale();
	}

	adjustLetterScalingText.addEventListener("click", set_letter_scale);
	function set_letter_scale() {
		let scale_good = true;
		letter_scale[0] = document.getElementById('Abreak').value;
		letter_scale[1] = document.getElementById('Bbreak').value;
		letter_scale[2] = document.getElementById('Cbreak').value;
		letter_scale[3] = document.getElementById('Dbreak').value;
		for (var i = 0; i < letter_scale.length; i++) {
			if (!letter_scale[i] || letter_scale[i].length == 0) {
				alert("Letter scale field was blank. Changes cannot be saved.");
				scale_good = false;
				i = letter_scale.length;
			}
			if (parseInt(letter_scale[i-1]) <= parseInt(letter_scale[i])) {
				alert("A higher letter grade cannot have a lower or equal numerical breakpoint than a lower letter grade. Changes cannot be saved.");
				scale_good = false;
				i = letter_scale.length;
			}
		}
		if (scale_good == true) {
			localStorage.setItem('MLS', JSON.stringify(letter_scale));
			to_letter_grade(calc_overall());
		}
	}
}

/* Category functions*/ {
	function load_category_weights() {
		weights = JSON.parse(localStorage.getItem('MCats_num'));
		document.getElementById('cat1').value = weights[0];
		document.getElementById('cat2').value = weights[1];
		document.getElementById('cat3').value = weights[2];
		document.getElementById('cat4').value = weights[3];
		//set_category_weights();
	}
	
	categoriesText.addEventListener("click", set_category_weights);
	function set_category_weights() {
		weights[0] = document.getElementById('cat1').value;
		weights[1] = document.getElementById('cat2').value;
		weights[2] = document.getElementById('cat3').value;
		weights[3] = document.getElementById('cat4').value;
		const sum = weights.reduce((accumulator, value) => {
			return accumulator + parseInt(value);
		}, 0);
		if (sum != 100) {
			alert("Category weights must equal 100. Changes cannot be saved.");
		} else {
			localStorage.setItem('MCats_num', JSON.stringify(weights));
		}
		//call functions needed to recalculate grades
	}
}

/*Assignment Functions*/ {
	function load_assignment_grades(name) {			//name is local storage key (ex. MHW1, ME1)
		grades = JSON.parse(localStorage.getItem(name));
		for(var i = 0; i < 10; i++) {				//Hard coded for 10 students
			document.getElementById(name + i).value = grades[i];
		}
	}
	
	function set_assignment_grades(name) {
		for(var i = 0; i < 10; i++) {
			grades[i] = document.getElementById(name + i).value;
		}
		localStorage.setItem(name, JSON.stringify(grades));
	}
	
	assSaveChanges.addEventListener("click", set_all);
	function set_all() {
		set_assignment_grades('MCW1');
		set_assignment_grades('MHW1');
		set_assignment_grades('MHW2');
		set_assignment_grades('MQ1');
		set_assignment_grades('ME1');
		alert("Grades saved!");
		calc_overall();
	}
}

function calc_overall() {	//Hard coded for math sections
	overall = (weights[0]/100) * calc_category('MCW') + (weights[1]/100) * calc_category('MHW') + (weights[2]/100) * calc_category('MQ') + (weights[3]/100) * calc_category('ME');
	document.getElementById('class_avg_text').innerHTML = overall.toFixed(2);
	return overall;
}

function calc_category(name) {		//name is local storage key w/o any numbers (ex. MHW, ME)
	var sum = 0;
	var itt = 0;
	var j = 1;
	if (localStorage.getItem(name) != null) {
		for(var i = 0; i < 10; i++) {
			sum += parseFloat(grades[i]);
			itt++;
		}
	}
	while (localStorage.getItem(name + j) != null) {	//Iterate through every set in the category
		grades = JSON.parse(localStorage.getItem(name+j));
		for(var i = 0; i < 10; i++) {
			sum += parseFloat(grades[i]);
			itt++;
		}
		j++;
	}
	return sum/itt;
}