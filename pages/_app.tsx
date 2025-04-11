
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import initWallets from "../utils/walletInit";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initWallets();
  }, []);

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
