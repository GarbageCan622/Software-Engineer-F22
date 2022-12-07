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

$(function () {
    $('#hw1Grades').on('scroll', function () {
        $('#studentNamesHw1').scrollTop($(this).scrollTop());
    });
    $('#q1Grades').on('scroll', function () {
        $('#studentNamesQ1').scrollTop($(this).scrollTop());
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
		for (var i = 1; i < letter_scale.length; i++) {
			if (letter_scale[i] == "") {
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