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

//this is the begining of the menu on the right


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
    $('#hw1Grades').on('scroll', function () {
        $('#studentNamesHw1').scrollTop($(this).scrollTop());
    });
    $('#q1Grades').on('scroll', function () {
        $('#studentNamesQ1').scrollTop($(this).scrollTop());
    });
});

