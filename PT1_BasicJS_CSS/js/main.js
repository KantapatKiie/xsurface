function convertTelFormat(input) {
    const result = [];
    const codeMap = new Map();

    input.forEach(item => {
        if (codeMap.has(item.code)) {
            const existing = codeMap.get(item.code);
            if (Array.isArray(existing.tel)) {
                existing.tel.push(item.tel);
            } else {
                existing.tel = [existing.tel, item.tel];
            }
        } else {
            codeMap.set(item.code, { ...item });
        }
    });

    codeMap.forEach(value => result.push(value));
    return result;
}

function convertContactFormat(input) {
    const { contact, customer, address } = input;

    return contact.map(contactItem => ({
        name: contactItem.name,
        customer: customer,
        address: address
    }));
}

function filterAndSortByAge(input) {
    return input
        .filter(person => parseInt(person.age) < 30)
        .sort((a, b) => parseInt(a.age) - parseInt(b.age))
        .map(person => person.name);
}

function displayBulletList(input) {
    const names = filterAndSortByAge(input);
    return names.map(name => `This is ${name}, It correctly outputs from question C.`);
}

const inputA = [
    { name: "Alex", tel: "0991112222", code: "xsf0001" },
    { name: "Jane", tel: "0812221234", code: "xsf0002" },
    { name: "Alex", tel: "0832214433", code: "xsf0001" },
    { name: "Alex", tel: "0991113122", code: "xsf0003" }
];

const inputB = {
    customer: "Xsurface",
    contact: [
        { name: "Max" },
        { name: "Mike" },
        { name: "Adam" }
    ],
    address: "Sukhumvit 62"
};

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

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('inputA').textContent = JSON.stringify(inputA, null, 2);
    document.getElementById('outputA').textContent = JSON.stringify(convertTelFormat(inputA), null, 2);

    document.getElementById('inputB').textContent = JSON.stringify(inputB, null, 2);
    document.getElementById('outputB').textContent = JSON.stringify(convertContactFormat(inputB), null, 2);

    document.getElementById('inputC').textContent = JSON.stringify(inputC, null, 2);
    document.getElementById('outputC').textContent = JSON.stringify(filterAndSortByAge(inputC), null, 2);

    document.getElementById('inputD').textContent = JSON.stringify(inputC, null, 2);
    const bulletListItems = displayBulletList(inputC);
    const bulletListElement = document.getElementById('outputD');
    bulletListItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        bulletListElement.appendChild(li);
    });
});
