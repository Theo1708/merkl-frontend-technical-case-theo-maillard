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

export async function getMerklOpportunitiesCount(tokens : string | null, chain: string | null) {
  const query = {} as any;
  if (tokens) { query.tokens = tokens}
  if (chain) {query.chainId = chain}

  try {
    const opportunities = await merkl.opportunities.count.get({
      query,
    });
    return opportunities.data || 0;
  } catch (error) {
    console.log("Error fetching opportunities:", error);
    return 0;
  }
}

export async function getMerklOpportunities(tokens : string | null, column: string | null, order: Order, chain: string | null, page: number, items: number) {
  const query = {
    order,
    page,
    items
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

export async function getMerklTokensReward(chainId : string) {
  const tokensReward = await merkl.tokens.reward({chainId}).get()
  return tokensReward.data
}

export async function getMerklUserRewards(address : string, chainId : string | number) {
  const userRewards = await merkl.users({ address }).rewards.get({ query : { chainId : [Number(chainId)] }})
  return userRewards.data
}