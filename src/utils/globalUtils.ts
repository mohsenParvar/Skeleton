import { CONTRACTS } from "config"

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
