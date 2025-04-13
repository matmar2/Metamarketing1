import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Swap.module.css';

const Swap = () => {
  const [coin1, setCoin1] = useState('');
  const [coin2, setCoin2] = useState('');
  const [amount, setAmount] = useState('');
  const [coins, setCoins] = useState([]);

  // Fetch available coins list on startup
  useEffect(() => {
    axios.get('/api/coins')  // Replace with the actual API URL if needed
      .then(response => {
        setCoins(response.data);  // Assuming response.data is an array of coin objects
      })
      .catch(error => {
        console.error('Error fetching coins:', error);
      });
  }, []);

  // Detect and connect wallets (MetaMask, TronLink, Phantom) on startup
  useEffect(() => {
    const connectWallets = async () => {
      // MetaMask (Ethereum) integration
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log('MetaMask connected:', window.ethereum.selectedAddress);
        } catch (err) {
          console.error('MetaMask connection failed:', err);
        }
      } else {
        console.warn('MetaMask not detected. Please install MetaMask.');
      }

      // TronLink (Tron) integration
      if (window.tronLink) {
        try {
          const result = await window.tronLink.request({ method: 'tron_requestAccounts' });
          // TronLink returns an object with a code property (200 = success)
          if (result && result.code === 200) {
            if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
              console.log('TronLink connected:', window.tronWeb.defaultAddress.base58);
            }
          } else {
            console.error('TronLink connection was not authorized by the user.');
          }
        } catch (err) {
          console.error('TronLink connection failed:', err);
        }
      } else {
        console.warn('TronLink not detected. Please install TronLink.');
      }

      // Solana (Phantom wallet) integration
      if (window.solana && window.solana.isPhantom) {
        try {
          const resp = await window.solana.connect();
          console.log('Phantom wallet connected:', resp.publicKey.toString());
        } catch (err) {
          console.error('Phantom wallet connection failed:', err);
        }
      } else {
        console.warn('Solana wallet not detected. Please install Phantom for Solana.');
      }
    };

    // Only run wallet connection on client (browser) side
    if (typeof window !== 'undefined') {
      connectWallets();
    }
  }, []);

  // Swap button handler – validate inputs and perform the swap
  const handleSwap = async () => {
    // 1. Validate that both coins are selected
    if (!coin1 || !coin2) {
      alert('Please select both Coin 1 and Coin 2 before swapping.');
      return;
    }
    // 2. Validate amount is entered and positive
    if (!amount) {
      alert('Please enter an amount to swap.');
      return;
    }
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      alert('Please enter a valid positive amount.');
      return;
    }
    // 3. Prevent swapping the same coin to itself
    if (coin1 === coin2) {
      alert('Please select two different coins to swap.');
      return;
    }

    // 4. Perform the swap via API call
    try {
      const response = await axios.post('/api/swap', {
        from: coin1,
        to: coin2,
        amount: amt
      });
      console.log('Swap successful:', response.data);
      alert(`Successfully swapped ${amt} ${coin1} to ${coin2}!`);
      // TODO: update any state or UI with the result if needed
    } catch (error) {
      console.error('Swap failed:', error);
      alert('Swap failed. Please try again or check the console for details.');
    }
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
