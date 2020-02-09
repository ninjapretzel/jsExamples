function BankAccount(initialBalance) {
	let balance = initialBalance;
	
	this.currentBalance = function() { 
		return balance;
	}
	this.withdraw = function(amount) {
		if (amount <= 0) { throw "Amount must be positive!"; }
		if (amount <= balance) {
			balance -= amount;
			return true;
		}
		return false;
	}
	this.deposit = function(amount) {
		if (amount <= 0) { throw "Amount must be positive!"; }
		balance += amount;
	}
}

var checking = new BankAccount(2000);
console.log(checking.currentBalance());
console.log(checking.withdraw(1000));
console.log(checking.currentBalance());

console.log(checking.withdraw(1000));
console.log(checking.currentBalance());

console.log(checking.withdraw(1000));
console.log(checking.currentBalance());
