
//Variables
var name;
var credits;
const letters = ["A", "B", "C", "D", "F"];
// Maps
const overall_grades = new Map();
const category_weights = new Map();
const homework_grades = new Map();
const quiz_grades = new Map();
const exam_grades = new Map();
const cat_temp = new Map();

//Add Values
//{
    overall_grades[1] =  88.9;
    overall_grades[2] = 78.1;
    overall_grades[3] = 86.5;
    overall_grades[4] = 82.3;

    category_weights["Homework"] = 20;
    category_weights["Quiz"] = 30;
    category_weights["Exam"] =  50;

    homework_grades[1] = 76;
    homework_grades[2] = 77;
    homework_grades[3] = 78;
    homework_grades[4] = 79;

    quiz_grades[1] = 80;
    quiz_grades[2] = 81;
    quiz_grades[3] = 82;
    quiz_grades[4] = 83;

    exam_grades[1] = 84;
    exam_grades[2] = 85;
    exam_grades[3] = 86;
    exam_grades[4] = 87;

    cat_temp["Homework"] = homework_grades;
    cat_temp["Quiz"] = quiz_grades;
    cat_temp["Exam"] = exam_grades;
//}

//Lists
const assignment_categories = ["Homework", "Quiz", "Exam"];
const student_ids = [1, 2, 3, 4];   //May not implement
const assignments = [];
const letter_scale = [90, 80, 70, 60, 0];    //Corresponds to letter grades. A, B, C, D, F
const category_grades = [homework_grades, quiz_grades, exam_grades];

// IMLPEMENT USER CLASS IN HERE TOO
class Student {
    // add user stuff here
    constructor(name = "", sid = 0, gpa = 0) {
        this.name = name;
        this.SID = sid;
        this.GPA = gpa; // students current cumulative gpa
    }
}

class Assignment {
    constructor(name = "", dueDate = "", category = "") {
        this.name = name;
        this.dueDate = new Date(dueDate);
        this.category = category;
        this.isPublished = false;
        this.submitDate = new Map();
        this.grade = new Map();
    }
    // functions
    // toLetterGrade
    // updateGrades
}
class Course {
    constructor(name = "", credits = 0, assignmentCategories = [], scale = [], weights = {}) {
        this.name = name;
        this.credits = credits;
        this.categories = assignmentCategories;
        this.letterScale = scale;
        this.categoryWeights = weights; 



        // make empty lists for Assignments, cat grades and grades
        this.assignments = [];

        // overall grades, category grades
        this.overallGrades = new Map();
        this.categoryGrades = [];
        for (let i = 0; i < this.categories.length; i++) { this.categoryGrades.push(new Map()); }
    }

}


// class instatiations
var math = new Course("math", 3, assignment_categories, letter_scale, category_weights);
math.categoryGrades = cat_temp;
math.overallGrades = overall_grades;
var sandra = new Student("sandra", 1, 3.7);

// further lists
let courses = [math];

/*
HELPER FUNCTIONS
*/


// fixes a number to a set number of decimal places
var fix = function(n, d) { return Number(n.toFixed(d)); }

// returns weighted sum, default weights are 1.
var sum = function(A, weights = []) {
    let w = (weights == false) ? Array(A.length).fill(1) : weights;
    let sum = 0; for (i = 0; i < A.length; i++) sum += (A[i] * w[i]);
    return fix(sum, 2);
}

// converts letter grade to a single number (for gpa calc) (this is that 'course gpa')
var gradeConvert = function(letterGrade) {
    let ret = -1;
    if (letterGrade === "A") { ret = 4.0 }
    else if (letterGrade === "A-") { ret = 3.7; }
    else if (letterGrade === "B+") { ret = 3.3; }
    else if (letterGrade === "B") { ret = 3.0; }
    else if (letterGrade === "B-") { ret = 2.7; }
    else if (letterGrade === "C+") { ret = 2.3; }
    else if (letterGrade === "C") { ret = 2.0; }
    else if (letterGrade === "C-") { ret = 1.7; }
    else if (letterGrade === "D+") { ret = 1.3; }
    else if (letterGrade === "D") { ret = 1.0; }
    else if (letterGrade === "F") { ret = 0.0; }
    return Number(ret);
}

