import type { MetaFunction } from "@remix-run/node";
import { Box, Container } from "dappkit";
import SignIn from "~/components/SignIn";
import ChainSelector from "~/components/ChainSelector";
import OpportunitiesTable from "~/components/OpportunitiesTable";
import TokenFilter from "~/components/TokenFilter";
import ColumnSorting from "~/components/ColumnSorting";
import UserRewards from "~/components/UserRewards";

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
		<UserRewards />
		<TokenFilter />
		<ColumnSorting />
		<OpportunitiesTable/>
	  </Container>
	);
}