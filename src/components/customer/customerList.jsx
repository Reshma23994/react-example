import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function CustomerList() {
   const customers = useSelector(state => state.contactReducer.customerDetails)
   console.log("customer:", customers)
   function renderTableData() {
      return customers.map((values, index) => {
         return values.map((obj, key) => {
            const { id, user_name, email, comment } = obj //destructuring
            console.log(`id`, id)
            return (
               <tr>
                  <td>{user_name}</td>
                  <td>{email}</td>
                  <td>{comment}</td>
                  <td>
                     <form>
                        <input type="submit" value="Edit" />
                     </form>
                     <form>
                        <input type="submit" value="Delete" />
                     </form>
                  </td>
               </tr>
            )

         })

      })
   }
   return (
      <div>
         <table>
            <tr>
               <th>Name</th>
               <th>Email</th>
               <th>Comments</th>
               <th>Operations</th>
            </tr>
            <tbody>
               {renderTableData()}
            </tbody>
         </table>
      </div>
   );

}
export default CustomerList;