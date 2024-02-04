import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import ABI from "./ABI.json";
import { useNavigate } from "react-router-dom";

const Wallet = ({ saveState }) => {
  const navigateTo = useNavigate();
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const contractAddress = "0xc6d1f49da2f2890ae108efc0a030ec771f3e6231";
        const contract = new web3.eth.Contract(ABI, contractAddress);

        saveState({ web3: web3, contract: contract, account: accounts[0] });
        navigateTo("/view-all-tasks");
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

Wallet.propTypes = {
  saveState: PropTypes.func.isRequired,
};

export default Wallet;
