const config = {
	db: {
		host: "localhost",
		port: 27017,
		name: "employeeDirectory"
	},
	populate: {
		employees: {
			firstName: "nameFirst",
			lastName: "nameLast",
			address: "bundleAddress",
			phoneNumber: "phoneMobile",
			email: "internetEmail",
			department: "companyDepartment",
			
			
			_repeat: 100
		},
	}
}

module.exports = config;
