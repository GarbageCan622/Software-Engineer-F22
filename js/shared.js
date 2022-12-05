
if (localStorage.getItem('EHomework1') == null) { //this null check allows us to set the value of the localStorage originally on page load, after page load it wont be null anymore so when you go to index.html again none of the ifs will fire. important for keeping the value the same when going in between tabs
    localStorage.setItem('EHomework1', '20');
}
if (localStorage.getItem('EQuiz1') == null) {
    localStorage.setItem('EQuiz1', '-');
}
if (localStorage.getItem('MHomework1') == null) {
    localStorage.setItem('MHomework1', '20');
}
if (localStorage.getItem('MQuiz1') == null) {
    localStorage.setItem('MQuiz1', '-');
}


