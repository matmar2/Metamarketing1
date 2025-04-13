import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Swap.module.css';

const Swap = () => {
  const [coin1, setCoin1] = useState('');
  const [coin2, setCoin2] = useState('');
  const [amount, setAmount] = useState('');
  const [coins, setCoins] = useState([]);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);

  useEffect(() => {
    // Check for MetaMask, TronLink, and Solana Wallet on startup
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          setConnectedWallet(accounts[0]);
        })
        .catch(err => console.error('MetaMask not connected:', err));
    }
    if (window.tronWeb) {
      setConnectedWallet(window.tronWeb.defaultAddress.base58);
    }
    if (window.solana) {
      window.solana.connect()
        .then(response => setConnectedWallet(response.publicKey.toString()))
        .catch(err => console.error('Solana wallet not connected:', err));
    }
    // Fetch available coins
    axios.get('/api/coins') // Replace with actual API for your coins
      .then(response => setCoins(response.data))
      .catch(error => console.error('Error fetching coins:', error));
  }, []);

  const handleSwap = () => {
    // Implement the swap functionality here
    console.log(`Swapping ${amount} of ${coin1} to ${coin2}`);
  };

  return (
    <div className={styles.swapContainer}>
      <h2>Coin Swap</h2>
      <p>Connected Wallet: {connectedWallet ? connectedWallet : 'Not Connected'}</p>
      <div className={styles.inputContainer}>
        <label htmlFor="coin1">Select Coin 1</label>
        <select
          id="coin1"
          value={coin1}
          onChange={(e) => setCoin1(e.target.value)}
        >
          <option value="">Select Coin</option>
          {coins.map((coin) => (
            <option key={coin.symbol} value={coin.symbol}>
              {coin.name} ({coin.symbol})
            </option>
          ))}
        </select>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="coin2">Select Coin 2</label>
        <select
          id="coin2"
          value={coin2}
          onChange={(e) => setCoin2(e.target.value)}
        >
          <option value="">Select Coin</option>
          {coins.map((coin) => (
            <option key={coin.symbol} value={coin.symbol}>
              {coin.name} ({coin.symbol})
            </option>
          ))}
        </select>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button className={styles.button} onClick={handleSwap}>
        Swap
      </button>
    </div>
  );
};

export default Swap;