// returns letter grade given the scale, letters, and an overall grade
function toLetter(grade, ranges, letters) {
    let letter = "",  max = 1.0;
    for (let i = 0; i < ranges.length; i++) {
        if (grade >= ranges[i] && grade < max) { letter = letters[i]; break; }
        max = ranges[i];
    }
    return letter;
}

var toLetterGrade = function(grade, ranges, isStudent) {
    let letters = (isStudent == true) ? ["A", "B", "C", "D", "F"] : ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F"];
    return toLetter(grade, ranges, letters);
}

// calc gpa function
Student.prototype.calcGPA = function(courses) {
    // weighted average of a student's overall grades
    let totalCredits = 0, weightSum = 0;
    for (let i = 0; i < courses.length; i++) {
        let letterGrade = courses[i].overallGrades[this.SID];
        totalCredits += courses[i].credits;
        weightSum += (courses[i].credits * gradeConvert(toLetterGrade(letterGrade, courses[i].letterScale, true)));
    }
    let ret = fix(weightSum/totalCredits, 4);
    return ret;
}
// selfscaling just returns a STRING of an updated scale so that it is not permanent

// STILL NEEDS HTML THINGS, DO LATER.
Student.prototype.adjustSelfScaling = function(course, scale) {

    // get the grades!
    let overallGrade = course.overallGrades[this.SID];
    let adjustedLetterGrade = toLetter(overallGrade, scale, letters);

    // adjusted scale string
    let str = "";
    str += "<p> Overall Grade: " + overallGrade + "<br/>";
    str += "Letter Grade (adjusted): " + adjustedLetterGrade + "<br/>";
    return str;

}

// calculate from letter grade, given an assignment

var getMinGrade = function(scale, letter) {
    // assumes full letter grade scale.
    // also assumes letter WILL be found.
    let grades = ["A", "B", "C", "D", "F"];
    return fix(scale[grades.indexOf(letter)], 3);
}
Student.prototype.calculateGradeNeededAssignment = function(course, cat, letter) {
    // convert letter grade to numeric form, minimum 
    let grade = getMinGrade(course.letterScale, letter);

    // get number of assignments in category
    let sum = 0, nAss = 0;
    for (let ass of course.assignments) {
        if (ass.category === cat) { nAss++; sum += (ass.grade[this.SID]); }
    }

    // ((Σa) + x) / n = g, gn - Σa = x 
    return fix(((grade * (nAss + 1)) - sum), 2);
}

Student.prototype.calculateGradeNeededCategory = function(course, cat, letter) {
    // minimum numeric grade given letter
    let grade = getMinGrade(course.letterScale, letter);

    // category weight
    let w = course.categoryWeights[cat];

    // getting weights and grades
    let catGrades = [], weights = [];
    for (i = 0; i < course.categories.length; i++) {
        if (course.categories[i] === cat) continue;
        catGrades.push(course.categoryGrades[i][this.SID]);
        weights.push(course.categoryWeights[course.categories[i]]);
    }

    // grade needed
    // (Σwici) + wc = g, (g -(Σwici)) / w = c
    needed = (grade - sum(catGrades, weights)) / w;
    return fix(needed, 3);

}

// mock grade stuff.
Student.prototype.enterMockGrade = function(course, assignment, grade) {
    // 1. get grades and categories
    let catGrades = [], weights = [];
    for (i = 0;i < course.assignment_categories.length; i++) {
        let cat = course.assignment_categories[i];
        catGrades.push(course.category_grades[i][this.SID]);
        weights.push(course.category_weights[cat]);
    }

    // 2. updating grade category with grade, assumes grade and category grades are on same scale (0-1 or 0-100)

    // number of assignments currently in category
    let nAss = 0, cat = assignment.category, catDex = course.assignment_categories.indexOf(cat);
    for (ass of course.assignments) nAss += ((ass.category === cat) ? 1 : 0);

    // update category
    catGrades[catDex] = ((catGrades[catDex] * nAss) + grade) / (nAss + 1);

    // update overall grade
    new_grade = sum(catGrades, weights);

    // returns a list, 1st element is numeric, 2nd is letter
    return [new_grade, toLetterGrade(new_grade, course.scale, false)];
}

//this makes the textFields on every other assingment yellow
const highlightedItems = document.querySelectorAll(".gradeNumerator");
//for loop to make the textFields yellow, I give them the class highlight to do this
for (ele = 0; ele < highlightedItems.length; ele++) {
    if (ele % 2 == 1) {
    highlightedItems[ele].classList.add('highlight');
    }  
}

