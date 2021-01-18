const TreeUtility = () => {
   let root;

   let treeArray = [];

   const add = value => {
      value = +value;

      let current;

      let node = {
         value: value,
         left: undefined,
         right: undefined
      };

      if (root === undefined) {
         root = node;
      } else {
         current = root;

         while (true) {
            if (current.value > value) {
               // Go left
               if (current.left) {
                  current = current.left;
               } else {
                  current.left = {
                     value: value,
                     left: undefined,
                     right: undefined
                  };

                  break;
               }
            } else {
               // Go right
               if (current.right) {
                  current = current.right;
               } else {
                  current.right = {
                     value: value,
                     left: undefined,
                     right: undefined
                  };

                  break;
               }
            }
         }
      }
   };

   const preOrder = node => {
      if (node !== undefined) {
         treeArray.push(node.value);

         inOrder(node.left);
         inOrder(node.right);
      }
   };

   const inOrder = node => {
      if (node !== undefined) {
         inOrder(node.left);

         treeArray.push(node.value);

         inOrder(node.right);
      }
   };

   const postOrder = node => {
      if (node !== undefined) {
         inOrder(node.left);
         inOrder(node.right);

         treeArray.push(node.value);
      }
   };

   const breadthFirst = (queue, array) => {
      if (!queue || !queue.length) {
         return;
      }

      const node = queue.shift();

      array.push(node.value);

      if (node.left) {
         queue.push(node.left);
      }

      if (node.right) {
         queue.push(node.right);
      }

      breadthFirst(queue, array);
   };

   const traverse = traversalType => {
      treeArray = [];

      switch (traversalType) {
         case "depth-first-pre-order":
            preOrder(root);

            break;
         case "depth-first-post-order":
            postOrder(root);

            break;
         case "breadth-first":
            const queue = [root];
            const array = [];

            breadthFirst(queue, array);

            treeArray = array;

            break;
         default:
            inOrder(root);

            break;
      }

      return treeArray;
   };

   const remove = () => {
      root = undefined;
      treeArray = [];
   };

   return Object.freeze({
      add,
      traverse,
      remove
   });
};

export default TreeUtility;
