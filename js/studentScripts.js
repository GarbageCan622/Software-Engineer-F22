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

//weight menu
let weightText = document.getElementById('weightText');
let weightDiv = document.getElementById('weightMenu');

function expandWeight() {
    weightDiv.innerHTML += 'Homework: 35%<br/>Quizes: 25%<br/>Writing Assignments: 40%';
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

