import React, { useState, useEffect } from "react";
import Web3 from "web3";
import ABI from "./ABI.json";

const Wallet = () => {
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const contractAddress = "0xc6d1f49da2f2890ae108efc0a030ec771f3e6231";
        const contract = new web3.eth.Contract(ABI, contractAddress);
        console.log(contract);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={connectWallet}>Connect wallet</button>
    </>
  );
};

export default Wallet;
