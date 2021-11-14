import { useEffect, useState } from "react";
import { providers } from "ethers";

type WS = providers.WebSocketProvider;

export const useWebSocketLogs = (wsProvider: WS | undefined) => {
  const [logs, setLogs] = useState<Object[]>([]);

  useEffect(() => {
    if (wsProvider) {
      wsProvider.on("error", (tx) => {
        console.log(tx);
      });

      wsProvider.on("pending", (tx) => {
        console.log(tx);

        wsProvider.getTransaction(tx).then((transaction) => {
          console.log(transaction);
        });

        wsProvider.getTransactionReceipt(tx).then((receipt) => {
          console.log(receipt);
        });

        setLogs((prev) => [...prev, tx]);
      });
    }
  }, [wsProvider]);

  return logs;
};
