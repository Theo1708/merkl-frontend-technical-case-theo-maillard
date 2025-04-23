import { MerklApi } from "@merkl/api";
import { Order } from "~/state/columnSortingState";

const merkl = MerklApi("https://api.merkl.xyz").v4;

export async function getMerklUser(address: string) {
  try {
    const user = await merkl.users({ address }).get();
    const connected = !!user.data;
    return { user, connected };
  } catch (error) {
    return { user: null, connected: false };
  }
}

export async function getMerklOpportunities(tokens : string | null, column: string | null, order: Order, chain: string | null) {
  const query = {
    order: order,
  } as any;

  if (tokens) {
    query.tokens = tokens;
  }
  if (column) {
    query.sort = column.toLowerCase();
  }
  if (chain) {
    query.chainId = chain;
  }

  try {
    const opportunities = await merkl.opportunities.index.get({
      query,
    });
    return opportunities.data;
  } catch (error) {
    console.log("Error fetching opportunities:", error);
    return [];
  }
}