import { useState } from "react";

import { Button, Container, Text } from "dappkit";

import { useTokenFilterStore } from "~/state/tokenFilterState";

const POSSIBLE_TOKEN_FILTER = ["ARB", "OP", "ETH", "USDC"];

export default function TokenFilter() {

    const selectedToken = useTokenFilterStore((state) => state.selectedToken);
    const setSelectedToken = useTokenFilterStore((state) => state.setSelectedToken);

    return (
        <Container>
            <Text>
                Tokens
            </Text>
            <div className="flex flex-row gap-lg">
                {POSSIBLE_TOKEN_FILTER.map((token) => (
                    <Button
                        className="w-[100px]"
                        center={true}
                        key={token}
                        look={selectedToken === token ? "bold" : "base"}
                        onClick={() => setSelectedToken(token)}
                    >
                    {token}
                    </Button>
                ))}
                <Button
                    className="w-[100px]"
                    center={true}
                    look={selectedToken === null ? "bold" : "base"}
                    onClick={() => setSelectedToken(null)}
                    >
                    All
                </Button>
            </div>
        </Container>
    )
}
