using System;
using System.Threading;

class Program {
		
	static void Main(string[] args) {
		Vector3 vec = new Vector3();
		vec.x = 5;
		vec.y = 10;
		vec.z = 20;

		Person p = new Person("Bob", 25, new Address());

	}
}

class Vector3 {
	public float x;
	public float y;
	public float z;
	public Vector3() {
		x = y = z = 0;
	}
	public Vector3(float x, float y, float z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

}


class BankAccount {
	private int balance;
	public BankAccount(int initialBalance) {
		balance = initialBalance;
	}
	public int GetCurrentBalance() {
		return balance;
	}
	public bool Withdraw(int amount) {
		if (amount <= 0) { throw new Exception(); }
		if (amount <= balance) {
			balance -= amount;
			return true;
		}
		return false;
	}
	public void Deposit(int amount) {
		if (amount <= 0) { throw new Exception(); }
		balance += amount;
	}
}

class Person {
	public string name;
	public int age;
	public Address address;
	public Person(string name, int age, Address address) {
		this.name = name;
		this.age = age;
		this.address = address;
	}
}

class Address {
	public string streetName;
	public string zip;
	public string city;
	public string country;
}