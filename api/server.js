const express = require("express");
const cors = require("cors");
const ABI = require("./ABI.json");
const { Web3 } = require("web3");

const app = express();

require("dotenv").config();
app.use(cors());
app.use(express.json());

const MUMBAI_URL = process.env.MUMBAI_URL;

const web3 = new Web3(MUMBAI_URL);

const contractAddress = "0xc6d1f49da2f2890ae108efc0a030ec771f3e6231";
const contract = new web3.eth.Contract(ABI, contractAddress);

// const viewTask = async () => {
//   const task = await contract.methods.viewTask(2).call();
//   console.log(task);
// };
// viewTask();

const dateclashCheck = async (taskDate) => {
  const tasks = await contract.methods.allTask().call();
  const foundTask = tasks.find((task) => task.date === taskDate);

  if (foundTask) {
    return foundTask.name;
  }
  return "No Task Found";
};

app.post("/api/ethereum/create-task", async (req, res) => {
  //   await contract.methods
  //     .createTask("blockchain", "7/23/12")
  //     .send({ from: "0x7061b591CA8A5cfb7197cF091e63273CC5F050aa" });
  const { taskDate } = req.body;
  const task = await dateclashCheck(taskDate);
  try {
    if (task !== "No Task Found") {
      res
        .status(409)
        .json({ status: 409, message: "Date clash:Task cannot be added" });
    } else {
      res.status(200).json({ status: 200, message: "Task can be added" });
    }
  } catch (error) {
    console.error(error);
  }
});

app.post("/api/ethereum/update-task", async (req, res) => {
  const { taskDate } = req.body;
  const task = await dateclashCheck(taskDate);
  try {
    if (task !== "No Task Found") {
      res
        .status(409)
        .json({ status: 409, message: "Date clash:Task cannot be updated" });
    } else {
      res.status(200).json({ status: 200, message: "Task can be updated" });
    }
  } catch (error) {
    console.error(error);
  }
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
    const tasks = await contract.methods.allTask().call();
    if (tasks.length < 0) {
      res
        .status(404)
        .json({ status: 404, message: "Task list does not exist" });
    } else {
      const taskList = tasks.map(({ id, name, date }) => {
        const taskId = Number(id);
        return { taskId, name, date };
      });
      res.status(200).json({ status: 200, taskList, message: "Task Exist" });
    }
  } catch (error) {
    console.error(error);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Running At PORT ${PORT}`);
});
