function convertContactFormat(input) {
    const { contact, customer, address } = input;

    return contact.map(contactItem => ({
        name: contactItem.name,
        customer: customer,
        address: address
    }));
}

const inputB = {
    customer: "Xsurface",
    contact: [
        { name: "Max" },
        { name: "Mike" },
        { name: "Adam" }
    ],
    address: "Sukhumvit 62"
};

console.log("Question B - Input:");
console.log(inputB);
console.log("\nQuestion B - Output:");
console.log(convertContactFormat(inputB));
