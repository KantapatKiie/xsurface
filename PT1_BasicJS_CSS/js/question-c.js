function filterAndSortByAge(input) {
    return input
        .filter(person => parseInt(person.age) < 30)
        .sort((a, b) => parseInt(a.age) - parseInt(b.age))
        .map(person => person.name);
}

const inputC = [
    { name: "A", age: "30" },
    { name: "B", age: "9" },
    { name: "C", age: "20" },
    { name: "D", age: "18" },
    { name: "E", age: "11" },
    { name: "F", age: "60" },
    { name: "G", age: "27" },
    { name: "H", age: "90" },
    { name: "I", age: "21" },
    { name: "J", age: "12" }
];

console.log("Question C - Input:");
console.log(inputC);
console.log("\nQuestion C - Output:");
console.log(filterAndSortByAge(inputC));
