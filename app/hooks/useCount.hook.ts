import { useState, Dispatch, SetStateAction } from "react";
import { useQuery, QueryFunction } from "react-query";
import { Contract, ContractTransaction } from "ethers";

type UseCount = (contract: Contract | undefined) => {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  error: unknown;
};

type FetchCount = QueryFunction<ContractTransaction, "counter:increment">;

export const useCount: UseCount = (counter) => {
  const [count, setCount] = useState(0);

  const fetchCount: FetchCount = async () => {
    if (counter) {
      const countResponse = await counter.getCount();
      setCount(countResponse.toNumber());
      return countResponse;
    }
  };

  const depenedencies = { enabled: Boolean(counter) };

  const { isLoading, error } = useQuery(
    "counter:increment",
    fetchCount,
    depenedencies
  );

  return { count, setCount, isLoading, error };
};
