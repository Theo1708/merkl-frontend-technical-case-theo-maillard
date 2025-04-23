import type { MetaFunction } from "@remix-run/node";
import { Box, Container, createTable, Text } from "dappkit";
import SignIn from "~/components/SignIn";
import ChainSelector from "~/components/ChainSelector";
import OpportunitiesTable from "~/components/OpportunitiesTable";
import { getMerklOpportunities } from "~/APIs/Merkl.api";
import { useEffect, useState } from "react";
import TokenFilter from "~/components/TokenFilter";
import ColumnSorting from "~/components/ColumnSorting";

export const meta: MetaFunction = () => {
	return [
		{ title: "Merkl Frontend Technical Case" },
		{ name: "description", content: "Do your best !" },
	];
};

export default function Index() {
	return (
	  <Container className="flex flex-col gap-xl p-xl">
		<Box className="flex-row justify-between items-center">
		  <ChainSelector />
		  <SignIn />
		</Box>
		<TokenFilter />
		<ColumnSorting />
		<OpportunitiesTable/>
	  </Container>
	);
}