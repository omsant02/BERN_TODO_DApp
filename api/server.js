// 0xc6d1f49da2f2890ae108efc0a030ec771f3e6231;

const express = require("express");
const ABI = require("./ABI.json");
const { Web3 } = require("web3");

const app = express();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Running At PORT ${PORT}`);
});