//beggining of menu on the right
//sorting button code
//the logic here gets repeated for each button on the right menu
let sortText = document.getElementById('sortingText');//this is the button
let sortDiv = document.getElementById('sortingMenu');//this is the div where we insert the content
//it is blank by default in the html, we add the content thru expandSort() and clear the content in collapseSort()

function expandSort() {
    //fill sortDiv with content
    sortDiv.innerHTML += '<label for="typeSort">Sort by type:</label> <select name = "typeSort" id = "typeSort" class = "dropdown"> <option value="none" select>None</option> <option value="homework">Homework</option><option value="quizes">Quizes</option><option value="writingAssignments">Writing Assignments</option></select > <br />';
    sortDiv.innerHTML += '<label for="dateSort">Sort by due date:</label> <select name = "dateSort" id = "dateSort" class = "dropdown"> <option value="descending" select>Descending</option><option value="ascending">Ascending</option> </select >';
    sortText.removeEventListener("click", expandSort);//turn off expand sort on the button
    sortText.addEventListener("click", collapseSort);//turn on collapseSort on the button
}

function collapseSort() {
    document.getElementById('sortingMenu').innerHTML = ""; //clear the div
    sortText.removeEventListener("click", collapseSort);//turn off collapse
    sortText.addEventListener("click", expandSort);//turn on expand
}

sortText.addEventListener("click", expandSort);//make sure the button has expandSort() on originally

//GPA button, same logic as above
let gpaText = document.getElementById('gpaText');
let gpaDiv = document.getElementById('gpaMenu');


function expandGpa() {
    // weighted average of a student's overall grades
    gpa = sandra.calcGPA(courses);
    gpaDiv.innerHTML += 'Semester GPA: ' + gpa + '<br/></p>';
    gpaText.removeEventListener("click", expandGpa);
    gpaText.addEventListener("click", collapseGpa);
}

function collapseGpa() {
    document.getElementById('gpaMenu').innerHTML = "";
    gpaText.removeEventListener("click", collapseGpa);
    gpaText.addEventListener("click", expandGpa);
}

gpaText.addEventListener("click", expandGpa);

//mock grade entry
let mockText = document.getElementById('mockText');
let mockDiv = document.getElementById('mockMenu');

function expandMock() {
    mockDiv.innerHTML += '<div><button type="button" id="calcMock" class="menuButton">Calculate mock grade</button></div>';
    for (ele = 0; ele < highlightedItems.length; ele++) {  
        highlightedItems[ele].classList.add('mockColor');
        highlightedItems[ele].readOnly = false;
    }

    mockText.removeEventListener("click", expandMock);
    mockText.addEventListener("click", collapseMock);
}

function collapseMock() {
    document.getElementById('mockMenu').innerHTML = "";
    for (ele = 0; ele < highlightedItems.length; ele++) {
        highlightedItems[ele].classList.remove('mockColor');
        highlightedItems[ele].readOnly = true;
    }
    mockText.removeEventListener("click", collapseMock);
    mockText.addEventListener("click", expandMock);
}

mockText.addEventListener("click", expandMock);


// TO DO: CfLG MATH HERE
//desired grade calculation (assignment)
let gradeCalcTextAss = document.getElementById('gradeCalcTextAss');
let gradeCalcDivAss = document.getElementById('gradeCalcMenuAss');

let fooval;
let foovalString = "";
function foo() { 

    foovalString = "";
    let grade = String(document.getElementById("desiredGrade").value); 
    let cat = String(document.getElementById("desiredDropdown").value);
    fooval = sandra.calculateGradeNeededAssignment(math, cat, grade);
    foovalString = fooval + "%";
    gradeCalcDivAss.innerHTML += foovalString;
 }
function expandGradeCalcAss() {
    gradeCalcDivAss.innerHTML += '<label for="desiredGrade">Desired grade:</label><input type="text" name = "desiredGrade" id = desiredGrade><br/>';
    gradeCalcDivAss.innerHTML += '<label for="desiredDropdown">Assignment:</label> <select name = "desiredDropdown" id = "desiredDropdown" class = "dropdown"> <option value="homework1" select>Homework 1</option><option value="quiz1">Quiz 1</option> </select ><br/>';
    

    // TO DO: make Assignment Instatiations for a smarter dropdown menu
    gradeCalcDivAss.innerHTML += '<button type="button" id="calcDesired" onclick="foo()">Calculate desired grade</button><br/>';
    gradeCalcDivAss.innerHTML += 'Minimum value for desired grade: ';
    gradeCalcTextAss.removeEventListener("click", expandGradeCalcAss);
    gradeCalcTextAss.addEventListener("click", collapseGradeCalcAss);
}

