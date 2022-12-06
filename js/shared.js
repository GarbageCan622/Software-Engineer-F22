
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
	
	var EHW1 = [88.5, 90, 75.5];	//HW1 grades (corresponds to SIDs)
	var EHW2 = [85, 82.5, 100];		//HW2
	if (localStorage.getItem('EHW1') == null) {
		localStorage.setItem('EHW1', JSON.stringify(EHW1));
	}
	if (localStorage.getItem('EHW2') == null) {
		localStorage.setItem('EHW2', JSON.stringify(EHW2));
	}
	
	var EP1 = [78, 81.5, 83.5];		//Paper 1 grades
	if (localStorage.getItem('EP1') == null) {
		localStorage.setItem('EP1', JSON.stringify(EP1));
	}
	
	var EPF = [88, 87.5, 91];		//Final paper grades
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
	
	var MSIDs = [1,2,3];		//course student ID's
	if (localStorage.getItem('MSIDs') == null) {
		localStorage.setItem('MSIDs', JSON.stringify(MSIDs));
	}
	
	var MHW1 = [100, 95, 92];		//HW1 grades (corresponds to SIDs)
	var MHW2 = [85, 88, 76];		//HW2
	if (localStorage.getItem('MHW1') == null) {
		localStorage.setItem('MHW1', JSON.stringify(MHW1));
	}
	if (localStorage.getItem('MHW2') == null) {
		localStorage.setItem('MHW2', JSON.stringify(MHW2));
	}
}