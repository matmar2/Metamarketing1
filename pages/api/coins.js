export default function handler(req, res) {
  if (req.method === 'GET') {
    // Return a list of coins (replace this with real data or database logic)
    const coins = [
      { name: 'Bitcoin', symbol: 'BTC' },
      { name: 'Ethereum', symbol: 'ETH' },
      { name: 'Litecoin', symbol: 'LTC' },
    ];

    res.status(200).json(coins);  // Sending coins as JSON response
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });  // Handle invalid methods
  }
}
