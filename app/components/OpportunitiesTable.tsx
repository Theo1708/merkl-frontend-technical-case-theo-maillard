import { createTable, Text } from "dappkit";

import { getMerklOpportunities, getMerklOpportunitiesCount } from "~/APIs/Merkl.api";
import { useEffect, useState } from "react";
import { useTokenFilterStore } from "~/state/tokenFilterState";
import { useColumnSortingStore } from "~/state/columnSortingState";
import { useChainFilterStore } from "~/state/chainFilterState";
import Paginator from "./Paginator";
import { usePaginationStore } from "~/state/paginationState";


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
	const { pagination, setTotalItems } = usePaginationStore();

	useEffect(() => {
		getMerklOpportunitiesCount(selectedToken, selectedChain)
			.then((count) => {
				setTotalItems(count)
			});
	}, [selectedToken, selectedChain]);

	useEffect(() => {
		getMerklOpportunities(
			selectedToken,
			selectedColumn,
			selectedOrder,
			selectedChain,
			pagination.currentPage - 1,
			pagination.itemsPerPage
		).then((data) => {
			setOpportunities(data || []);
		});
	}, [selectedToken, selectedColumn, selectedOrder, selectedChain, pagination.currentPage, pagination.itemsPerPage]);

	return (
		<>
			<Paginator />
			<Table responsive>
			{opportunities.map((opportunity, index) => (
				<Row
					key={index}
					nameColumn={<Text>{opportunity.name}</Text>}
					aprColumn={<Text>{opportunity.apr.toFixed(2)}</Text>}
					tvlColumn={<Text>{opportunity.tvl.toFixed(2)}</Text>}
				/>
			))}
			</Table>
			{ pagination.totalItems ?
				<Paginator />
				:
				<Text className="m-xl">No opportunities found, adjust filters</Text>
			}
		</>
	);
}