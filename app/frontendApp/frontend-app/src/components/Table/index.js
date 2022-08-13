import React from "react";
import { MdTableRows } from "react-icons/md";

export default function Table({ rowsData }) {
  console.log(rowsData);
  return (
    <table>
      <thead>
        <tr>
          <th> Date </th>
          <th> Open </th>
          <th> High </th>
          <th> Low </th>
          <th> Close </th>
          <th> Volume </th>
          <th> Status </th>
        </tr>
      </thead>

      <tbody>
        {rowsData?.map(function (row) {
          return (
            <tr>
             
              <td>{row.date}</td>
              <td>{row.open}</td>
              <td>{row.high}</td>
              <td>{row.low}</td>
              <td>{row.close}</td>
              <td>{row.volume}</td>
              <td>{row.status}</td>
            </tr>
          );
        })}
      </tbody>

      <tfoot></tfoot>
    </table>
  );
}
