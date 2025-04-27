import { useState } from "react";
import { Box, Input, Button, Text } from "dappkit";
import { getMerklUser } from "~/APIs/Merkl.api";
import { useSignInStore } from "~/state/signInState";

export default function SignIn() {
  const { userAddress, setUserAddress, logOut } = useSignInStore();
  const [checking, setChecking] = useState(false);
  const [userNewAddress, setUserNewAddressRaw] = useState<string | undefined>();

  const setUserNewAddress = (v: string | undefined) => {
    setUserNewAddressRaw(v ?? undefined);
  };

  const signIn = async () => {
    if (!userNewAddress || userNewAddress.trim() === "") {
      alert("Please enter a wallet address");
      return;
    }

    setChecking(true);
    const { connected } = await getMerklUser(userNewAddress.trim());
    setChecking(false);

    if (connected) {
      setUserAddress(userNewAddress.trim())
      setUserNewAddress(undefined)
    } else {
      alert("Address not found.");
    }
  };

  return (
    <Box className="flex-row gap-4 items-end">
      {!userAddress ? (
        <>
          <Input
            look="base"
            size="sm"
            label="Wallet Address"
            placeholder="Connect your wallet address"
            state={[userNewAddress, setUserNewAddress]}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                signIn();
              }
            }}
            hint="Enter your Ethereum wallet address"
          />
          <Button
            onClick={signIn}
            look="base"
            size="sm"
            center
            className="w-fit"
            disabled={checking}
          >
            {checking ? "Checking..." : "Sign In"}
          </Button>
        </>
      ) : (
        <div className="flex-row flex gap-xl items-center">
          <Text
            look="soft"
          >{userAddress}</Text>
          <Button
            onClick={logOut}
            look="hype"
            size="sm"
            center
            className="w-fit"
            disabled={checking}
          >
            Log out
          </Button>
        </div>
      )}
    </Box>
  );
}