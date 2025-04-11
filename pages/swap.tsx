import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Swap.module.css';

const Swap = () => {
  const [coin1, setCoin1] = useState('');
  const [coin2, setCoin2] = useState('');
  const [amount, setAmount] = useState('');
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    // Fetch available coins from your API or local data
    axios.get('/api/coins')  // Replace with the actual API URL
      .then(response => {
        setCoins(response.data); // Assuming response.data contains a list of coins
      })
      .catch(error => {
        console.error('Error fetching coins:', error);
      });
  }, []);

  const handleSwap = () => {
    // Implement the swap functionality here
    console.log(`Swapping ${amount} of ${coin1} to ${coin2}`);
  };

  return (
    <div className={styles.swapContainer}>
      <h2 className={styles.swapHeader}>Coin Swap</h2>
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
