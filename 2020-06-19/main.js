const mysql = require("mysql2/promise");
const Employee = require("./lib/Employee");
const Department = require("./lib/Department");
const Role = require("./lib/Role");
const inquirer = require("inquirer");

// little in-memory-database
// stores a snapshot of the SQL database
const departments = {};
const departmentsByName = {};
const employees = {};
const employeesByName = {};
const employeesCountByName = {};
const roles = {};
const rolesByTitle = {};
// Connection to sql server
let connection = null;

function clear() {
	for (let i in arguments) {
		let obj = arguments[i];
		for (let key in obj) { delete obj[key]; }
	}
}

async function refreshDatabase() {
	// This `connection.execute` function returns an array
	// This is specifically referred to as "destructuring"
	// const employeeReturnValue = await connection.execute("SELECT * FROM employee;");
	// const employeeData = employeeReturnValue[0];
	const [employeeData] = await connection.execute("SELECT * FROM employee;");
	const [departmentData] = await connection.execute("SELECT * FROM department;");
	const [roleData] = await connection.execute("SELECT * FROM role;");
	
	clear(departments, departmentsByName, 
		employees, employeesByName, employeesCountByName,
		roles, rolesByTitle);
	
	employeeData.map( (it) => {
		const employee = Employee.from(it);
		employees[employee.id] = employee;
		
		// Let our program be able to tell the difference between 
		// two people with the same name 
		const fullName = employee.fullName();
		let displayName = fullName;
		if (employeesCountByName[fullName]) {
			employeesCountByName[fullName] += 1;
			displayName += ` (${employeesCountByName[fullName]})`;
		} else {
			employeesCountByName[fullName] = 1;
		}
		
		employee.displayName = displayName;
		employeesByName[displayName] = employee.id;
	});
	
	departmentData.map( (it) => {
		const department = Department.from(it);
		departments[department.id] = department;
		departmentsByName[department.name] = department.id;
	});
	
	roleData.map( (it) => {
		const role = Role.from(it);
		roles[role.id] = role;
		rolesByTitle[role.title] = role.id;
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
		const managerName = manager ? manager.displayName : "null";
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
		
		if (departmentsByName[data.name]) {
			console.log("Sorry, a department already exists with that name.");
			return;	
		}
		
		const query = "INSERT INTO `department` (`name`) VALUES (?)";
		const params = [ data.name ];
		try {
			let [result] = await connection.execute(query, params);
			let id = result.insertId;
			data.id = id;
			let dep = Department.from(data);
			departments[id] = dep;
			departmentsByName[dep.name] = id;
			
			console.log("Success!");
			console.log(result);
			
		} catch (err) {
			console.log("SQL error occurred:");
			console.log(err);
		}
	},
	"Add Role": async function() {
		
		let data = await inquirer.prompt([
			{
				type:"input",
				message: "What will the role's title be?",
				name: "title"
			}, 
			{
				type:"number",
				message: "What is the role's annual salary?",
				name:"salary",	
			},
			{
				type:"list",
				message: "What department is the role associated with?",
				name:"department",
				choices: Object.keys(departmentsByName)
			}
		]);
		// Reverse lookup ID of department associated with this new role
		data.department_id = departmentsByName[data.department];
		
		// We want to have an actual number for salary.
		if (isNaN(data.salary) || data.salary < 0) {
			console.log("Sorry, salary must be a positive number.");
			return;
		}
		
		if (rolesByTitle[data.title]) {
			console.log("Sorry, that title is already taken.");
			return;
		}
		
		const query = "INSERT INTO `role` (`title`, `salary`, `department_id`) VALUES (?, ?, ?)";
		const params = [ data.title, data.salary, data.department_id ];
		try {
			let [result] = await connection.execute(query, params);
			let id = result.insertId;
			data.id = id;
			let role = Role.from(data);
			roles[id] = role;
			rolesByTitle[role.title] = id;
			
			console.log("Success!");
			console.log(result);
			
		} catch (err) {
			console.log("SQL error occurred:");
			console.log(err);
		}
				
	},
	"Add Employee": async function() {
		const NO_MANAGER = "--- ---Nobody--- ---";
		
		let data = await inquirer.prompt([
			{
				type:"input",
				message: "What is the employee's first name?",
				name: "first_name"
			},
			{
				type:"input",
				message: "What is the employee's last name?",
				name: "last_name"
			},
			{
				type:"list",
				message:"What is this employee's role?",
				name: "role",
				choices: Object.keys(rolesByTitle)
			},
			{
				type:"list",
				message:"Who is this employee's manager?",
				name: "manager",
				choices: [ NO_MANAGER, ...Object.keys(employeesByName) ] 	
			}
		]);
		data.role_id = rolesByTitle[data.role];
		data.manager_id = (data.manager === NO_MANAGER) ? null : employeesByName[data.manager];
		
		const query = "INSERT INTO `employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES (?, ?, ?, ?)";
		const params = [ data.first_name, data.last_name, data.role_id, data.manager_id ];
		
		try {
			let [result] = await connection.execute(query, params);
			let id = result.insertId;
			data.id = id;
			
			let employee = Employee.from(data);
			employees[id] = employee;
			
			const fullName = employee.fullName();
			let displayName = fullName;
			if (employeesCountByName[fullName]) {
				employeesCountByName[fullName] += 1;
				displayName += ` (${employeesCountByName[fullName]})`;
			} else {
				employeesCountByName[fullName] = 1;
			}
			
			employee.displayName = displayName;
			employeesByName[displayName] = employee.id;
			
			
			console.log("Success!");
			console.log(result);
			
		} catch (err) {
			console.log("SQL error occurred:");
			console.log(err);
		}
		
	},
	"Remove Employee": async function() {
		const NO_REMOVAL = "--- --- Cancel Removal --- ---"
		let data = await inquirer.prompt([
			{
				type:"list",
				message:"Which employee do you want to remove/delete?",
				name: "removal",
				choices: [ NO_REMOVAL, ...Object.keys(employeesByName) ] 	
			}
		]);
		
		const id = employeesByName[data.removal];
		if (!id) {
			// No employee selected, cancel removal.
			console.log("Cancelling removal.");
			return;
		}
		
		const query = "DELETE FROM `employee` WHERE `id`=?";
		const params = [ id ];
		
		try {
			let [result] = await connection.execute(query, params);
			
			console.log("Success!");
			console.log(result);
			await refreshDatabase();
		
		} catch (err) {
			console.log("SQL error occurred:");
			console.log(err);
			
			console.log("You are probably trying to delete an employee that is current a manager.");
			console.log("Before deleting them, make sure they are not the manager of other employees.");
		}
	},
	"Remove Role": async function() {
		const NO_REMOVAL = "--- --- Cancel Removal --- ---"
		let data = await inquirer.prompt([
			{
				type:"list",
				message:"Which role do you want to remove/delete?",
				name: "removal",
				choices: [ NO_REMOVAL, ...Object.keys(rolesByTitle) ] 	
			}
		]);
		
		const id = rolesByTitle[data.removal];
		if (!id) {
			// No employee selected, cancel removal.
			console.log("Cancelling removal.");
			return;
		}
		
		const query = "DELETE FROM `role` WHERE `id`=?";
		const params = [ id ];
		
		try {
			let [result] = await connection.execute(query, params);
			
			console.log("Success!");
			console.log(result);
			await refreshDatabase();
		
		} catch (err) {
			console.log("SQL error occurred:");
			console.log(err);
			
			console.log("You are probably trying to delete a role that is currently in use.");
			console.log("Before deleting them, make sure they are not the role of employees.");
		}
	},
	"Remove Department": async function() {
		const NO_REMOVAL = "--- --- Cancel Removal --- ---"
		let data = await inquirer.prompt([
			{
				type:"list",
				message:"Which department do you want to remove/delete?",
				name: "removal",
				choices: [ NO_REMOVAL, ...Object.keys(departmentsByName) ] 	
			}
		]);
		
		const id = departmentsByName[data.removal];
		if (!id) {
			// No employee selected, cancel removal.
			console.log("Cancelling removal.");
			return;
		}
		
		const query = "DELETE FROM `department` WHERE `id`=?";
		const params = [ id ];
		
		try {
			let [result] = await connection.execute(query, params);
			
			console.log("Success!");
			console.log(result);
			await refreshDatabase();
		
		} catch (err) {
			console.log("SQL error occurred:");
			console.log(err);
			
			console.log("You are probably trying to delete a department that is currently in use.");
			console.log("Before deleting them, make sure they are not the department of any roles.");
		}
	},
	"Update Employee Role": async function() {
		const NO_UPDATE = "--- --- Cancel Update --- ---"
		let data = await inquirer.prompt([
			{
				type:"list",
				message:"Which employee do you want to update?",
				name: "employee",
				choices: [ NO_UPDATE, ...Object.keys(employeesByName) ] 	
			},
			{
				type:"list",
				message:"Which role do you want to reassign them to?",
				name: "role",
				choices: [ NO_UPDATE, ...Object.keys(rolesByTitle) ] 	
			}
		]);
		const empID = employeesByName[data.employee];
		const roleID = rolesByTitle[data.role];
		if (!roleID || !empID) {
			// No employee or no role selected, cancel removal.
			console.log("Cancelling removal.");
			return;
		}
		
		const query = "UPDATE `employee` SET `role_id`=? WHERE `id`=?";
		const params = [ roleID, empID ];
		
		try {
			let [result] = await connection.execute(query, params);
			
			console.log("Success!");
			console.log(result);
			
			employees[empID].role_id = roleID;
			
		} catch (err) {
			console.log("SQL error occurred:");
			console.log(err);
		}
	}, "Update Employee Manager": async function() {
		const NO_UPDATE = "--- --- Cancel Update --- ---"
		const NO_MANAGER = "--- null ---";
		let data = await inquirer.prompt([
			{
				type:"list",
				message:"Which employee do you want to update?",
				name: "employee",
				choices: [ NO_UPDATE, ...Object.keys(employeesByName) ] 	
			},
			{
				type:"list",
				message:"What manager is that employee working under?",
				name: "manager",
				choices: [ NO_UPDATE, NO_MANAGER, ...Object.keys(employeesByName) ] 	
			}
		]);
		const empID = employeesByName[data.employee];
		const managerID = employeesByName[data.manager] || ((data.manager === NO_MANAGER) ? null : undefined);
		console.log(managerID);
		if ((data.manager === NO_UPDATE) || !empID) {
			// No employee or no role selected, cancel removal.
			console.log("Cancelling removal.");
			return;
		}
		
		if (managerID === empID) {
			console.log("Employees may not be their own manager!");
			return;
		}
		
		const query = "UPDATE `employee` SET `manager_id`=? WHERE `id`=?";
		const params = [ managerID, empID ];
		
		try {
			let [result] = await connection.execute(query, params);
			
			console.log("Success!");
			console.log(result);
			
			employees[empID].manager_id = managerID === "null" ? -1 : managerID;
			
		} catch (err) {
			console.log("SQL error occurred:");
			console.log(err);
		}
	},
	
	
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