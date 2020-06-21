const mysql = require("mysql2/promise");
const Employee = require("./lib/Employee");
const Department = require("./lib/Department");
const Role = require("./lib/Role");
const inquirer = require("inquirer");
const { right } = require("inquirer/lib/utils/readline");

// little in-memory-database
// stores a snapshot of the SQL database
const departments = {};
const employees = {};
const roles = {};

function leftPad(str, width, char) {
	char = char || " ";
	while (str.length < width) {
		str = char + str;
	}
	return str;
}

function rightPad(str, width, char) {
	char = char || " ";
	while (str.length < width) {
		str = str + char;
	}
	return str;
}

const testHeaders = [ "id", "first_name", "last_name", "title", "department", "salary", "manager"]
const testTable = [
	[ "1", "John", "Doe", "Sales Lead", "Sales", 100000, "Ashley Rodriguez" ],
	[ "12", "John", "Doe", "Sales Lead", "Sales", 100000, "Ashley Rodriguez" ],
	[ "123", "John", "Doe", "Sales Lead", "Sales", 100000, "Ashley Rodriguez" ],
]

function printTable(headers, table, spacing, divider) {
	spacing = spacing || 2;
	divider = divider || '-';
	
	const spacer = leftPad("", spacing, " ");
	const columnWidths = [];
	// First, we need to measure how long each column needs to be.
	for (let i = 0; i < headers.length; i++) {
		columnWidths[i] = headers[i].length;
	}
	// .map version oneliner:
	// const columnWidths = headers.map(it => it.length);
	
	// A lot easier to use for loops to do this part,
	// since it is 2 dimensional.
	// Measuring all the strings within columns, finding the largest string
	// in each column
	
	for (let i = 0; i < table.length; i++) {
		for (let k = 0; k < table[i].length; k++) {
			columnWidths[k] = Math.max(columnWidths[k], (""+table[i][k]).length);
		}	
	}
	
	let line1 = "";
	let line2 = "";
	for (let i = 0; i < headers.length; i++) {
		line1 += rightPad(headers[i], columnWidths[i], " ") + spacer;
		line2 += rightPad("", columnWidths[i], "-") + spacer;
	}
	console.log(line1);
	console.log(line2);
	
	for (let i = 0; i < table.length; i++) {
		let line = "";
		for (let k = 0; k < table[i].length; k++) {
			line += rightPad(""+table[i][k], columnWidths[k], " ") + spacer;
		}
		console.log(line);
	}
	
} 

function formatEmployeeData() {
	const result = [];
	
	for (let key in employees) {
		const emp = employees[key];
		const role = roles[emp.role_id];
		const dpt = departments[role.department_id];
		const manager = employees[emp.manager_id];
		const managerName = manager ? manager.fullName() : "null";
		
		const row = [ emp.id, emp.first_name, emp.last_name, 
			role.title, dpt.name, role.salary, managerName ];
		
		result[result.length] = row;
	}
	
	
	return result;
}

const choiceFunctions = {
	"View All Employees": function() {
		printTable(testHeaders, formatEmployeeData() );
	}
};


async function main() {
	const connection = await mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'D3MvMQlwLS6GLG9dUeg3',
		database: 'employee_db',
	});
	
	// This `connection.execute` function returns an array
	// This is specifically referred to as "destructuring"
	// const employeeReturnValue = await connection.execute("SELECT * FROM employee;");
	// const employeeData = employeeReturnValue[0];
	const [employeeData] = await connection.execute("SELECT * FROM employee;");
	const [departmentData] = await connection.execute("SELECT * FROM department;");
	const [roleData] = await connection.execute("SELECT * FROM role;");
	
	employeeData.map( (it) => {
		const employee = Employee.from(it);
		employees[employee.id] = employee;
	});
	
	departmentData.map( (it) => {
		const department = Department.from(it);
		departments[department.id] = department;
	});
	
	roleData.map( (it) => {
		const role = Role.from(it);
		roles[role.id] = role;
	});
	
	
	
	// console.log(employees);
	// console.log(departments);
	// console.log(roles);
	
	while (true) {
		let data = await inquirer.prompt([
			{
				type: "list",
				message: "What would you like to do?",
				name: "choice",
				choices: [
					"View All Employees",
					"View All Employees By Department",
					"View All Employees By Manager",
					"Add Employee",
					"Remove Employee",
					"Update Employee Role",
					"Update Employee Manager",
					"View All Roles",
					"Add Role",
					"Remove Role",
					"View All Departments",
					"Add Department",
					"Remove Department",
					"Quit",
				]
			}
		]);
		
		if (data.choice === "Quit") {
			console.log("Okay, goodbye");
			break;
		}
		
		const func = choiceFunctions[data.choice];
		if (func) { func(); }
		else { console.log("\n\nNOT YET IMPLEMENTED\n\n"); }
		
		
	}
	
}

main();