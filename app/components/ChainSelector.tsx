import { useWalletContext } from "dappkit";
import { Select } from "dappkit";
import { useChainFilterStore } from "~/state/chainFilterState";

export default function ChainSelector() {
  const { chains } = useWalletContext();

  const selectedChain = useChainFilterStore((state) => state.selectedChain);
  const setSelectedChain = useChainFilterStore((state) => state.setSelectedChain);

  const handleChainChange = (newChainId: any) => {
    setSelectedChain(newChainId);
  };

  const chainOptions = chains.reduce((acc, chain) => {
    acc[chain.id] = (
      <div className="flex items-center gap-xl m-sm">
        <img src={chain.icon} alt={chain.name} className="w-6 h-6" />
        {chain.name}
      </div>
    );
    return acc;
  }, {} as any);

  return (
    <Select
      value={selectedChain as any}
      onChange={handleChainChange}
      options={chainOptions}
      placeholder="Select a Chain"
    />
  );
};
