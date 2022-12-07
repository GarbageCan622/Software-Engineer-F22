// local storage retrieval
let MCats_names = JSON.parse(localStorage.getItem("MCats_names"));
let MCats_num = JSON.parse(localStorage.getItem("MCats_num"));
let MSL = JSON.parse(localStorage.getItem("MSL"));
let MSIDs = JSON.parse(localStorage.getItem("MSIDs"));
let CW1 = JSON.parse(localStorage.getItem("CW1"));
let CW2 = JSON.parse(localStorage.getItem("CW2"));
let MHW1 = JSON.parse(localStorage.getItem("MHW1"));
let MHW2 = JSON.parse(localStorage.getItem("MHW2"));
let MQ1 = JSON.parse(localStorage.getItem("MQ1"));
let ME1 = JSON.parse(localStorage.getItem("ME1"));


// fixes a number to a set number of decimal places
var fix = function(n, d) { return Number(n.toFixed(d)); }

// returns weighted sum, default weights are 1.
var sum = function(A, weights = []) {
    let w = (weights == false) ? Array(A.length).fill(1) : weights;
    let sum = 0; for (i = 0; i < A.length; i++) sum += (A[i] * w[i]);
    return fix(sum, 2);
}

// count sort
// A is some array of assignments
// radix is some array that holds the 'digits' for the counts, length is the 'base'
function countSort(A, radix) {
    let count = (new Array(radix)).fill(0), aux = new Array(A.length), i;
    for (i = 0; i < A.length; i++) count[radix.indexOf(A[i].category)]++; // counting
    for (i= 1; i < A.length; i++) count[i] += count[i - 1]; // index mapping
    for (i= 0; i < A.length; i++) { // placing in auxillary array
        j = radix.indexOf(A[i].category);
        aux[count[j]] = A[i];
        count[j]--;
    }
    for (i = 0; i < A.length; i++) { A[i] = aux[i];}
    return A;
}
//Variables
const letters = ["A", "B", "C", "D", "F"];
// Maps
const overall_grades = new Map();
const category_weights = new Map();
const homework_grades = new Map();
const quiz_grades = new Map();
const exam_grades = new Map();
const cat_temp = new Map();
const writing_assignments = new Map();

//Add Values
//{
    overall_grades[1] =  88.9;
    overall_grades[2] = 78.1;
    overall_grades[3] = 86.5;
    overall_grades[4] = 82.3;

    category_weights["Homework"] = 20;
    category_weights["Quiz"] = 15;
    category_weights["Exam"] =  40;
    category_weights["Writing Assignments"] = 25;

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

    writing_assignments[1] = 70;

    cat_temp["Homework"] = homework_grades;
    cat_temp["Quiz"] = quiz_grades;
    cat_temp["Exam"] = exam_grades;
    cat_temp["Writing Assignments"] = writing_assignments;
//}

//Lists
const assignment_categories = ["Homework", "Quiz", "Exam", "Writing Assignments"];
const student_ids = [1, 2, 3, 4];   //May not implement
const assignments = [];
const letter_scale = [90, 80, 70, 60, 0];    //Corresponds to letter grades. A, B, C, D, F
const category_grades = [homework_grades, quiz_grades, exam_grades, writing_assignments];

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
    //constructor(name = "", category = "", dueDate = "", points = 100) {
    constructor(name , category) {
        this.name = name;
        //this.dueDate = (dueDate == false) ? (new Date()).toDateString() : (new Date(dueDate)).toDateString();
        this.category = category;
        this.points = 100;
        this.isPublished = false;
        this.grade = [-493];
    }

    // generates the HTML code to display an assignment properly based on the provided grid structure
    toHTMLString(SID) {
        let grade = fix(100 * (this.grade[SID] / this.points), 3);
        if (weightOn) { grade = fix((grade * math.categoryWeights[this.category] / 100), 3); } // RWALLY BAD FIX
        str = "";
        str += '<div class="textLeft">' + this.name + '</div>';
        str += '<div class="textRight"><input type = "text" class="gradeNumerator" value="' + this.grade[SID] + '"readonly>/' + this.points + '</div>';
        str += '<div class="textLeft">Category: ' + this.category + '</div>';
        str += '<div class="textRight">Grade: ' + grade + '</div>';
        //str += '<div class="textLeft">Due Date: ' + this.dueDate + '</div>';
        //str += '<div class="textRight">Submitted: ' + this.submitDate[SID] + '</div>';
        return str;
    }

    // string form of an assignment for a student (comma separated)
    toString(SID) {
        let str = "";
        str += this.name +",";
        str += this.category + ",";
        //str += (this.dueDate) + ",";
        str += this.points + ",";
        //str += (this.submitDate[SID]) + ",";
        str += (this.grade[SID]) + ",";
        str += (this.grade[SID] / this.points * 100) + "%\n";
        return str;
    }
}
class Course {
    constructor(name = "", assignmentCategories = [], scale = [], weights = []) {
        this.name = name;
        this.credits = 3;
        this.categories = assignmentCategories;
        this.letterScale = scale;

        // construct map from list
        this.categoryWeights = new Map();
        for (let i = 0; i < this.categories.length; i++) { this.categoryWeights[this.categories[i]] = weights[i]; }



        // make empty lists for Assignments, cat grades and grades
        this.assignments = [];

        // overall grades, category grades
        this.overallGrades = new Map();
        this.categoryGrades = new Map;
        for (let cat of this.categories) { this.categoryGrades[cat] = new Map(); }
    }
    toHTMLString(sid) {
        //let grade = this.overallGrades[sid], letterGrade = toLetter(grade, this.letterScale, letters);
        let head = '<div id="assignHead"><h2><u>My Grades</u></h2><div id="blank"></div>';
        head += '<div class="textLeft"><h3>Total:</h3></div><div class="textRight"><h3>' + 90 + ': ' + 'A' + '</h3></div></div>';
        let str = head + genAssignments(this, sid);
        return str;
    }
    setAssignment(name, sids, grades, category) {
        let ass = new Assignment(name, category);

        console.log(sids[0]);
        // add student grades to assignment
        for (let i = 0; i < grades.length; i++) {
            ass.isPublished = !(grades[i] === '-');
            ass.grade.push(grades[i]);
        }
        console.log(ass.grade);
        // add assignment to course
        this.assignments.push(ass);

    }

}


