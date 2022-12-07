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


//HW2
let studentNamesHw2 = document.getElementById('studentNamesHw2');
let hw2Grades = document.getElementById('hw2Grades');
let hw2Button = document.getElementById('hw2');
let hw2SaveChangesDiv = document.getElementById('hw2SaveChangesDiv');
let hw2Invis = document.getElementById('hw2Invis');

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

hw2Button.addEventListener("click", expandHw2);


//P1
let studentNamesP1 = document.getElementById('studentNamesP1');
let p1Grades = document.getElementById('p1Grades');
let p1Button = document.getElementById('p1');
let p1SaveChangesDiv = document.getElementById('p1SaveChangesDiv');
let p1Invis = document.getElementById('p1Invis');

function expandP1() {
    studentNamesP1.classList.remove('hidden');
    p1Grades.classList.remove('hidden');
    p1SaveChangesDiv.classList.remove('hidden');
    p1Invis.classList.remove('hidden');
    p1Button.removeEventListener("click", expandP1);
    p1Button.addEventListener("click", collapseP1);
}

function collapseP1() {
    studentNamesP1.classList.add('hidden');
    p1Grades.classList.add('hidden');
    p1SaveChangesDiv.classList.add('hidden');
    p1Invis.classList.add('hidden');
    p1Button.removeEventListener("click", collapseP1);
    p1Button.addEventListener("click", expandP1);
}

p1Button.addEventListener("click", expandP1);



//FP
let studentNamesFp = document.getElementById('studentNamesFp');
let fpGrades = document.getElementById('fpGrades');
let fpButton = document.getElementById('fp');
let fpSaveChangesDiv = document.getElementById('fpSaveChangesDiv');
let fpInvis = document.getElementById('fpInvis');

function expandFP() {
    studentNamesFp.classList.remove('hidden');
    fpGrades.classList.remove('hidden');
    fpSaveChangesDiv.classList.remove('hidden');
    fpInvis.classList.remove('hidden');
    fpButton.removeEventListener("click", expandFP);
    fpButton.addEventListener("click", collapseFP);
}

function collapseFP() {
    studentNamesFp.classList.add('hidden');
    fpGrades.classList.add('hidden');
    fpSaveChangesDiv.classList.add('hidden');
    fpInvis.classList.add('hidden');
    fpButton.removeEventListener("click", collapseFP);
    fpButton.addEventListener("click", expandFP);
}

fpButton.addEventListener("click", expandFP);

$(function () {
    $('#hw1Grades').on('scroll', function () {
        $('#studentNamesHw1').scrollTop($(this).scrollTop());
    });
    $('#hw2Grades').on('scroll', function () {
        $('#studentNamesHw2').scrollTop($(this).scrollTop());
    });
	$('#p1Grades').on('scroll', function () {
        $('#studentNamesP1').scrollTop($(this).scrollTop());
    });
	$('#fpGrades').on('scroll', function () {
        $('#studentNamesFp').scrollTop($(this).scrollTop());
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
		load_assignment_grades('EHW1');
		load_assignment_grades('EHW2');
		load_assignment_grades('EP1');
		load_assignment_grades('EFP');
	}
}

/*Letter Scale Functions*/ {
	function load_letter_scale() {
		let test = localStorage.getItem('ELS');
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
			localStorage.setItem('ELS', JSON.stringify(letter_scale));
			to_letter_grade(calc_overall());
		}
	}
}

/* Category functions*/ {
	function load_category_weights() {
		weights = JSON.parse(localStorage.getItem('ECats_num'));
		document.getElementById('cat1').value = weights[0];
		document.getElementById('cat2').value = weights[1];
		document.getElementById('cat3').value = weights[2];
	}
	
	categoriesText.addEventListener("click", set_category_weights);
	function set_category_weights() {
		weights[0] = document.getElementById('cat1').value;
		weights[1] = document.getElementById('cat2').value;
		weights[2] = document.getElementById('cat3').value;
		const sum = weights.reduce((accumulator, value) => {
			return accumulator + parseInt(value);
		}, 0);
		if (sum != 100) {
			alert("Category weights must equal 100. Changes cannot be saved.");
		} else {
			localStorage.setItem('ECats_num', JSON.stringify(weights));
		}
		calc_overall();
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
		set_assignment_grades('EHW1');
		set_assignment_grades('EHW2');
		set_assignment_grades('EP1');
		set_assignment_grades('EFP');
		alert("Grades saved!");
		calc_overall();
	}
}

function calc_overall() {	//Hard coded for math sections
	overall = (weights[0]/100) * calc_category('EHW') + (weights[1]/100) * calc_category('EP') + (weights[2]/100) * calc_category('EFP');
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
			//alert(grades[i]);
			itt++;
		}
		j++;
	}
	return sum/itt;
}

/*Calc Stats*/ {
	publishStats.addEventListener("click", calc_statistics);
	
	var calc_grades = [];

	function calc_statistics() {	//this function calls the 5 helper files, and handles the email's to and body fields
		assignment = document.getElementById('publishAssignment').value;
		grades = JSON.parse(localStorage.getItem(assignment));
		
		let output = [mean(), median(), standard_deviation(), max(), min()];
		let toString = 	"Mean: " + output[0].toFixed(2) + "%0D%0A" + "Median: " + output[1].toFixed(2) + "%0D%0A" + 
				"Standard Deviation: " + output[2].toFixed(2) + "%0D%0A" + "Max: " + output[3].toFixed(2) + "%0D%0A" + "Min: " + output[4].toFixed(2) + "%0D%0A"; 
		document.getElementById("mailto_field").href = "mailto:?body=" + toString;
	}   

	function mean() {	//This and the other 4 helper fils use the local attributes defined above in this file
		sum = 0;
		for (let i = 0; i < 10; i++) {
			sum += parseFloat(grades[i]);
		}
		return (sum / 10);
	}       
	
	function median() {
		temp = [];
		for (let i = 0; i < 10; i++) {
			temp.push(parseFloat(grades[i]));
		}
		temp.sort();
		for (let i = 0; i < temp.size; i++) {
			document.write(temp[i]);
		}
		if (temp.length % 2 == 0) {
			return (temp[(temp.length / 2) - 1] + temp[temp.length / 2]) / 2;
		} else {
			return temp[(temp.length / 2) - 0.5];
		}
	}       
	function min() {
		temp = [];
		for (let i = 0; i < 10; i++) {
			temp.push(parseFloat(grades[i]));
		}
		return Math.min(...temp);
	}       
	function max() {
		temp = [];
		for (let i = 0; i < 10; i++) {
			temp.push(parseFloat(grades[i]));
		}
		return Math.max(...temp);
	}   
	function standard_deviation() {
		let average = mean();
		let sum = 0;
		temp = [];

		for (let i = 0; i < 10; i++) {
			temp.push(parseFloat(grades[i]));
		}

		for (let i = 0; i < temp.length; i++) {
			temp[i] = Math.round((average - temp[i]) * 100) / 100;
			temp[i] = temp[i] * temp[i];
			sum += temp[i];
		}

		return Math.round((Math.sqrt(sum / (temp.length - 1))) * 100) / 100;
	}
}