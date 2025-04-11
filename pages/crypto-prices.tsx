import useSWR from "swr";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Spinner,
  Center,
} from "@chakra-ui/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

export default function CryptoPrices() {
  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds.join(",")}&vs_currencies=usd`,
    fetcher,
    { refreshInterval: 60000 }
  );

  if (error)
    return (
      <Center mt={10}>
        <Text>Error loading prices.</Text>
      </Center>
    );
  if (!data)
    return (
      <Center mt={10}>
        <Spinner />
      </Center>
    );

  return (
    <Box p={8}>
      <Heading mb={6}>Crypto Prices</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {coinIds.map((id) => (
          <Box key={id} borderWidth="1px" borderRadius="lg" p={4}>
            <Text fontWeight="bold" textTransform="capitalize">
              {id}
            </Text>
            <Text>${data[id]?.usd.toLocaleString() || "0.00"}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
