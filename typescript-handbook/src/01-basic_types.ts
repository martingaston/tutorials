// boolean
let isDone: boolean = false;

// number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b10101;
let octal: number = 0o744;

// string

let colour: string = "blue";
colour = "orange";

let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}.

I'll be ${age + 1} years old next month.`;

// array

let list: number[] = [1, 2, 3];
let listGeneric: Array<number> = [4, 5, 6];

// tuple

let x: [string, number];
x = ["hello", 10];

// enum

enum Colour {
  Red = 1,
  Green = 2,
  Blue = 4
}

let c: Colour = Colour.Green; // 2
let colourName = Colour[4]; // Blue

// any

let notSure: any = 4;
notSure = "maybe a string instead";

// void

function warnUser(): void {
  console.log("This is a warning message");
}

// null and undefined

/* by default null and undefined are subtypes of all other types
 * but with --strictNullChecks are only assignable to void and their own types
 */

let u: undefined = undefined;
let n: null = null;

// never

function error(message: string): never {
  throw new Error(message);
}

// object

declare function create(o: object | null): void;

create({ prop: 0 });
create(null);

// type assertions

let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length; // doesn't work with JSX
let strLength2: number = (someValue as string).length; // works with JSX
