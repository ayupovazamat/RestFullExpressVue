class User {
  readonly id: number;
  name: string;
  age: number;

  constructor(userId: number, userName: string, userAge: number) {
    this.id = userId;
    this.name = userName;
    this.age = userAge;
  }

  print(): void {
    console.log(`id: ${this.id}  name: ${this.name}  age: ${this.age}`);
  }
}

class Manager extends User {
  company: string;

  constructor(id: number, name: string, age: number, company: string) {
    super(id, name, age);
    this.company = company;
  }

  work(): void {
    console.log(`${this.name} работает в компании ${this.company}`);
  }

  print(): void {
    super.print()
    console.log(`Работает в компании ${this.company}`);
  }
}

const user: Manager = new Manager(1, 'Азамат', 31, 'Chang')

user.print();
user.work();
user.company = 'Chang'

console.log(user.toString());

