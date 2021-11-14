import { useState, useEffect } from "react";
import { providers, Contract } from "ethers";
import { useProviderLogs } from "./useProviderLogs.hook";
import Counter from "../../contracts/artifacts/contracts/Counter.sol/Counter.json";
import { useWebSocketLogs } from "./useWebSocketLogs.hook";

type Web3Provider = providers.Web3Provider;
type JsonRpcSigner = providers.JsonRpcSigner;
type WS = providers.WebSocketProvider;

declare const window: Window &
  typeof globalThis & {
    ethereum: any;
  };

const { abi } = Counter;

const { WebSocketProvider } = providers;

export const useCounter = () => {
  const address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const [counter, setCounter] = useState<Contract>();
  const [signerCounter, setSignerCounter] = useState<Contract>();
  const [provider, setProvider] = useState<Web3Provider>();
  const [wsProvider, setWSProvider] = useState<WS>();
  const [signer, setSigner] = useState<JsonRpcSigner>();

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      // set up web providers
      const wsProvider = new WebSocketProvider("ws://localhost:8545");
      const provider = new providers.Web3Provider(window.ethereum);

      setProvider(provider);
      setWSProvider(wsProvider);

      // set up signer
      const signer = provider.getSigner();

      setSigner(signer);

      // set up smart contracts
      const providerContract = new Contract(address, abi, provider);
      const signerContract = new Contract(address, abi, signer);

      setCounter(providerContract);
      setSignerCounter(signerContract);
    }
  }, []);

  useWebSocketLogs(wsProvider);
  useProviderLogs(provider);

  return {
    counter,
    provider,
    wsProvider,
    signer,
    signerCounter,
  };
};
