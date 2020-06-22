const mysql = require("mysql2/promise");
const Employee = require("./lib/Employee");
const Department = require("./lib/Department");
const Role = require("./lib/Role");
const inquirer = require("inquirer");
const { right } = require("inquirer/lib/utils/readline");
const { connect } = require("mysql2");

// little in-memory-database
// stores a snapshot of the SQL database
const departments = {};
const employees = {};
const roles = {};
// Connection to sql server
let connection = null;

async function refreshDatabase() {
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
}


// "duckpunching" - similar to the concept of "ducktyping"
// "ducktyping" - if something looks like a duck, walks like a duck, and quacks like a duck, it's a duck.
// "duckpunching" - if something doesn't look like a duck, doesn't walk like a duck, and doesn't quack like a duck, 
//					and you want it to be a duck, punch it until it becomes a duck.
String.prototype.compareTo = function(other) {
	return (this == other) ? 0 : ((this < other) ? -1 : 1); 
}

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

const employeeTableHeaders = [ "id", "first_name", "last_name", "title", "department", "salary", "manager"]
const departmentTableHeaders = [ "id", "name" ];
const roleTableHeaders = [ "id", "title", "salary", "department" ];

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
	
	for (let id in employees) {
		const emp = employees[id];
		const role = roles[emp.role_id];
		const dpt = departments[role.department_id];
		const manager = employees[emp.manager_id];
		const managerName = manager ? manager.fullName() : "null";
		// 				0			1			2
		const row = [ emp.id, emp.first_name, emp.last_name, 
		//	3			4			5			6
			role.title, dpt.name, role.salary, managerName ];
		
		// result.push(row) is slow for some reason...
		result[result.length] = row;
	}
	
	return result;
}

function formatDepartmentData() {
	const result = [];
	
	for (let id in departments) {
		const dep = departments[id];
		
		const row = [ dep.id, dep.name ];
		
		// result.push(row) is slow for some reason...
		result[result.length] = row;
		
	}
	
	return result;
}

function formatRoleData() {
	const result = [];
	
	for (let id in roles) {
		const role = roles[id];
		const dep = departments[role.department_id];
		
		const row = [ role.id, role.title, role.salary, dep.name ]
		
		// result.push(row) is slow for some reason...
		result[result.length] = row;
			
	}
	
	return result;
}

const choiceFunctions = {
	"Refresh Local Data": async function() {
		await refreshDatabase();	
	}, 
	"View All Employees": async function() {
		printTable(employeeTableHeaders, formatEmployeeData() );
		
	},
	"View All Employees By Department": async function() {
		const table = formatEmployeeData();
		table.sort( (a,b) => { return a[4].compareTo(b[4]); } );
		printTable(employeeTableHeaders, table);
	},
	"View All Employees By Manager": async function() {
		const table = formatEmployeeData();
		table.sort( (a,b) => { return a[6].compareTo(b[6]); } );
		printTable(employeeTableHeaders, table);
	},
	"View All Roles": async function() {
		printTable(roleTableHeaders, formatRoleData() );
	},
	"View All Departments": async function() {
		printTable(departmentTableHeaders, formatDepartmentData() );
	},
	"Add Department": async function() {
		let data = await inquirer.prompt([
			{
				type:"input",
				message: "What will the department name be?",
				name: "name"
			}
		]);
		const query = "INSERT INTO `department` (`name`) VALUES (?)";
		const params = [ data.name ];
		try {
			let [result] = await connection.execute(query, params);
			let id = result.insertId;
			data.id = id;
			let dep = Department.from(data);
			departments[id] = dep;
			
			console.log("Success!");
			console.log(result);
			
		} catch (err) {
			console.log("SQL error occurred:");
			console.log(err);
		}
	}
		
};


async function main() {
	connection = await mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'D3MvMQlwLS6GLG9dUeg3',
		database: 'employee_db',
	});
	
	await refreshDatabase();
	
	while (true) {
		let data = await inquirer.prompt([
			{
				type: "list",
				message: "What would you like to do?",
				name: "choice",
				choices: [
					"Refresh Local Data",
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
		if (func) { await func(); }
		else { console.log("\n\nNOT YET IMPLEMENTED\n\n"); }
		
		
	}
	
}

main();