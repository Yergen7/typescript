// import { log } from "node:console";

type FlightStatus = "scheduled" | "delayed" | "cancelled";

type AircraftModel =
  | "Boeing 737"
  | "Boeing 777"
  | "Airbus A320";

interface Flight {
  id: number;
  code: string;
  from: string;
  to: string;
  aircraft: AircraftModel;
  delayMin: number;
  status: FlightStatus;
  international: boolean;
}

const flights: Flight[] = [
  {
    id: 1,
    code: "KC 851",
    from: "NQZ",
    to: "ALA",
    aircraft: "Airbus A320",
    delayMin: 0,
    status: "scheduled",
    international: false
  },
  {
    id: 2,
    code: "KC 921",
    from: "ALA",
    to: "IST",
    aircraft: "Boeing 777",
    delayMin: 45,
    status: "delayed",
    international: true
  },
  {
    id: 3,
    code: "DV 703",
    from: "NQZ",
    to: "URA",
    aircraft: "Boeing 737",
    delayMin: 0,
    status: "cancelled",
    international: false
  }
];

function delayed(list: Flight[]): Flight[] {
  return list.filter((f) => f.status === "delayed");
}

function totalDelay(list: Flight[]): number {
  let sum = 0;

  for (const f of list) {
    sum = sum + f.delayMin;
  }

  return sum;
}

console.log(delayed(flights).map((f) => f.code));
console.log(totalDelay(flights));
console.log(flights.map((f) => f.aircraft));

// const xyz: string[] = ["apple", "banana", "chery"];

// // Прогноз: ["apple", "banana", "chery"]
// console.log(xyz);

// xyz.push("orange");

// // Прогноз: ["apple", "banana", "chery", "orange"]
// console.log(xyz);

// xyz.splice(2, 1, "kiwi", "peach");

// // Прогноз: ["apple", "banana", "kiwi", "peach", "orange"]
// console.log(xyz);

// // Прогноз: 5
// console.log(xyz.length);

// xyz.splice(0, xyz.length - 1);

// // Прогноз: ["orange"]
// console.log(xyz);

// xyz.push("alice", "bob");

// // Прогноз: ["orange", "alice", "bob"]
// console.log(xyz);

// const xyz: string[] = ["apple", "banana", "chery"];

// Прогноз: "apple"
// Метод shift() удаляет и возвращает первый элемент массива
// console.log(xyz.shift());

// Новая операция: reverse() переворачивает исходный массив
// xyz.reverse();

// Прогноз: ["chery", "banana"]
// console.log(xyz);

// Новая операция: includes() проверяет наличие элемента
// Прогноз: false, потому что "orange" нет в массиве
// console.log(xyz.includes("orange"));
// let abc: number = 3.14;

// // Прогноз: 3.14
// console.log(abc);

// let def: string = (15).toString();

// // Прогноз: 15 — строка выводится в консоли без кавычек
// console.log(def);

// let xyz: boolean = abc < 2;

// // Прогноз: false, потому что 3.14 не меньше 2
// console.log(xyz);

// Новая операция 1: toFixed(1) оставляет один знак после запятой
// Прогноз: 3.1
// const abc: number = 3.14;
// // Прогноз: 3.1 — результат имеет тип string
// console.log(abc.toFixed(1));

// // Новая операция 2: includes() проверяет наличие символов в строке
// const def: string = (15).toString();
// // Прогноз: true, потому что строка "15" содержит символ "5"
// console.log(def.includes("5"));

// // Новая операция 3: ! меняет логическое значение на противоположное
// const xyz: boolean = abc < 2;
// // Прогноз: true, потому что противоположное значение false — это true
// console.log(!xyz);

// const nums: number[] = [10, 9, 1, 2, 100];
// nums.sort();
// console.log(nums); // [ 1, 10, 100, 2, 9 ]
// nums.sort((a, b) => a - b);
// console.log(nums);

const international = flights.filter(function (f) {
  return f.international;
});

const routes = flights.map(function (f) {
  return `${f.from} → ${f.to}`;
});

const found = flights.find(function (f) {
  return f.code === "KC 921";
});

console.log("1");
console.log(international.map((f) => f.code));

console.log("2");
console.log(routes);

console.log("3");
console.log(found?.delayMin);