function collapseGradeCalcAss() {
    document.getElementById('gradeCalcMenuAss').innerHTML = "";
    gradeCalcTextAss.removeEventListener("click", collapseGradeCalcAss);
    gradeCalcTextAss.addEventListener("click", expandGradeCalcAss);
}

gradeCalcTextAss.addEventListener("click", expandGradeCalcAss);

// CfLG MATH HERE
//desired grade calculation (category)
let gradeCalcTextCat = document.getElementById('gradeCalcTextCat');
let gradeCalcDivCat = document.getElementById('gradeCalcMenuCat');

let barval;
let barvalString = "";
function bar() { 

    foovalString = "";
    let grade = String(document.getElementById("desiredGrade").value); 
    let cat = String(document.getElementById("desiredDropdown").value);
    fooval = sandra.calculateGradeNeededAssignment(math, cat, grade);
    foovalString = fooval + "%";
    gradeCalcDivCat.innerHTML += foovalString;
 }

 function getDropDownOptions(A, dropdownName) {
    let options = '<label for="desiredDropdown">' + dropdownName + ':</label><select name = "desiredDropdown" id = "desiredDropdown" class = "dropdown">';
    for (let i = 0; i < A.length; i++) {
        let cat = A[i];
        options += '<option value="' + cat + '"';
        if (i === 0) { options += ' select';}
        options += '>' + cat + '</option>'; 
    }
    options += "</select ><br/>";
    return options;
 }
function expandGradeCalcCat() {
    gradeCalcDivCat.innerHTML += '<label for="desiredGrade">Desired grade:</label><input type="text" name = "desiredGrade" id = desiredGrade><br/>';
    gradeCalcDivCat.innerHTML += getDropDownOptions(math.categories, "Category");
    gradeCalcDivCat.innerHTML += '<button type="button" id="calcDesired" onclick="bar()">Calculate desired grade</button><br/>';
    gradeCalcDivCat.innerHTML += 'Minimum value for desired grade: ';
    gradeCalcTextCat.removeEventListener("click", expandGradeCalcCat);
    gradeCalcTextCat.addEventListener("click", collapseGradeCalcCat);
}

function collapseGradeCalcCat() {
    document.getElementById('gradeCalcMenuCat').innerHTML = "";
    gradeCalcTextCat.removeEventListener("click", collapseGradeCalcCat);
    gradeCalcTextCat.addEventListener("click", expandGradeCalcCat);
}

gradeCalcTextCat.addEventListener("click", expandGradeCalcCat);


//weight menu
let weightText = document.getElementById('weightText');
let weightDiv = document.getElementById('weightMenu');


function expandWeight() {
    let str = "";
    for (let i = 0; i < math.categories.length; i++) {
        let cat = String(math.categories[i]);
        str += cat +": " +  math.categoryWeights[cat] + "%<br/>";
    }
    weightDiv.innerHTML += str;
    weightText.removeEventListener("click", expandWeight);
    weightText.addEventListener("click", collapseWeight);
}

function collapseWeight() {
    document.getElementById('weightMenu').innerHTML = "";
    weightText.removeEventListener("click", collapseWeight);
    weightText.addEventListener("click", expandWeight);
}

weightText.addEventListener("click", expandWeight);

//export menu
let exportText = document.getElementById('exportText');
let exportDiv = document.getElementById('exportMenu');

function expandExport() {
    exportDiv.innerHTML += '<div id = "csvDiv" class="exportButton"><button type="button" id="exportCSV" class="menuButton">Export as CSV </button></div>';
    exportDiv.innerHTML += '<div id = "pdfDiv" class="exportButton"><button type="button" id="exportPDF" class="menuButton">Export as PDF </button></div>';
    exportText.removeEventListener("click", expandExport);
    exportText.addEventListener("click", collapseExport);
}

function collapseExport() {
    document.getElementById('exportMenu').innerHTML = "";
    exportText.removeEventListener("click", collapseExport);
    exportText.addEventListener("click", expandExport);
}

exportText.addEventListener("click", expandExport);

