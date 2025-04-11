
declare global {
  interface Window {
    ethereum?: any;
    tronWeb?: any;
    solana?: any;
  }
}

export default function initWallets() {
  if (typeof window === "undefined") return;

  // MetaMask
  if (window.ethereum) {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts: string[]) => {
        console.log("MetaMask connected:", accounts[0]);
      })
      .catch((err: any) => {
        console.error("MetaMask connection error:", err);
      });
  } else {
    console.warn("MetaMask not found");
  }

  // TronLink
  if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
    console.log("TronLink connected:", window.tronWeb.defaultAddress.base58);
  } else {
    console.warn("TronLink not found or not connected");
  }

  // Phantom
  if (window.solana && window.solana.isPhantom) {
    window.solana.connect().then(({ publicKey }: any) => {
      console.log("Phantom connected:", publicKey.toString());
    }).catch((err: any) => {
      console.error("Phantom connection error:", err);
    });
  } else {
    console.warn("Phantom not found");
  }
}
