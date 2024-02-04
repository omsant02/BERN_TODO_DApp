import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";

const ViewTask = () => {
  const [task, setTask] = useState([]);

  const viewTask = async (event) => {
    try {
      event.preventDefault();
      const taskID = document.querySelector("#taskID").value;
      const res = await fetch(
        `http://localhost:3000/api/ethereum/view-task/${taskID}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await res.json;
      if (data.status === 200) {
        setTask(data.taskObj);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navigation />
      <form onSubmit={viewTask}>
        <label>
          ID:
          <input id="taskId" />
        </label>
        <button type="submit">View Task</button>
      </form>
    </>
  );
};

export default ViewTask;
