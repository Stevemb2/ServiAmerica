import React, { useState } from "react";
import TreeUtility from "./TreeUtility";

const treeUtility = TreeUtility();

const Tree = () => {
   // State variables

   const [value, setValue] = useState("");
   const [traversalType, setTraversalType] = useState("depth-first-in-order");
   const [treeArray, setTreeArray] = useState([]);
   const [message, setMessage] = useState("");
   const [isError, setIsError] = useState(false);

   const add = () => {
      treeUtility.add(value);

      setValue("");

      setMessage(`Successfully added value: ${value}`);
   };

   const traverse = () => {
      const treeArray = treeUtility.traverse(traversalType);

      setTreeArray(treeArray);

      setMessage(`Successfully traversed tree`);
   };

   const remove = () => {
      treeUtility.remove();

      setValue("");

      setTreeArray([]);

      setMessage(`Successfully removed tree`);
   };

   const clear = () => {
      setValue("");
      setTreeArray([]);
      setIsError(false);
      setMessage("");
   };

   const elementString = (element, index, maxIndex) => {
      if (index === maxIndex) {
         return element;
      } else {
         return element + ", ";
      }
   };

   return (
      <div>
         <h3>Binary Search Tree</h3>
         <p>Add data to a binary search tree and traverse the tree.</p>
         <br />
         <table>
            <tbody>
               <tr>
                  <td>
                     <span>Value to Insert: </span>
                  </td>
                  <td>
                     <input
                        className="entry-value"
                        type="text"
                        size="40"
                        onChange={event => {
                           setValue(event.target.value);
                        }}
                        value={value}
                     />
                  </td>
               </tr>
               <tr>
                  <td>
                     <span>Traversal Type: </span>
                  </td>
                  <td>
                     <select
                        value={traversalType}
                        onChange={event => {
                           setTraversalType(event.target.value);
                        }}
                     >
                        <option value="depth-first-pre-order">
                           Depth First Pre Order
                        </option>
                        <option value="depth-first-in-order">
                           Depth First In Order
                        </option>
                        <option value="depth-first-post-order">
                           Depth First Post Order
                        </option>
                        <option value="breadth-first">Breadth First</option>
                     </select>
                  </td>
               </tr>
            </tbody>
         </table>
         <br />
         <table>
            <tbody>
               <tr>
                  <td>
                     <button
                        className="success"
                        type="button"
                        onClick={() => {
                           add();
                        }}
                     >
                        Add
                     </button>
                  </td>
                  <td>
                     <button
                        className="primary"
                        type="button"
                        onClick={() => {
                           traverse();
                        }}
                     >
                        Traverse
                     </button>
                  </td>
                  <td>
                     <button
                        className="danger"
                        type="button"
                        onClick={() => {
                           remove();
                        }}
                     >
                        Remove
                     </button>
                  </td>
                  <td>
                     <button
                        className="info"
                        type="button"
                        onClick={() => {
                           clear();
                        }}
                     >
                        Clear
                     </button>
                  </td>
               </tr>
            </tbody>
         </table>
         <br />
         <div>
            <table>
               <tbody>
                  <tr>
                     <td>
                        <span>Tree Array: </span>
                     </td>
                     <td>
                        {treeArray.map((element, index) => (
                           <span key={index}>
                              {elementString(
                                 element,
                                 index,
                                 treeArray.length - 1
                              )}
                           </span>
                        ))}
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div>
            <span style={{ color: isError ? "red" : "green" }}>{message}</span>
         </div>
      </div>
   );
};

export default Tree;
