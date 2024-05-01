import { log } from "console";

const prices: (number | string)[] = [1,2,3,4,2,1, 'as'];

prices.push(1);
prices.push('1');

let user: [string, number, boolean];
// user = ['luis', 13];
// user = ['12',5];


user = ['angel',12 , true];
const [username, age] = user;
console.log(username);
console.log(age);
