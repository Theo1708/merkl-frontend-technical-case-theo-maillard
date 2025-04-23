import { useState } from "react";
import { Box, Input, Button, Text, Container } from "dappkit";
import { getMerklUser } from "~/APIs/Merkl.api";

export default function SignIn() {
  const [signedIn, setSignedIn] = useState(false);
  const [checking, setChecking] = useState(false);
  const [userAddress, setUserAddressRaw] = useState<string | undefined>();

  const setUserAddress = (v: string | undefined) => {
    setUserAddressRaw(v ?? undefined);
  };

  const signIn = async () => {
    if (!userAddress || userAddress.trim() === "") {
      alert("Please enter a wallet address");
      return;
    }

    setChecking(true);
    const { connected } = await getMerklUser(userAddress.trim());
    setChecking(false);

    if (connected) {
      setSignedIn(true);
    } else {
      alert("Address not found.");
    }
  };

  const logOut = () => {
    setSignedIn(false);
    setUserAddress(undefined);
  };

  return (
    <Box className="flex-row gap-4 items-end">
      {!signedIn ? (
        <>
          <Input
            look="base"
            size="sm"
            label="Wallet Address"
            placeholder="Connect your wallet address"
            state={[userAddress, setUserAddress]}
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