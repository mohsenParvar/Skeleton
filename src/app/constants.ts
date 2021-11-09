/* eslint-disable */
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'

export enum AppPages {
  RootPage = '/',
  HomePage = '/home',
  // [INSERT NEW PAGE PATH ABOVE] < Needed for generating containers seamlessly
}
export const PRIVATENODE = process.env?.REACT_APP_PRIVATENODE ?? '';
export const LOCALNODE = process.env.REACT_APP_LOCALNODE ?? '';
console.log(process.env)

export const AVALANCHE_MAINNET_PARAMS = {
  chainId: '0xa86a',
  chainName: 'Avalanche Mainnet C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18
  },
  rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://snowtrace.io/']
}

export const walletlink = new WalletLinkConnector({
  url: AVALANCHE_MAINNET_PARAMS.rpcUrls[0],
  appName: 'Snowball',
  appLogoUrl: 'https://raw.githubusercontent.com/Snowball-Finance/app-v2/master/public/assets/images/logo.png'
})

export const injected = new InjectedConnector({ supportedChainIds: [Number(AVALANCHE_MAINNET_PARAMS.chainId)] })
export const trustWallet = new InjectedConnector({ supportedChainIds: [Number(AVALANCHE_MAINNET_PARAMS.chainId)] })