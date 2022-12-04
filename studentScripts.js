// student class


// assumes User class already exists
class Student extends User {
    constructor(sid) {
        this.SID = sid;
        this.GPA = 0;
    }
}

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

// searches through containers based on their .name attribute, returns the found container
var searchByName = function(key, container) {
    let ret; // exist, albeit falsy
    for (item of container) if (item.name === key) { ret = item; break; }
    return ret;
}

// converts letter grade to a single number (for gpa calc) (this is that 'course gpa')
var gradeConvert = function(letterGrade) {
    let ret = -1;
    switch(letterGrade) {
        case "A": ret = 4.0; break;
        case "A-": ret = 3.7; break;
        case "B+": ret = 3.3; break;
        case "B": ret = 3.0; break;
        case "B-": ret = 2.7; break;
        case "C+": ret = 2.3; break;
        case "C": ret = 2.0; break;
        case "C-": ret = 1.7; break;
        case "D+": ret = 1.3; break;
        case "F": ret = 0; break;
    }
    return ret;
}


// calc gpa function
Student.prototype.calcGPA = function(courses) {
    // weighted average of a student's overall grades
    totalCredits = 0;
    weightSum = 0;
    for (i < 0; i < courses.length; i++) {
        totalCredits += courses[i].credits;
        weightSum += (courses[i].credits * convertGrade(toLetterGrade(courses[i].overall_grades[this.SID], courses[i].letter_scale, false)));
    }
    return fix(weightSum/totalCredits, 4);
}

// returns letter grade given the scale, letters, and an overall grade
var toLetter = function(grade, ranges, letters) {
    let letter = "",  max = 1.0;
    for (i = 0; i < ranges.length; i++) {
        if (grade >= ranges[i] && grade < max) { letter = letters[i]; break; }
        max = ranges[i];
    }
    return letter;
}

var toLetterGrade = function(grade, ranges, isStudent) {
    letters = (isStudent == true) ? ["A", "B", "C", "D", "F"] : ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F"];
    return toLetter(grade, ranges, letters);
}


// selfscaling just returns a STRING of an updated scale so that it is not permanent

// STILL NEEDS HTML THINGS, DO LATER.
Student.prototype.adjustSelfScaling = function(course, scale) {

    // get the grades!
    let letters = ["A", "B", "C", "D", "F"]; // should be a PARALLEL LIST TO SCALE
    let overallGrade = course.overall_grades[this.SID];
    let adjustedLetterGrade = toLetter(overallGrade, scale, letters);

    // adjusted scale string
    str = "";
    str += "<p> Overall Grade: " + overallGrade;
    str += "<br/> Letter Grade (adjusted): " + adjustedLetterGrade;

    // letter : max-min
    max = 1.0
    for (i = 0; i < scale.length; i++) str += "<br/>" + letters[i] + ": " + max + "-" + ranges[i];

    str += "</p>";
    return str;

}

// calculate from letter grade, given an assignment

var getMinGrade = function(scale, letter) {
    // assumes full letter grade scale, no A+ nor D-
    // also assumes letter WILL be found.
    let grades = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F"];
    return fix(scale[grades.indexOf(letter)], 3);
}
Student.prototype.caluclateGradeNeededAssignment = function(course, assignment, letter) {
    // convert letter grade to numeric form, minimum 
    let grade = getMinGrade(course.scale, letter), cat = assignment.category;

    // get number of assignments in category
    let sum = 0, nAss = 0;
    for (ass of course.assignments) {
        if (ass.category === cat) { nAss++; sum += (ass.grade[this.SID]); }
    }

    // ((Σa) + x) / n = g, gn - Σa = x 
    return fix(((grade * (nAss + 1)) - sum), 2);
}

Student.prototype.calculateGradeNeededCategory = function(course, category, letter) {
    // minimum numeric grade given letter
    let grade = getMinGrade(course.scale, letter);

    // category weight
    let w = course.category_weights[category];

    // getting weights and grades
    let catGrades = [], weights = [];
    for (i = 0; i < course.assignment_categories.length; i++) {
        if (course.assignment_categories[i] === cat) continue;
        catGrades.push(course.category_grades[i][this.SID]);
        weights.push(course.category_weights[course.assignment_categories[i]]);
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



// TO DO: GPA MATH HERE
function expandGpa() {
    gpaDiv.innerHTML += '<p>Overall GPA : 3.214<br/>Semester GPA: 3.345<br/>Class GPA: 3.342</p>';
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
//desired grade calculation
let gradeCalcText = document.getElementById('gradeCalcText');
let gradeCalcDiv = document.getElementById('gradeCalcMenu');

function expandGradeCalc() {
    gradeCalcDiv.innerHTML += '<label for="desiredGrade">Desired grade:</label><input type="text" name = "desiredGrade"><br/>';
    gradeCalcDiv.innerHTML += '<label for="desiredDropdown">Assignment:</label> <select name = "desiredDropdown" id = "desiredDropdown" class = "dropdown"> <option value="homework1" select>Homework 1</option><option value="quiz1">Quiz 1</option> </select ><br/>';
    gradeCalcDiv.innerHTML += '<button type="button" id="calcDesired" >Calculate desired grade</button><br/>';
    gradeCalcDiv.innerHTML += 'Minimum value for desired grade: 73.5%';
    gradeCalcText.removeEventListener("click", expandGradeCalc);
    gradeCalcText.addEventListener("click", collapseGradeCalc);
}

function collapseGradeCalc() {
    document.getElementById('gradeCalcMenu').innerHTML = "";
    gradeCalcText.removeEventListener("click", collapseGradeCalc);
    gradeCalcText.addEventListener("click", expandGradeCalc);
}

gradeCalcText.addEventListener("click", expandGradeCalc);


// TO DO: CATEGORY WEIGHTS HERE
//weight menu
let weightText = document.getElementById('weightText');
let weightDiv = document.getElementById('weightMenu');

function expandWeight() {
    weightDiv.innerHTML += 'Homework: 35%<br/>Quizes: 25%<br/>Writing Assignments: 400%';
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

