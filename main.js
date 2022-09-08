function create_node(data) {
    return {data, left: null, right: null};
}

function create_tree(data) {
    let root;

    data = Array(...new Set(data));
    data.sort((a, b) => a - b);

    root = build_tree(data);

    function build_tree(data) {
        if (!data.length)
            return null;

        const mid = ~~(data.length / 2);
        const root = create_node(data[mid]);

        root.left = build_tree(data.slice(0, mid))
        root.right = build_tree(data.slice(mid + 1));
        return root;
    }

    function _print(node, prefix = '', isLeft = true) {
        if (node.right !== null) {
            _print(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            _print(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

   function print_tree() {
       _print(root);
   }

    function _find_value(node, value) {
        if (node === null || node.data === value)
            return node;

        if (node.data < value)
            return _find_value(node.right, value);
        else
            return _find_value(node.left, value);
    }

    function find(value) {
        return _find_value(root, value);
    }

    function _insert_value(node, value) {
        if (find(value)) {
            console.log("values in a tree must be unique!");
            return;
        }

        if (node === null)
            return create_node(value);

        if (value > node.data)
            node.right = _insert_value(node.right, value);
        else if (value < node.data)
            node.left = _insert_value(node.left, value);
        return node;
    }

    function insert(value) {
        _insert_value(root, value);
    }

    function minimum_value(root) {
        let minimum;

        minimum = root.data;
        while (root.left !== null) {
            minimum = root.left.data;
            root = root.left;
        }
        return minimum;
    }

    function _delete(root, key) {
        if (root === null)
            return null;

        if (key < root.data)
            root.left = _delete(root.left, key);
        else if (key > root.data)
            root.right = _delete(root.right, key);
        else {
            if (root.left === null)
                return root.right;
            else if (root.right === null)
                return root.left;

            root.data = minimum_value(root.right);
            root.right = _delete(root.right, root.data);
        }
        return root;
    }

    function delete_key(key) {
        _delete(root, key);
    }

    function _level_order_traversal(node, callback) {
        if (node === null)
            return;

        const queue = [];

        queue.push(node);
        while (queue.length) {
            const current = queue[0];

            queue.shift();
            callback(current);
            if (current.left !== null)
                queue.push(current.left);
            if (current.right !== null)
                queue.push(current.right);
        }
    }
    
    function level_order(callback) {
        _level_order_traversal(root, callback);
    }

    function _preorder_traversal(node, callback) {
        if (node === null)
            return null;
        callback(node);
        _preorder_traversal(node.left, callback);
        _preorder_traversal(node.right, callback);
    }

    function preorder(callback) {
        _preorder_traversal(root, callback);
    }

    function _inorder_traversal(node, callback) {
        if (node === null) 
            return null;

        _inorder_traversal(node.left, callback);
        callback(node);
        _inorder_traversal(node.right, callback);
    }

    function inorder(callback) {
        _inorder_traversal(root, callback);
    }

    function _postorder_traversal(node, callback) {
        if (node === null)
            return null

        _postorder_traversal(node.left, callback);
        _postorder_traversal(node.right, callback);
        callback(node);
    }

    function postorder(callback) {
        _postorder_traversal(root, callback);
    }

    function height(node) {
        if (node === null)
            return -1;

        const leftHeight = height(node.left);
        const rightHeight = height(node.right);

        if (leftHeight > rightHeight)
            return leftHeight + 1;
        else
            return rightHeight + 1;      
    }

    function _node_depth(node, currentData) {
        if (node === null)
            return -1;

        let dist;

        dist = -1;
        if (node.data === currentData)
            return dist + 1;

        const leftDist = _node_depth(node.left, currentData);
        const rightDist = _node_depth(node.right, currentData);

        if (leftDist >= 0)
            return leftDist + 1;
        else if (rightDist >= 0)
            return rightDist + 1;
        return dist
    }

    function depth(node) {
        return _node_depth(root, node.data);
    }

    function _is_tree_balanced(node) {
        if (node === null)
            return true;

        const leftHeight = height(node.left);
        const rightHeight = height(node.right);

        if (Math.abs(leftHeight - rightHeight) <= 1 &&
            _is_tree_balanced(node.left) &&
            _is_tree_balanced(node.right))
            return true;
        return false;
    }

    function is_balanced() {
        return _is_tree_balanced(root);
    }

    function rebalance() {
        const data = [];

        inorder(node => data.push(node.data));
        root = build_tree(data);
    }
    
    return {root, print_tree, find, insert, delete_key, level_order, inorder, postorder, preorder, height, depth, is_balanced, rebalance};
}

module.exports = create_tree;
