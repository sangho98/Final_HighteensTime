import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function Dinner(props) {
  const { dinnerlist } = props;

  console.log(dinnerlist.data.mealServiceDietInfo[1].row);
  return (
    <Table>
      <thead>
        <tr>
          <th>월</th>
          <th>화</th>
          <th>수</th>
          <th>목</th>
          <th>금</th>
          <th>토</th>
          <th>일</th>
        </tr>
      </thead>
      <tbody>
        <tr></tr>
      </tbody>
    </Table>
  );
}

export default Dinner;
