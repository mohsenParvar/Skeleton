import { useCallback, useEffect } from "react"
import { ethers } from "ethers";
import { BehaviorSubject } from 'rxjs';
import { AVALANCHE_MAINNET_PARAMS, LOCALNODE, PRIVATENODE } from "app/constants";
import { nodeIsHealthy } from "utils/globalUtils";


type providersPayloadInterface = ethers.providers.StaticJsonRpcProvider | null | 'error'

export const providersSubscription = new BehaviorSubject<providersPayloadInterface>(null)


const providersMessageService = {
  send: function (msg: providersPayloadInterface) {
    providersSubscription.next(msg);
  },
};

export const useProvidersFetchRX = (interval = 10000) => {

  const fetchProviders = useCallback(
    async () => {

      try {
        if (process.env.ENVIRONMENT === 'DEV' && LOCALNODE) {
          const localProvider = new ethers.providers.StaticJsonRpcProvider(`${LOCALNODE}/ext/bc/C/rpc`);
          providersMessageService.send(localProvider)
        }
        //check if our node is healthy
        const nodeHealthy = await nodeIsHealthy(PRIVATENODE);
        if (nodeHealthy) {

          const privateProvider = new ethers.providers.
            StaticJsonRpcProvider(`${PRIVATENODE}ext/bc/C/rpc`);

          //do a quick call to check if the node is sync
          try {
            //avalanche burn address
            await privateProvider.getBalance('0x0100000000000000000000000000000000000000');
            providersMessageService.send(privateProvider);

          } catch (error) {
            console.error(error);
            providersMessageService.send(
              new ethers.providers.StaticJsonRpcProvider(AVALANCHE_MAINNET_PARAMS.rpcUrls[0])
            );

          }
        } else {
          providersMessageService.send(
            new ethers.providers.StaticJsonRpcProvider(AVALANCHE_MAINNET_PARAMS.rpcUrls[0])
          );

        }
      } catch (error) {
        providersMessageService.send('error')
      }
    },
    [],
  )

  // const intervalTimer = useRef<any>()

  useEffect(() => {
    fetchProviders()
    // intervalTimer.current = setInterval(() => {
    //   fetchPrice()
    // }, interval)
    return () => {
      // if (intervalTimer.current) {
      //   clearInterval(intervalTimer.current)
      // }
    }
  }, [])

}