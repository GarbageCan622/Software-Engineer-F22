
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

/*English Course*/ {
	var ELS = [90, 80, 70, 60];			//English letter scale
	if (localStorage.getItem('ELS') == null) {
		localStorage.setItem('ELS', JSON.stringify(ELS));	//In order to store more than just strings, JSON.stringify must be called on the object or data structure
	}														//Map objects don't seem to work with stringify

	var ECats_names = ['homework', 'paper', 'final paper'];	//Category names (Correspond to eachother, (homework, 20), (paper, 40)...
	var ECats_num = [20, 40, 40];							//Category weights
	if (localStorage.getItem('ECats_names') == null) {
		localStorage.setItem('ECats_names', JSON.stringify(ECats_names));
	}
	if (localStorage.getItem('ECats_num') == null) {
		localStorage.setItem('ECats_num', JSON.stringify(ECats_num));
	}
	
	var ESIDs = [1,2,3];		//English course student ID's
	if (localStorage.getItem('ESIDs') == null) {
		localStorage.setItem('ESIDs', JSON.stringify(ESIDs));
	}
	
	var EHW1 = [88, 90, 75, 88.88888, 100, 100, 83, 87, 70, 60];	//HW1 grades (corresponds to SIDs)
	if (localStorage.getItem('EHW1') == null) {
		localStorage.setItem('EHW1', JSON.stringify(EHW1));
	}
	
	var EHW2 = [85, 82.5, 100, 50, 73, 84, 63, 95, 92, 75];		//HW2
	if (localStorage.getItem('EHW2') == null) {
		localStorage.setItem('EHW2', JSON.stringify(EHW2));
	}
	
	var EP1 = [78, 81.5, 83.5, 95, 90, 88, 77.5, 90, 91, 89];		//Paper 1 grades
	if (localStorage.getItem('EP1') == null) {
		localStorage.setItem('EP1', JSON.stringify(EP1));
	}
	
	var EPF = [88, 87.5, 91, 95, 95, 85, 72, 74, 83, 89];		//Final paper grades
	if (localStorage.getItem('EPF') == null) {
		localStorage.setItem('EPF', JSON.stringify(EPF));
	}
}

/*Math Course*/ {
	var MLS = [90, 80, 70, 60];			//Letter scale
	if (localStorage.getItem('MLS') == null) {
		localStorage.setItem('MLS', JSON.stringify(MLS));	//In order to store more than just strings, JSON.stringify must be called on the object or data structure
	}														//Map objects don't seem to work with stringify

	var MCats_names = ['homework', 'paper', 'final paper'];	//Category names (Correspond to eachother, (homework, 20), (paper, 40)...
	var MCats_num = [15, 20, 30, 40];							//Category weights
	if (localStorage.getItem('MCats_names') == null) {
		localStorage.setItem('MCats_names', JSON.stringify(MCats_names));
	}
	if (localStorage.getItem('MCats_num') == null) {
		localStorage.setItem('MCats_num', JSON.stringify(MCats_num));
	}
	
	var MSIDs = [1,2,3, 4, 5, 6, 7, 8, 9, 10];		//course student ID's
	if (localStorage.getItem('MSIDs') == null) {
		localStorage.setItem('MSIDs', JSON.stringify(MSIDs));
	}
	
	var CW1 = [100,100,100,100,100,90,100,80,90,90];		//Classwork 1
	if (localStorage.getItem('CW1') == null) {
		localStorage.setItem('CW1', JSON.stringify(CW1));
	}
	
	var CW2 = ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'];	//Classwork 2
	if (localStorage.getItem('CW2') == null) {
		localStorage.setItem('CW2', JSON.stringify(CW2));
	}
	
	var MHW1 = [100, 95, 92, 85, 90, 92, 82, 75, 0, 60];		//Homework 1
	if (localStorage.getItem('MHW1') == null) {
		localStorage.setItem('MHW1', JSON.stringify(MHW1));
	}
	
	var MHW2 = [85, 88, 76, 90, 85, 85, 82, 73, 90, 79];		//Homework 2
	if (localStorage.getItem('MHW2') == null) {
		localStorage.setItem('MHW2', JSON.stringify(MHW2));
	}
	
	var MQ1 = [100,100,95,100,90,88,85,80,82,88];				//Quiz 1
	if (localStorage.getItem('MQ1') == null) {
		localStorage.setItem('MQ1', JSON.stringify(MQ1));
	}
	
	var ME1 = [75,95,90,100,92,84,87,88,80,79];				//Exam 1
	if (localStorage.getItem('ME1') == null) {
		localStorage.setItem('ME1', JSON.stringify(ME1));
	}	
}