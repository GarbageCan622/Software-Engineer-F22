let studentNames = ['Stavros Halkias', 'Tony Soprano', 'Saul Goodman'];
//this is connected to the edit grades button on Homework 1, currently every edit grades button has corresponding javascipt to expand the menu
let studentNamesHw1 = document.getElementById('studentNamesHw1'); //student names is in its own div so that they are displayed on the left
//homework 1
let hw1Grades = document.getElementById('hw1Grades'); //grades and button are in the same div so that they are on the right
let hw1Button = document.getElementById('hw1');





function expandHw1() { //expands homework 1 and displays the names, grades and the save changes button
    studentNamesHw1.classList.remove('hidden');
    hw1Grades.classList.remove('hidden');
    hw1Button.removeEventListener("click", expandHw1);
    hw1Button.addEventListener("click", collapseHw1);
}

function collapseHw1() { 
    studentNamesHw1.classList.add('hidden');
    hw1Grades.classList.add('hidden');
    hw1Button.removeEventListener("click", collapseHw1);
    hw1Button.addEventListener("click", expandHw1);
}

hw1Button.addEventListener("click", expandHw1);//base event listener so the button works from the begining 


//Quiz 1, same logic as homework 1
let studentNamesQ1 = document.getElementById('studentNamesQ1');
let q1Grades = document.getElementById('q1Grades');
let q1Button = document.getElementById('q1');

function expandQ1() {
    studentNamesQ1.classList.remove('hidden');
    q1Grades.classList.remove('hidden');
    q1Button.removeEventListener("click", expandQ1);
    q1Button.addEventListener("click", collapseQ1);
}

function collapseQ1() {
    studentNamesQ1.classList.add('hidden');
    q1Grades.classList.add('hidden');
    q1Button.removeEventListener("click", collapseQ1);
    q1Button.addEventListener("click", expandQ1);
}

q1Button.addEventListener("click", expandQ1);

//this is the begining of the menu on the right
//this is the logic for the add assignment button
let addAssignText = document.getElementById('addAssignText');
let addAssignDiv = document.getElementById('addAssignMenu');

function expandAddAssign() {
    addAssignDiv.innerHTML += '<label for="assignName">Assignment name:</label><input type="text" name = "assignName"><br/>';
    addAssignDiv.innerHTML += '<label for="assignType">Select assignment type:</label> <select name = "assignType" id = "assignType" class = "dropdown"> <option value="homework" select>Homework</option><option value="quiz">Quiz</option><option value="writingAssignments">Writing Assignments</option> </select ><br/>';
    addAssignDiv.innerHTML += '<label for="dueDate">Due date:</label><input type="text" name = "dueDate"><br/>';
    addAssignDiv.innerHTML += '<label for="totalPoints">Point total:</label><input type="text" name = "totalPoints">';
    addAssignText.removeEventListener("click", expandAddAssign);
    addAssignText.addEventListener("click", collapseAddAssign);
}

function collapseAddAssign() {
    document.getElementById('addAssignMenu').innerHTML = "";
    addAssignText.removeEventListener("click", collapseAddAssign);
    addAssignText.addEventListener("click", expandAddAssign);
}

addAssignText.addEventListener("click", expandAddAssign);


//view student grades
let viewStudentGradesText = document.getElementById('viewStudentGradesText');
let viewStudentGradesDiv = document.getElementById('viewStudentGradesMenu');

function expandViewStudentGrades() {
    viewStudentGradesDiv.innerHTML += '<label for="chooseStudentView">Select student:</label> <select name = "chooseStudentView" id = "chooseStudentView" class = "dropdown"><option value="none" select>-</option> <option value="stavros">Stavros Halkias</option><option value="tony">Tony Soprano</option><option value="saul">Saul Goodman</option> </select ><br/>';
    viewStudentGradesDiv.innerHTML += '<a href="mathStudent.html"><button type="button">View student</button></a>';
    viewStudentGradesText.removeEventListener("click", expandViewStudentGrades);
    viewStudentGradesText.addEventListener("click", collapseViewStudentGrades);
}

function collapseViewStudentGrades() {
    document.getElementById('viewStudentGradesMenu').innerHTML = "";
    viewStudentGradesText.removeEventListener("click", collapseViewStudentGrades);
    viewStudentGradesText.addEventListener("click", expandViewStudentGrades);
}

viewStudentGradesText.addEventListener("click", expandViewStudentGrades);

//adjust letter scaling
let adjustLetterScalingText = document.getElementById('adjustLetterScalingText');
let adjustLetterScalingDiv = document.getElementById('adjustLetterScalingMenu');

function expandAdjustLetterScaling() {
    adjustLetterScalingDiv.innerHTML += 'Enter upper and lower bounds for letter grades<br/>';
    adjustLetterScalingDiv.innerHTML += '<label for="uA">Upper A:</label><input type="text" name = "uA"><br/>';
    adjustLetterScalingDiv.innerHTML += '<label for="lA">Lower A:</label><input type="text" name = "lA"><br/>';
    adjustLetterScalingDiv.innerHTML += '<label for="uB">Upper B:</label><input type="text" name = "uB"><br/>';
    adjustLetterScalingDiv.innerHTML += '<label for="lB">Lower B:</label><input type="text" name = "lB"><br/>';
    adjustLetterScalingDiv.innerHTML += '<label for="uC">Upper C:</label><input type="text" name = "uC"><br/>';
    adjustLetterScalingDiv.innerHTML += '<label for="lC">Lower C:</label><input type="text" name = "lC"><br/>';
    adjustLetterScalingDiv.innerHTML += '<label for="uD">Upper D:</label><input type="text" name = "uD"><br/>';
    adjustLetterScalingDiv.innerHTML += '<label for="lD">Lower D:</label><input type="text" name = "lD"><br/>';
    adjustLetterScalingDiv.innerHTML += '<label for="F">F:</label><input type="text" name = "F"><br/>';
    adjustLetterScalingText.removeEventListener("click", expandAdjustLetterScaling);
    adjustLetterScalingText.addEventListener("click", collapseAdjustLetterScaling);
}

function collapseAdjustLetterScaling() {
    document.getElementById('adjustLetterScalingMenu').innerHTML = "";
    adjustLetterScalingText.removeEventListener("click", collapseAdjustLetterScaling);
    adjustLetterScalingText.addEventListener("click", expandAdjustLetterScaling);
}

adjustLetterScalingText.addEventListener("click", expandAdjustLetterScaling);

//categories
let categoriesText = document.getElementById('categoriesText');
let categoriesDiv = document.getElementById('categoriesMenu');

function expandCategories() {
    categoriesDiv.innerHTML += 'Categories:<br/>';
    categoriesDiv.innerHTML += '<label for="cat1">Homework:</label><input type="text" name = "cat1" value = "35%"><br/>';
    categoriesDiv.innerHTML += '<label for="cat2">Quizes:</label><input type="text" name = "cat2" value = "25%"><br/>';
    categoriesDiv.innerHTML += '<label for="cat3">Homework:</label><input type="text" name = "cat3" value = "40%"><br/>';
    categoriesDiv.innerHTML += '<button type="button" >Add new category</button>';
    categoriesText.removeEventListener("click", expandCategories);
    categoriesText.addEventListener("click", collapseCategories);
}

function collapseCategories() {
    document.getElementById('categoriesMenu').innerHTML = "";
    categoriesText.removeEventListener("click", collapseCategories);
    categoriesText.addEventListener("click", expandCategories);
}

categoriesText.addEventListener("click", expandCategories);





$(function () {
    
});

