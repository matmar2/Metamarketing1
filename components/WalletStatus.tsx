
import { Box, Text } from "@chakra-ui/react";

type Props = {
  ethAddress?: string;
  tronAddress?: string;
  solAddress?: string;
};

export default function WalletStatus({ ethAddress, tronAddress, solAddress }: Props) {
  return (
    <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
      <Text fontWeight="bold">Connected Wallets:</Text>
      <Text>Ethereum: {ethAddress || "Not connected"}</Text>
      <Text>Tron: {tronAddress || "Not connected"}</Text>
      <Text>Solana: {solAddress || "Not connected"}</Text>
    </Box>
  );
}
