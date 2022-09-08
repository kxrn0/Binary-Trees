const create_tree = require("./main");

function create_random_array(nums, start, end) {
    if (nums > end - start)
        throw new Error("error! more numbers requested than what is in the given range!");

    const numbers = [];

    while (numbers.length < nums) {
        const number = start + ~~(Math.random() * (end - start));

        if (!numbers.some(n => n === number))
            numbers.push(number);
    }
    return numbers;
}

const data = create_random_array(20, 0, 100);
const tree = create_tree(data);
let values;

tree.print_tree();

console.log(tree.is_balanced());

values = [];
tree.preorder(node => values.push(node.data));
console.log(values.join(','));

values = [];
tree.postorder(node => values.push(node.data));
console.log(values.join(','));

values = [];
tree.inorder(node => values.push(node.data));
console.log(values.join(','));

for (let i = 1; i < 6; i++)
    tree.insert(i * 100);

tree.print_tree();

console.log(tree.is_balanced());

tree.rebalance();

tree.print_tree();

console.log(tree.is_balanced());

values = [];
tree.preorder(node => values.push(node.data));
console.log(values.join(','));

values = [];
tree.postorder(node => values.push(node.data));
console.log(values.join(','));

values = [];
tree.inorder(node => values.push(node.data));
console.log(values.join(','));
