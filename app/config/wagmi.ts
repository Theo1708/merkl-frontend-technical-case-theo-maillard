import { http, createClient, custom } from "viem";
import { mainnet, optimism, arbitrum } from "viem/chains";
import { createConfig, injected } from "wagmi";

export default createConfig({
	chains: [mainnet, optimism, arbitrum],
	ssr: true,
	transports: {
    // [mainnet.id]: http(),
    // [optimism.id]: http(),
    // [arbitrum.id]: http(),
  },
	connectors: [
		// injected()
	],
} satisfies Parameters<typeof createConfig>["0"]);
