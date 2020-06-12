const path = require("path");
const fs = require("fs");
const templatesDir = path.resolve(__dirname, "../templates");

const managerTemplate = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
const engineerTemplate = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
const internTemplate = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
const mainTemplate = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");

function replacePlaceholders(template, placeholder, value) {
	const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
	return template.replace(pattern, value);
}

function renderTemplate(template, data) {
	for (let key in data) {
		template = replacePlaceholders(template, key, data[key]);	
	}
	return template;
}

function render(employees) {
	const html = [];
	
	html.push(employees
		.filter(employee => employee.getRole() === "Manager")
		.map(manager => renderTemplate(managerTemplate, manager))
	);
	html.push(employees
		.filter(employee => employee.getRole() === "Engineer")
		.map(engineer => renderTemplate(engineerTemplate, engineer))
	);
	html.push(employees
		.filter(employee => employee.getRole() === "Intern")
		.map(intern => renderTemplate(internTemplate, intern))
	);
	return renderTemplate(mainTemplate, { team: html.join("") });
};


module.exports = render;