// class instatiations



// course(s)
var math = new Course("math", MCats_names, MSL, MCats_num);
//math.categoryGrades = cat_temp;
//math.overallGrades = overall_grades;

// student
var sandra = new Student("stavros", 1, 3.7);

math.setAssignment("Classwork 1", MSIDs, CW1, "classwork");
math.setAssignment("Classwork 2", MSIDs, CW2, "classwork");
math.setAssignment("Homework 1", MSIDs, MHW1, "homework");
math.setAssignment("Homework 2", MSIDs, MHW2, "homework");
math.setAssignment("Quiz 1", MSIDs, MQ1, "quiz");
math.setAssignment("Exam 1", MSIDs, ME1, "exam");

// further lists
let courses = [math];


// html assignment generation
str = "";
//head = '<div id="assignHead"><h2><u>My Grades</u></h2><div id="blank"></div><div class="textLeft"><h3>Total:</h3></div><div class="textRight"><h3>83.2% : B</h3></div></div>';
function genAssignments(course, sid) {
    let str = '<div id="assignGradesStu">';
    for (assignment of course.assignments) {
        str += assignment.toHTMLString(sid);
    }
    str += '</div>';
    return str;
}
document.getElementById("assignments").innerHTML = math.toHTMLString(sandra.SID);
document.getElementById("assignments").innerHTML = "";
document.getElementById("assignments").innerHTML = math.toHTMLString(sandra.SID);

/*
HELPER FUNCTIONS
*/

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
        if (ass.category == cat && ass.isPublished == true) { nAss++; sum += (ass.grade[this.SID]); }
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
    let needed = (grade - sum(catGrades, weights)) / w;
    return fix(needed, 3);

}

// mock grade stuff.
Student.prototype.enterMockGrade = function(course, assCat, grade) {
    // 1. get grades and categories
    let catGrades = new Array(); weights = new Array();
    for (let i = 0; i < course.categories.length; i++) {
        let cat = course.categories[i];
        catGrades.push(course.categoryGrades[cat][this.SID]);
        weights.push(course.categoryWeights[cat] / 100);
    }

    // 2. updating grade category with grade, assumes grade and category grades are on same scale (0-1 or 0-100)

    // number of assignments currently in category
    let nAss = 0, catDex = course.categories.indexOf(assCat);
    for (ass of course.assignments) nAss += ((ass.category == assCat && ass.isPublished == true) ? 1 : 0);

    // update category
    let newVal = ((catGrades[catDex] * nAss) + grade) / (nAss + 1);
    catGrades[catDex] = newVal;

    // update overall grade
    // buggy
    let new_grade = sum(catGrades, weights);
    let letter_grade = toLetter(new_grade, course.letterScale, letters);

    //mockDiv.innerHTML += newVal + " : " + new_grade + " : " + letter_grade;

    // returns a list, 1st element is numeric category grade, 2nd is numeric overall grade, 3rd is overall letter grade
    return [catGrades[catDex], new_grade, letter_grade];
    //return -493;
}

