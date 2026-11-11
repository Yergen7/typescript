function add(a: number, b: number): number {
  return a + b;
}
function greet(name: string, city?: string): string {
  return city ? `Привет, ${name} из города ${city}!` : `Привет, ${name}!`;
}

// Было (ошибки типов):
// add(2, "3");                  // "3" — строка, а нужно число
// greet();                      // не передан обязательный name
// const total: string = add(1, 2); // add возвращает number, а не string

// Стало (исправлено):
console.log(add(2, 3)); // 5
console.log(greet("Айгерим")); // Привет, Айгерим!
const total: number = add(1, 2);
console.log(total); // 3
