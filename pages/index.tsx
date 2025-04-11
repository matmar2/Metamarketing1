import { Button, VStack, Box, Heading } from '@chakra-ui/react';
import Link from 'next/link';

const Home = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="#C7F9F3" // Set the light teal background color
    >
      <VStack
        spacing={6}
        align="center"
        maxW="lg"
        p={10}
        boxShadow="lg"
        borderRadius="xl"
        bg="white"
      >
        {/* Heading */}
        <Heading
          as="h2"
          size="3xl"
          textAlign="center"
          fontWeight="bold"
          color="teal.800"
        >
          Welcome to MetaMarketing
        </Heading>

        {/* First Button for Crypto Prices */}
        <Link href="/crypto-prices" passHref>
          <Button
            size="lg"
            colorScheme="teal"
            variant="solid"
            width="full"
            boxShadow="md"
            fontSize="lg"
            borderRadius="xl" // Rounded corners
            _hover={{
              backgroundColor: 'teal.600', // Darken on hover
            }}
            _active={{
              backgroundColor: 'teal.700', // Darker color on active
            }}
          >
            View Crypto Prices
          </Button>
        </Link>

        {/* Second Button for Coin Swap */}
        <Link href="/swap" passHref>
          <Button
            size="lg"
            colorScheme="teal"
            variant="outline" // Outline style
            width="full"
            boxShadow="md"
            fontSize="lg"
            borderRadius="xl" // Rounded corners
            borderColor="teal.600"
            _hover={{
              backgroundColor: 'teal.50', // Light background on hover
            }}
            _active={{
              backgroundColor: 'teal.100', // Light background on active
            }}
          >
            Go to Coin Swap
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default Home;
