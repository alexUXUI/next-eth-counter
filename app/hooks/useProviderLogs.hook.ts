import { useEffect } from "react";
import { providers } from "ethers";

type Web3Provider = providers.Web3Provider;

export const useProviderLogs = (provider: Web3Provider | undefined) => {
  useEffect(() => {
    if (provider) {
      console.log("PROVIDER");
      provider.getNetwork().then(console.log);
      provider.getGasPrice().then(console.log);
      provider.getBlockNumber().then(console.log);
      provider.getBlock("latest").then(console.log);
      provider.getBlock("earliest").then(console.log);
      provider.getBlock("0x0").then(console.log);
    } else {
      console.log("NOT PROVIDER");
    }
  }, [provider]);
};
