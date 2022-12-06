// JavaScript source code

//Variables
var name;
var credits;

// Maps
const overall_grades = new Map();
const category_weights = new Map();
const homework_grades = new Map();
const quiz_grades = new Map();
const exam_grades = new Map();
const cat_temp = new Map();

//Add Values
{
    overall_grades.set(1, 88.9);
    overall_grades.set(2, 78.1);
    overall_grades.set(3, 86.5);
    overall_grades.set(4, 82.3);

    category_weights.set("Homework", 20);
    category_weights.set("Quiz", 30);
    category_weights.set("Exam", 50);

    homework_grades.set(1, 76);
    homework_grades.set(2, 77);
    homework_grades.set(3, 78);
    homework_grades.set(4, 79);

    quiz_grades.set(1, 80);
    quiz_grades.set(2, 81);
    quiz_grades.set(3, 82);
    quiz_grades.set(4, 83);

    exam_grades.set(1, 84);
    exam_grades.set(2, 85);
    exam_grades.set(3, 86);
    exam_grades.set(4, 87);

    cat_temp.set("Homework", homework_grades);
    cat_temp.set("Quiz", quiz_grades);
    cat_temp.set("Exam", exam_grades);
}

//Lists
const assignment_categories = ["Homework", "Quiz", "Exam"];
const student_ids = [1, 2, 3, 4];   //May not implement
const assignments = [];
const letter_scale = [90, 80, 70, 60];    //Corresponds to letter grades (>=90 is an A, <90 is a B)
const category_grades = [homework_grades, quiz_grades, exam_grades];


//overall_grade Functions
classStatisticsText.addEventListener("click", calc_statistics);

function calc_statistics() {	//this function calls the 5 helper files, and handles the email's to and body fields
   	let output = [mean(), median(), standard_deviation(), max(), min()];
	let toString = 	"Mean: " + output[0] + "%0D%0A" + "Median: " + output[1] + "%0D%0A" + 
			"Standard Deviation: " + output[2] + "%0D%0A" + "Max: " + output[3] + "%0D%0A" + "Min: " + output[4] + "%0D%0A"; 
	document.getElementById("mailto_field").href = "mailto:" + document.getElementById("mailto_email").value + "?body=" + toString;
}   

function mean() {	//This and the other 4 helper fils use the local attributes defined above in this file
    sum = 0;
    for (let i = 0; i < student_ids.length; i++) {
        sum += overall_grades.get(student_ids[i]);
    }
    return (sum / student_ids.length);
}       
function median() {
    temp = [];
    for (let i = 0; i < student_ids.length; i++) {
        temp.push(overall_grades.get(student_ids[i]));
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
    for (let i = 0; i < student_ids.length; i++) {
        temp.push(overall_grades.get(student_ids[i]));
    }
    return Math.max(...temp);
}       
function max() {
    temp = [];
    for (let i = 0; i < student_ids.length; i++) {
        temp.push(overall_grades.get(student_ids[i]));
    }
    return Math.max(...temp);
}   
function standard_deviation() {
    let average = mean();
    let sum = 0;
    temp = [];

    for (let i = 0; i < student_ids.length; i++) {
        temp.push(overall_grades.get(student_ids[i]));
    }

    for (let i = 0; i < temp.length; i++) {
        temp[i] = Math.round((average - temp[i]) * 100) / 100;
        temp[i] = temp[i] * temp[i];
        sum += temp[i];
    }

    return Math.round((Math.sqrt(sum / (temp.length - 1))) * 100) / 100;
}

function calc_overall() {
    //Multiply all categories by their weight and add together
        //Weights must add to 100 for formula above to work
    let output = 80;
    document.getElementById('class_avg_text').innerHTML = output;
}

function load_letter_scale() {
	var arr = JSON.parse(localStorage.getItem('ELS'));
	alert(arr[0]);
}

function to_letter_grade(x) {
	let out;
	if(x >= letter_scale[0]) {
		out = 'A';
	}
	else if(x >= letter_scale[1]) {
		out = 'B';
	}
	else if(x >= letter_scale[2]) {
		out = 'C';
	}
	else if(x >= letter_scale[3]) {
		out = 'D';
	}
	else {
		out = 'F';
	}
	document.getElementById('class_letter_text').innerHTML = out;
}

function calc_category_grade() {
    //Return % average of all grades in category
}