function getAssList(A) {
    let assList = [];
    for (let ass of A) { if (ass.isPublished === false) {assList.push(ass.name);} }
    return assList;
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


function qux() {
    let choice = String(document.getElementById("assSort").value), cats = math.categories; cats.sort();

    // inner sort of assignments (unstable)
    ass = math.assignments.sort(function(a, b){ return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);});

    // outer sort of categories (stable)
    //ass = countSort(ass, cats);
    //sortDiv.innerHTML += ass;

    // descending reverses order of elements
    if (choice == "descending") { ass.reverse(); }
    math.assignments = ass;
    document.getElementById("assignments").innerHTML = math.toHTMLString(sandra.SID);
}
function expandSort() {
    //fill sortDiv with content
    //sortDiv.innerHTML += '<label for="typeSort">Sort by type:</label> <select name = "typeSort" id = "typeSort" class = "dropdown"> <option value="none" select>None</option> <option value="homework">Homework</option><option value="quizes">Quizzes</option><option value="writingAssignments">Writing Assignments</option></select > <br />';
    sortDiv.innerHTML += '<label for="assSort">Sort order:</label> <select name = "assSort" id = "assSort" class = "dropdown"> <option value="descending" select>Descending</option><option value="ascending">Ascending</option> </select >';
    sortDiv.innerHTML += '<br/><button type="sortButton" onClick="qux()">sort assignments</button><br/>';
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

function findMock(course, sid, grades) {
    // find the mock (modified) grade
    let mockdex = -1, i;
    for (i = 0; i < course.assignments.length; i++) {
        let ass = course.assignments[i];
        if (grades[i].value != ass.grade[sid]) { mockdex = i; break;}
    }
    return mockdex;
}
function quuz() {
    // retrieve the one (1) grade that has been changed
    let grade;
    let grades = document.getElementsByClassName("gradeNumerator");
    mockdex = findMock(math, sandra.SID, grades);
    grade = (grades[mockdex].value / math.assignments[mockdex].points) * 100;
    grade = fix(grade, 3);
    mockGrades = sandra.enterMockGrade(math, math.assignments[mockdex].category, grade);
    mockDiv.innerHTML += "Category Grade: " + mockGrades[0] + "</br>";
    mockDiv.innerHTML += "Course Grade: " + mockGrades[1] + "</br>";
    mockDiv.innerHTML += "Letter Grade: " + mockGrades[2] + "</br>";
}
function expandMock() {
    // on click get the grades
    mockDiv.innerHTML += '<div><button type="button" id="calcMock" class="menuButton" onclick="quuz()">Calculate mock grade</button></div>';
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
    gradeCalcDivAss.innerHTML += getDropDownOptions(getAssList(math.assignments), "Assignment");
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

function generateCSV(course, sid) {
    // get category titles for assignments
    let str = "";
    //str += "name,category,due date,total points,submitted,points,grade\n";
    str += "name,category,total points,points,grade\n";
    for (let i = 0; i < course.assignments.length; i++) {
        str += course.assignments[i].toString(sid);
    }
    return str;
}
function csvExport() {
    var text = generateCSV(math, sandra.SID);
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(new Blob([text], {type: "text/plain"}));
    a.download = "UserGrades.csv";
    a.click();
}
function pdfExport() {
}
function expandExport() {
    exportDiv.innerHTML += '<div id = "csvDiv" class="exportButton"><button type="button" id="exportCSV" class="menuButton" onclick="csvExport()">Export as CSV </button></div>';
    exportDiv.innerHTML += '<div id = "pdfDiv" class="exportButton"><button type="button" id="exportPDF" class="menuButton" onclick="pdfExport()">Export as PDF </button></div>';
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

var weightOn = false;
function toggleUnWeight() {
    if (weightOn) { weightOn = !weightOn; }
    document.getElementById("assignments").innerHTML = math.toHTMLString(sandra.SID);
}
function toggleWeight() {
    if (!weightOn) { weightOn = !weightOn; }
    document.getElementById("assignments").innerHTML = math.toHTMLString(sandra.SID);
}
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


// local storage how-to
/*
if (document.getElementById('MHomework1') != null) { //check if id is on this page, really we are checking if we are in mathStudent or englishStudent. If the id is on the page grab the value of the assignment stored in the localStorage and use that as the value
    document.getElementById('MHomework1').value = localStorage.getItem('MHomework1');
}

if (document.getElementById('MQuiz1') != null) {
    document.getElementById('MQuiz1').value = localStorage.getItem('MQuiz1');
}

if (document.getElementById('EHomework1') != null) {
    document.getElementById('EHomework1').value = localStorage.getItem('EHomework1');
}

if (document.getElementById('EQuiz1') != null) {
    document.getElementById('EQuiz1').value = localStorage.getItem('EQuiz1');
}
*/
let x = document.getElementById("headerText").innerHTML;
console.log(x);