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
        this.categoryGrades = new Map;
        for (let cat of this.categories) { this.categoryGrades[cat] = new Map(); }
    }
    toHTMLString(sid) {
        let grade = this.overallGrades[sid], letterGrade = toLetter(grade, this.letterScale, letters);
        let head = '<div id="assignHead"><h2><u>My Grades</u></h2><div id="blank"></div>';
        head += '<div class="textLeft"><h3>Total:</h3></div><div class="textRight"><h3>' + grade + ': ' + letterGrade + '</h3></div></div>';
        let str = head + genAssignments(this, sid);
        return str;
    }

}

var math = new Course("math", 3, assignment_categories, letter_scale, category_weights);
math.categoryGrades = cat_temp;
math.overallGrades = overall_grades;

class Assignment {
    constructor(name = "", category = "", dueDate = "", points = 100) {
        this.name = name;
        this.dueDate = (dueDate == false) ? (new Date()).toDateString() : (new Date(dueDate)).toDateString();
        this.category = category;
        this.points = points;
        this.isPublished = false;
        this.submitDate = new Map();
        this.grade = new Map();
        for (let sid of student_ids) { 
            this.submitDate[sid] = (new Date()).toDateString();
            this.grade[sid] = undefined;
        }


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
        str += '<div class="textLeft">Due Date: ' + this.dueDate + '</div>';
        str += '<div class="textRight">Submitted: ' + this.submitDate[SID] + '</div>';
        return str;
    }

    // string form of an assignment for a student (comma separated)
    toString(SID) {
        let str = "";
        str += this.name +",";
        str += this.category + ",";
        str += (this.dueDate) + ",";
        str += this.points + ",";
        str += (this.submitDate[SID]) + ",";
        str += (this.grade[SID]) + ",";
        str += (this.grade[SID] / this.points) * 100 + "%\n";
        return str;
    }
}

// assignments in courses
ass = new Assignment("Homework 1", "Homework", "11/16/2022", 30); ass.isPublished = true;
ass.grade[sandra.SID] = 20; ass.submitDate[sandra.SID] = (new Date("11/14/2022")).toDateString();
math.assignments.push(ass);

ass = new Assignment("Quiz 1", "Quiz", "11/16/2022", 100); ass.isPublished = true;
ass.grade[sandra.SID] = 93.3; ass.submitDate[sandra.SID] = (new Date("11/14/2022")).toDateString();
math.assignments.push(ass);

ass = new Assignment("Term paper", "Writing Assignments", "11/23/2022", 200); ass.isPublished = true;
ass.grade[sandra.SID] = 140; ass.submitDate[sandra.SID] = (new Date("11/23/2022")).toDateString();
math.assignments.push(ass);

ass = new Assignment("Homework 2", "Homework", 100); ass.isPublished = false;
// submission dates/grades generated upon retrieval if false
math.assignments.push(ass);

ass = new Assignment("Homework 3", "Homework"); ass.isPublished = false;
math.assignments.push(ass);

ass = new Assignment("Homework 4", "Homework"); ass.isPublished = false;
math.assignments.push(ass);

ass = new Assignment("Homework 5", "Homework"); ass.isPublished = false;
math.assignments.push(ass);

ass = new Assignment("Homework 6", "Homework"); ass.isPublished = false;
math.assignments.push(ass);

ass = new Assignment("Homework 7", "Homework"); ass.isPublished = false;
math.assignments.push(ass);


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