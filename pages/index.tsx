import Link from "next/link";
import { Box, Heading, Button, VStack, Container } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container maxW="xl" mt={20} centerContent>
      <Box textAlign="center" mb={10}>
        <Heading fontSize="5xl" fontWeight="bold" color="teal.500">
          Welcome to MetaMarketing
        </Heading>
      </Box>

      <VStack spacing={8} width="full">
        <Link href="/crypto-prices">
          <Button
            colorScheme="teal"
            size="lg"
            width="300px"
            borderRadius="full"
            boxShadow="md"
            _hover={{
              bg: "teal.600",
              transform: "scale(1.05)",
            }}
            fontSize="lg"
            padding="12px 24px"
          >
            View Crypto Prices
          </Button>
        </Link>

        <Link href="/swap">
          <Button
            colorScheme="blue"
            size="lg"
            width="300px"
            borderRadius="full"
            boxShadow="md"
            _hover={{
              bg: "blue.600",
              transform: "scale(1.05)",
            }}
            fontSize="lg"
            padding="12px 24px"
          >
            Go to Coin Swap
          </Button>
        </Link>
      </VStack>
    </Container>
  );
}
