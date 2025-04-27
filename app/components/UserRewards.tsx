import { useEffect, useState } from "react"
import { getMerklTokensReward, getMerklUserRewards } from "~/APIs/Merkl.api"
import { useChainFilterStore } from "~/state/chainFilterState"
import { useSignInStore } from "~/state/signInState"

import { createTable, Text } from "dappkit";

type TokensReward = {
    [key: string]: number;
  };

type UserTokenReward = {
    amount : string,
    address : string,
    decimals : number,
    symbol : string
}

type DisplayedToken = {
    symbol : string,
    value : number
}

const columns = {
	symbol: { name: "Token", size: "1fr" },
	value: { name: "Value (USD)", size: "1fr" },
  } as const;

const [Table, Row] = createTable(columns);

export default function UserRewards() {

    const { selectedChain } = useChainFilterStore()
    const { userAddress } = useSignInStore()
    const [tokensReward, setTokensReward] = useState<TokensReward>({})
    const [userTokenRewards, setUserTokenRewards] = useState<UserTokenReward[]>([])

    const [displayedTokens, setDisplayedTokens] = useState<DisplayedToken[]>([])


    useEffect(() => {
        getMerklTokensReward(selectedChain).then((tokens) => {
            if (tokens && tokens.length > 0) {
                setTokensReward(
                    tokens.reduce((acc, token) => {
                        return {
                            ...acc,
                            [token.address]: token.price
                        }
                    }, {})
                )
            } else {
                setTokensReward([] as any)
            }
        })
    }, [selectedChain])

    useEffect(() => {
        if (userAddress !== null) {
            getMerklUserRewards(userAddress, selectedChain).then((userRewards) => {
                if (userRewards && userRewards.length > 0) {
                    setUserTokenRewards((userRewards[0].rewards as [any]).reduce((acc, reward) => {
                        acc.push({
                            amount: reward.amount,
                            address: reward.token.address,
                            decimals: reward.token.decimals,
                            symbol: reward.token.symbol
                        });
                        return acc;
                    }, []))
                } else {
                    setUserTokenRewards([])
                }
            })
        }
    }, [userAddress, selectedChain])

    useEffect(() => {
        setDisplayedTokens(
            userTokenRewards.reduce((acc, token) => {
                acc.push({
                    symbol: token.symbol,
                    value: tokensReward[token.address] * Number(token.amount) / (10 ** token.decimals)
                })
                return acc
            }, [] as DisplayedToken[])
        )
    }, [userTokenRewards, tokensReward])

    return (
        <>
            { userAddress ?
                displayedTokens.length > 0 ?
                    <Table responsive>
                        {displayedTokens.map((token, index) => (
                            <Row
                                key={index}
                                symbolColumn={<Text>{token.symbol}</Text>}
                                valueColumn={<Text>{token.value.toFixed(2)}</Text>}
                            />
                        ))}
                    </Table>
                    :
                    <Text>You haven't any token reward for this chain</Text>
                :
                undefined
            }
        </>
    )
}