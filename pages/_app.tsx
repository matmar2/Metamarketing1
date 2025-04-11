import '../styles/globals.css';  // Make sure this import is already there
import '../styles/Swap.module.css'; // Import Swap styles here

import { AppProps } from 'next/app';  // Import the correct type for AppProps

// Define the MyApp function with explicit types
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
