class BankAccount {
	constructor(initialBalance) {
		this.balance = initialBalance;
	}
	get currentBalance() { 
		return this.balance;
	}	
	withdraw(amount) {
		if (amount <= 0) { throw "Amount must be positive!"; }
		if (amount <= this.balance) {
			this.balance -= amount;
			return true;
		}
		return false;
	}
	deposit(amount) {
		if (amount <= 0) { throw "Amount must be positive!"; }
		this.balance += amount;
	}
}


var checking = new BankAccount(2000);
console.log(checking);

console.log(checking.withdraw(1000));
console.log(checking);

console.log(checking.withdraw(1000));
console.log(checking);

console.log(checking.withdraw(1000));
console.log(checking);