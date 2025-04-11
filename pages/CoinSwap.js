
import { useState, useEffect } from 'react';
import useSWR from 'swr';  // For data fetching

const CoinSwap = () => {
    const [sourceCoin, setSourceCoin] = useState('TRX');
    const [destinationCoin, setDestinationCoin] = useState('USDT');
    const [amount, setAmount] = useState(0);
    const [convertedAmount, setConvertedAmount] = useState(0);

    // Fetch the exchange rate for the selected coins
    const { data, error } = useSWR(`https://api.coingecko.com/api/v3/simple/price?ids=${sourceCoin},${destinationCoin}&vs_currencies=usd`, {
        refreshInterval: 5000,
    });

    useEffect(() => {
        if (data && amount) {
            const rate = data[sourceCoin]?.usd / data[destinationCoin]?.usd;
            setConvertedAmount(rate * amount);
        }
    }, [sourceCoin, destinationCoin, amount, data]);

    const handleSwap = () => {
        // Add logic for swapping coins using a smart contract or API
        console.log(`Swapping ${amount} ${sourceCoin} for ${convertedAmount} ${destinationCoin}`);
    };

    return (
        <div>
            <h1>Swap Coins</h1>
            <div>
                <label>Source Coin</label>
                <select onChange={(e) => setSourceCoin(e.target.value)} value={sourceCoin}>
                    <option value="TRX">TRX</option>
                    <option value="USDT">USDT</option>
                    <option value="BTC">BTC</option>
                    {/* Add more coins */}
                </select>
            </div>

            <div>
                <label>Destination Coin</label>
                <select onChange={(e) => setDestinationCoin(e.target.value)} value={destinationCoin}>
                    <option value="TRX">TRX</option>
                    <option value="USDT">USDT</option>
                    <option value="BTC">BTC</option>
                    {/* Add more coins */}
                </select>
            </div>

            <div>
                <label>Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                />
            </div>

            <div>
                <p>Converted Amount: {convertedAmount} {destinationCoin}</p>
            </div>

            <button onClick={handleSwap}>Swap Coins</button>
        </div>
    );
};

export default CoinSwap;
