const obj1 = {
    name: "Maryam",
    address: { city: "Addis" }
};

const obj2 = { ...obj1 };

obj2.name = "Adama";

console.log(obj1.name); // ❗ "Adama"
const arr1 = [1, 2, 3];
const arr2 = [...arr1];

arr2.push(4);

console.log(arr1); // [1, 2, 3]
console.log(arr2); // [1, 2, 3, 4]