import { createTable, Text } from "dappkit";

import { getMerklOpportunities } from "~/APIs/Merkl.api";
import { useEffect, useState } from "react";
import { useTokenFilterStore } from "~/state/tokenFilterState";
import { useColumnSortingStore } from "~/state/columnSortingState";
import { useChainFilterStore } from "~/state/chainFilterState";


const columns = {
	name: { name: "Name", size: "2fr" },
	apr: { name: "APR", size: "1fr" },
	tvl: { name: "TVL", size: "1fr" },
  } as const;

const [Table, Row] = createTable(columns);

export default function OpportunitiesTable() {
	const [opportunities, setOpportunities] = useState<{ name: string; apr: number; tvl: number }[]>([]);

	const { selectedToken } = useTokenFilterStore();
	const { selectedColumn, selectedOrder } = useColumnSortingStore();
	const { selectedChain } = useChainFilterStore();

	useEffect(() => {
	console.log(selectedChain)
	  getMerklOpportunities(selectedToken, selectedColumn, selectedOrder, selectedChain).then((data) => {
		setOpportunities(data || []);
	  });
	}, [selectedToken, selectedColumn, selectedOrder, selectedChain]);

	return (
		<Table responsive>
		  {opportunities.map((opp, index) => (
			<Row
			  key={index}
			  nameColumn={<Text>{opp.name}</Text>}
			  aprColumn={<Text>{opp.apr.toFixed(2)}</Text>}
			  tvlColumn={<Text>{opp.tvl.toFixed(2)}</Text>}
			/>
		  ))}
		</Table>
	);
}