import Link from "next/link";
import { Box, Heading, Button } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box textAlign="center" mt={20}>
      <Heading mb={8}>Welcome to MetaMarketing</Heading>

      <Link href="/crypto-prices">
        <Button colorScheme="teal" size="lg">
          View Crypto Prices
        </Button>
      </Link>
    </Box>
  );
}
