import { CONTRACTS, C_CHAIN_ID } from "config"
import { ethers } from "ethers"
import SNOWBALL_ABI from 'libs/abis/snowball.json'
import SNOWCONE_ABI from 'libs/abis/snowcone.json'
import GAUGE_PROXY_ABI from 'libs/abis/gauge-proxy.json'
import { SnowConeABI } from "libs/abis/snowcone"


export const addSnobToMetamask = async () => {
  //@ts-ignore
  const provider = window.ethereum
  if (provider) {
    try {
      await provider.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: CONTRACTS.SNOWBALL,
            symbol: 'SNOB',
            decimals: '18',
            image: 'https://raw.githubusercontent.com/Snowball-Finance/Assets/main/snowball-128x128.png',
          },
        },
      })
    } catch (error) {
      console.log('Error => addMetamask')
    }
  }
}
export const nodeIsHealthy = async (url: string) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({ "jsonrpc": "2.0", "id": 1, "method": "health.getLiveness" });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };
  try {
    const response = await fetch(`${url}/ext/health`, requestOptions);
    const bodyResponse = await response.json();
    return bodyResponse.healthy;
  } catch (error) {
    console.log(error);
    return false;
  }
}
