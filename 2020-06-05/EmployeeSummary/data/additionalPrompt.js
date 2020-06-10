// Like selections for individual makes/models
const github = {
	type:"input",
	name:"github",
	message:"What is the employee's github username?",
};

module.exports = {
	Engineer: [
		github,
		{
			type:"input",
			name:"language",
			message:"What is the engineer's primary programming language?",
		},
	],
	Intern: [
		{
			type:"input",
			name:"school",
			message:"What is the employee's sponsor school?",
		},
		github,
	],
	Manager: [
		{
			type:"input",
			name:"officeNumber",
			message:"What is the employee's office?",
		},
	],
}