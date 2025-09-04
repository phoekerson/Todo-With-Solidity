/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from "ethers";
import todoABI from "../contracts/abi.json";

// Replace with the address you get after deploying on Sepolia
const CONTRACT_ADDRESS = "0x27193dfd5f0af28a3aeda95e23b7047736832af72271625939364a3faaa38976";
declare global {
  interface Window {
    ethereum: any;
    Todoabi: any;
    abi: any;
  }
}
// RPC for Sepolia
const RPC_URL = "https://rpc.sepolia.org";

export const getContract = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed!");
  }

  // Create a provider that connects to Sepolia
  const provider = new ethers.BrowserProvider(window.ethereum, {
    name: "sepolia",
    chainId: 11155111, // Sepolia Chain ID
  });

  // Request account access if not already granted
  await window.ethereum.request({ method: "eth_requestAccounts" });

  const signer = await provider.getSigner();

  // Also make a JSON-RPC provider to ensure connection to Sepolia
  const rpcProvider = new ethers.JsonRpcProvider(RPC_URL);

  // Attach signer to Sepolia provider
  return new ethers.Contract(CONTRACT_ADDRESS, (todoABI as any).abi, signer.connect(rpcProvider));
};
