
import {
  Box,
  Heading,
  Select,
  NumberInput,
  NumberInputField,
  Button,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const coinIds = [
  "bitcoin",
  "ethereum",
  "solana",
  "tron",
  "tether",
  "binancecoin",
  "polygon",
  "dogecoin",
  "cardano",
  "litecoin",
];

export default function Swap() {
  const [prices, setPrices] = useState<any>({});
  const [fromCoin, setFromCoin] = useState("bitcoin");
  const [toCoin, setToCoin] = useState("ethereum");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState("");

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds.join(
        ","
      )}&vs_currencies=usd`
    )
      .then((res) => res.json())
      .then((data) => setPrices(data));
  }, []);

  const handleSwap = () => {
    if (!prices[fromCoin] || !prices[toCoin]) return;
    const fromPrice = prices[fromCoin].usd;
    const toPrice = prices[toCoin].usd;
    const toAmount = ((fromPrice / toPrice) * amount).toFixed(6);
    setResult(`${amount} ${fromCoin} ≈ ${toAmount} ${toCoin}`);
  };

  return (
    <Box p={8}>
      <Heading mb={6}>Simulated Coin Swap</Heading>
      <VStack spacing={4} align="stretch">
        <HStack>
          <Select value={fromCoin} onChange={(e) => setFromCoin(e.target.value)}>
            {coinIds.map((coin) => (
              <option key={coin} value={coin}>
                {coin}
              </option>
            ))}
          </Select>
          <NumberInput value={amount} onChange={(v) => setAmount(Number(v))}>
            <NumberInputField />
          </NumberInput>
        </HStack>
        <Select value={toCoin} onChange={(e) => setToCoin(e.target.value)}>
          {coinIds.map((coin) => (
            <option key={coin} value={coin}>
              {coin}
            </option>
          ))}
        </Select>
        <Button colorScheme="blue" onClick={handleSwap}>
          Swap
        </Button>
        {result && <Text mt={4}>{result}</Text>}
      </VStack>
    </Box>
  );
}
