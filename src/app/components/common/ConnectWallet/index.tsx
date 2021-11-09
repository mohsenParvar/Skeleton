import { memo } from 'react'
import { useWeb3React } from '@web3-react/core'


import { Button } from "@material-ui/core";
import { injected } from "app/constants";



const ConnectWallet = () => {
  const { account, connector, activate, active, error, deactivate } = useWeb3React();

  const walletHandler = () => {
    activate(injected)
  }

  return (

    <Button
      onClick={walletHandler}
    >
      Connect
    </Button>

  );
};

export { ConnectWallet };
