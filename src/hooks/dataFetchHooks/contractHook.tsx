import { useCallback, useEffect, useMemo, useRef } from "react"
import { BehaviorSubject } from 'rxjs';
import { useWeb3React } from '@web3-react/core'
import { CONTRACTS, C_CHAIN_ID } from "config";
import SNOWBALL_ABI from 'libs/abis/snowball.json'
import SNOWCONE_ABI from 'libs/abis/snowcone.json'
import GAUGE_PROXY_ABI from 'libs/abis/gauge-proxy.json'

import { ethers } from "ethers";
import { SnowConeABI } from "libs/abis/snowcone";
import { providersSubscription } from "./providersHook";
import { web3Subscription } from "./web3InfoEmitterHook";
import { BNToFloat } from "utils/convertors";



type contractsPayloadInterface = any

const contractsSubscription = new BehaviorSubject<contractsPayloadInterface>(null)

const isWrongNetwork = (chainId) => chainId !== C_CHAIN_ID

const gaugeProxyContract = async (provider) => await new ethers.Contract(CONTRACTS.GAUGE_PROXYV2, GAUGE_PROXY_ABI, provider)



const contractsMessageService = {
  send: function (msg: contractsPayloadInterface) {
    contractsSubscription.next(msg);
  },
};

const snowballContract = (provider) => new ethers.Contract(CONTRACTS.SNOWBALL, SNOWBALL_ABI, provider)
//@ts-ignore
const snowconeContract = (provider) => new ethers.Contract(CONTRACTS.SNOWCONE, SNOWCONE_ABI, provider)

export const useContractsFetchRX = (interval = 10000) => {
  const accountRef = useRef<string | null>(null)
  const providerRef = useRef<any>(null)


  const fetchContracts = async () => {
    // const balance = await providerRef.current.getBalance(accountRef.current);
    // console.log(balance)
    // console.log(BNToFloat(balance))
    //@ts-ignore
    const snowconeContract = new ethers.Contract(CONTRACTS.SNOWCONE, SNOWCONE_ABI, providerRef.current)

    try {
      console.log('requesting')
      console.log(providerRef.current)
      const snowballBalance = await snowconeContract.callStatic['totalSupply()']({ gasLimit: 7000000 })
      console.log(snowballBalance)
      //   const [
      //     snowballBalance,
      //     snowconeBalance,
      //     totalSnowconeValue
      //   ] = await Promise.all([
      //     snowballContract,
      //     snowconeContract,
      //     snowconeContract
      //   ]);
      //   console.log({
      //     snowballBalance,
      //     snowconeBalance,
      //     totalSnowconeValue
      //   })
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    const Subscription = providersSubscription.subscribe((provider) => {
      if (provider && provider !== 'error') {

        providerRef.current = provider;
        if (accountRef.current) {
          fetchContracts()
        }
      }
    })
    return () => {
      Subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const Subscription = web3Subscription.subscribe((web3Info) => {
      if (web3Info) {
        const { account } = web3Info
        if (account) {
          accountRef.current = account
          if (providerRef.current) {
            fetchContracts()
          }
        }
      }
    })
    return () => {
      Subscription.unsubscribe()
    }
  }, [])

}