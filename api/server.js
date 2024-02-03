const express = require("express");
const ABI = require("./ABI.json");
const { Web3 } = require("web3");

const app = express();
require("dotenv").config();

const MUMBAI_URL = process.env.MUMBAI_URL;

const web3 = new Web3(MUMBAI_URL);

const contractAddress = "0xc6d1f49da2f2890ae108efc0a030ec771f3e6231";
const contract = new web3.eth.Contract(ABI, contractAddress);

// const viewTask = async () => {
//   const task = await contract.methods.viewTask(2).call();
//   console.log(task);
// };
// viewTask();

app.post("/api/ethereum/create-task", async (req, res) => {
  //   await contract.methods
  //     .createTask("blockchain", "7/23/12")
  //     .send({ from: "0x7061b591CA8A5cfb7197cF091e63273CC5F050aa" });
});

app.get("/api/ethereum/view-task/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await contract.methods.viewTask(taskId).call;
    const { id, name, date } = task;
    const numId = Number(id);
    const taskObj = {
      numId,
      name,
      date,
    };
    res.status(200).json({ status: 200, taskObj, message: "Task Exist" });
  } catch (error) {
    res.status(404).json({ status: 500, message: "Task does not exist" });
  }
});

app.get("/api/ethereum/view-all-task", async (req, res) => {
  try {
    const tasks = await contract.methods.allTask().call;
    if (tasks.length < 0) {
      res
        .status(400)
        .json({ status: 404, message: "Task list does not exist" });
    } else {
      const taskList = tasks.map(({ id, name, date }) => {
        const taskId = Number(id);
        return { taskId, name, date };
      });
      res.status(200).json({ status: 200, taskList, message: "Task Exist" });
    }
  } catch (error) {}
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Running At PORT ${PORT}`);
});
