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

const inputA = [
    { name: "Alex", tel: "0991112222", code: "xsf0001" },
    { name: "Jane", tel: "0812221234", code: "xsf0002" },
    { name: "Alex", tel: "0832214433", code: "xsf0001" },
    { name: "Alex", tel: "0991113122", code: "xsf0003" }
];

console.log("Question A - Input:");
console.log(inputA);
console.log("\nQuestion A - Output:");
console.log(convertTelFormat(inputA));
