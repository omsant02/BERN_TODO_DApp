import React, { useState, useEffect } from "react";
import Web3 from "web3";

const Wallet = () => {
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(web3, accounts);
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
