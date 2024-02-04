import React from "react";
import Navigation from "./Navigation";

const UpdateTask = ({ state }) => {
  const { contract, account } = state;
  const updateTask = async (event) => {
    event.preventDefault();
    const taskName = document.querySelector("#taskName").value;
    const taskDate = document.querySelector("#taskDate").value;
    const taskID = document.querySelector("#taskID").value;

    try {
      const res = await fetch(
        "http://localhost:3000/api/ethereum/update-task",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ taskDate: taskDate }),
        }
      );
      const data = await res.json();

      if (data.status === 200) {
        if (contract && contract.methods) {
          await contract.methods
            .updateTask(taskID, taskName, taskDate)
            .send({ from: account });
        }
      } else {
        throw new Error("Task cannot be updated because of date clash");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Navigation />
      <form onSubmit={updateTask}>
        <label>
          ID:
          <input id="taskID" />
        </label>
        <label>
          Name:
          <input id="taskName" />
        </label>
        <label>
          Date:
          <input id="taskDate" />
        </label>
        <button type="submit">Update Task</button>
      </form>
    </>
  );
};

export default UpdateTask;