//toggle weight
let weightToggleText = document.getElementById('weightToggleText');
let weightToggleDiv = document.getElementById('weightToggleMenu');

function expandWeightToggle() {
    weightToggleDiv.style.display = 'block';
    weightToggleText.removeEventListener("click", expandWeightToggle);
    weightToggleText.addEventListener("click", collapseWeightToggle);
}

function collapseWeightToggle() {
    weightToggleDiv.style.display = 'none';
    weightToggleText.removeEventListener("click", collapseWeightToggle);
    weightToggleText.addEventListener("click", expandWeightToggle);
}

weightToggleText.addEventListener("click", expandWeightToggle);


//toggle weight butons, this switches the color between them 
let weightedButton = document.getElementById('weightedGrade');
let unweightedButton = document.getElementById('unweightedGrade');

function weightedButtonSelected(){
    weightedButton.removeEventListener('click', weightedButtonSelected);
    unweightedButton.addEventListener('click', unweightedButtonSelected);
    weightedButton.classList.remove('unselectedWeightButton');
    weightedButton.classList.add('selectedWeightButton'); 
    unweightedButton.classList.remove('selectedWeightButton');
    unweightedButton.classList.add('unselectedWeightButton');
}

function unweightedButtonSelected() {
    unweightedButton.removeEventListener('click', unweightedButtonSelected);
    weightedButton.addEventListener('click', weightedButtonSelected);
    unweightedButton.classList.remove('unselectedWeightButton');
    unweightedButton.classList.add('selectedWeightButton');
    weightedButton.classList.remove('selectedWeightButton');
    weightedButton.classList.add('unselectedWeightButton');
}

unweightedButton.addEventListener("click", unweightedButtonSelected);
weightedButton.classList.add('selectedWeightButton');
unweightedButton.classList.add('unselectedWeightButton');


//adjust self scaling button code
//the logic here gets repeated for each button on the right menu
let adjustText = document.getElementById('selfScaleText');//this is the button
let adjustDiv = document.getElementById('selfScaleMenu');//this is the div where we insert the content
//it is blank by default in the html, we add the content thru expandSort() and clear the content in collapseSort()


let bazval= "";
function baz() {
    // get the numbers entered to form a scale list
    let inputs = document.getElementById("selfScale"), ranges = [];
    for (let i = 0; i < letters.length; i++) ranges.push(document.getElementById("selfScale" + letters[i]).value);

    // compute the new letter grade
    bazval = sandra.adjustSelfScaling(math, ranges);
    adjustDiv.innerHTML += bazval;
}
function expandAdjust() {

    // showing the letters
    let divName = "selfScale";
    let str = ': <input type="text" id="' + divName;
    adjustDiv.innerHTML += '<form id="' + divName +'">';
    for (let letter of letters) { adjustDiv.innerHTML += letter + str + letter +'">' + '<br/>'; }

    // calc new letter grade button
    adjustDiv.innerHTML += '<button type="button" id="scale" onclick="baz()">Calculate letter grade</button><br/>';

    adjustText.removeEventListener("click", expandAdjust);//turn off expand sort on the button
    adjustText.addEventListener("click", collapseAdjust);//turn on collapseSort on the button
}

function collapseAdjust() {
    document.getElementById('selfScaleMenu').innerHTML = ""; //clear the div
    adjustText.removeEventListener("click", collapseAdjust);//turn off collapse
    adjustText.addEventListener("click", expandAdjust);//turn on expand
}

adjustText.addEventListener("click", expandAdjust);//make sure the button has expandSort() on originally



// STUFF I COPIED OVER FOR EASE OF USE CUZ I TOO LAZY TO SPLIT UP FILES/CONNECT THEM TOGETHER
// JavaScript source code

// dont worry about this stuff


//overall_grade Functions
Course.prototype.calcStatistics = function() {
    return [mean(), median(), standard_deviation(), max(), min()];
}   
Course.prototype.mean = function() {
    sum = 0;
    for (let i = 0; i < student_ids.length; i++) {
        sum += overall_grades.get(student_ids[i]);
    }
    return (sum / student_ids.length);
}       
Course.prototype.median = function() {
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
Course.prototype.min = function() {
    temp = [];
    for (let i = 0; i < student_ids.length; i++) {
        temp.push(overall_grades.get(student_ids[i]));
    }
    return Math.max(...temp);
}       
Course.prototype.max = function() {
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