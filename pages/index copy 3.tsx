import React, { useState } from "react";
import { Box, Heading, Button, VStack } from "@chakra-ui/react";
import Link from "next/link";

// Wallet check functionality
const WalletCheckButton = () => {
  const [walletStatus, setWalletStatus] = useState<string>("");

  // Check MetaMask
  const checkMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        console.log('MetaMask account:', accounts[0]);
        return accounts[0];
      } catch (error) {
        console.error("Error with MetaMask:", error);
        return null;
      }
    } else {
      console.log("MetaMask not available");
      return null;
    }
  };

  // Check TronLink
  const checkTronLink = async () => {
    if (window.tronLink) {
      try {
        const address = await window.tronLink.request({
          method: 'tron_requestAccounts',
        });
        console.log('TronLink address:', address[0]);
        return address[0];
      } catch (error) {
        console.error("Error with TronLink:", error);
        return null;
      }
    } else {
      console.log("TronLink not available");
      return null;
    }
  };

  // Check Solana Wallet
  const checkSolanaWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        console.log('Solana Wallet connected:', response.publicKey.toString());
        return response.publicKey.toString();
      } catch (error) {
        console.error("Error with Solana Wallet:", error);
        return null;
      }
    } else {
      console.log("Solana Wallet not available");
      return null;
    }
  };

  // Combined Check for all Wallets
  const checkAllWallets = async () => {
    try {
      const metaMaskAccount = await checkMetaMask();
      const tronLinkAccount = await checkTronLink();
      const solanaAccount = await checkSolanaWallet();

      // Update UI based on which wallets are connected
      let status = "Wallets connected:\n";
      if (metaMaskAccount) status += `MetaMask: ${metaMaskAccount}\n`;
      if (tronLinkAccount) status += `TronLink: ${tronLinkAccount}\n`;
      if (solanaAccount) status += `Solana Wallet: ${solanaAccount}\n`;

      if (!metaMaskAccount && !tronLinkAccount && !solanaAccount) {
        status = "No wallet connected!";
      }

      setWalletStatus(status);
    } catch (error) {
      setWalletStatus("An error occurred while checking wallets.");
      console.error("Error checking wallets:", error);
    }
  };

  return (
    <div>
      {/* Button to check wallet connections */}
      <Button onClick={checkAllWallets} colorScheme="teal" size="lg" mb={4}>
        Check Wallets Connection
      </Button>

      {/* Display the wallet status */}
      <p>{walletStatus}</p>
    </div>
  );
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Button clicked!");
    }, 2000); // Simulate a 2-second submission delay
  };

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

        {/* Submit Button */}
        <Button
          colorScheme="blue"
          size="lg"
          mt={6}
          onClick={handleClick}
          isLoading={isLoading}
          loadingText="Submitting"
        >
          Submit
        </Button>

        {/* Add the WalletCheckButton here */}
        <WalletCheckButton />
      </VStack>
    </Box>
  );
};

export default Home;
