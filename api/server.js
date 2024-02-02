const express = require("express");
const ABI = require("./ABI.json");
const { Web3 } = require("web3");

const app = express();
require("dotenv").config();

const MUMBAI_URL = process.env.MUMBAI_URL;

const web3 = new Web3(MUMBAI_URL);

const contractAddress = "0xc6d1f49da2f2890ae108efc0a030ec771f3e6231";
const contract = new web3.eth.Contract(ABI, contractAddress);
console.log(contract);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Running At PORT ${PORT}`);
});
