
const IS_MAINNET = process.env.NETWORK === 'mainnet'

const C_CHAIN_ID = IS_MAINNET ? 43114 : 43113

const MAX_RETRIES = 5

const CONTRACTS = IS_MAINNET
  ? {
    GOVERNANCE: '0x914556b16c1220e4af63084dB1acbD4e6f9c65Aa',
    GAUGE_PROXYV1: '0xFc371bA1E7874Ad893408D7B581F3c8471F03D2C',
    GAUGE_PROXYV2: '0x215D5eDEb6A6a3f84AE9d72962FEaCCdF815BF27',
    SNOWBALL: '0xc38f41a296a4493ff429f1238e030924a1542e50',
    SNOWCONE: '0x83952E7ab4aca74ca96217D6F8f7591BEaD6D64E',
    ICE_QUEEN: '0xB12531a2d758c7a8BF09f44FC88E646E1BF9D375',
    FEE_DISTRIBUTOR: '0xAd86ef5fD2eBc25bb9Db41A1FE8d0f2a322c7839',
    SHERPA_FEE_DISTRIBUTOR: '0xfF86e2A7FA6165FCEf5872AE72458Df7473B63A4',
    S3D: {
      GAUGE: '0x5994612ffffc31d6c05c4fbec4a17116676d5b22',
      VAULT: '0x6B41E5c07F2d382B921DE5C34ce8E2057d84C042',
      TOKEN: '0xdE1A11C331a0E45B9BA8FeE04D4B51A745f1e4A4',
      USDT: '0xde3A24028580884448a5397872046a019649b084',
      BUSD: '0xaEb044650278731Ef3DC244692AB9F64C78FfaEA',
      DAI: '0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a',
    },
    S3F: {
      GAUGE: '0x472075680E16D34ABa24Ce9a6DDB59f27995906A',
      VAULT: '0x05c5DB43dB72b6E73702EEB1e5b62A03a343732a',
      TOKEN: '0xA42BE3dB9aff3aee48167b240bFEE5e1697e1281',
      FRAX: '0xDC42728B0eA910349ed3c6e1c9Dc06b5FB591f98',
      TUSD: '0x1C20E891Bab6b1727d14Da358FAe2984Ed9B59EB',
      USDT: '0xde3A24028580884448a5397872046a019649b084',
    },
    S4D: {
      GAUGE: '0xe517bab69a1a63a01c492d49e1d466385b1b1c0d',
      VAULT: '0xA0bE4f05E37617138Ec212D4fB0cD2A8778a535F',
      TOKEN: '0xB91124eCEF333f17354ADD2A8b944C76979fE3EC',
      DAI: '0xd586e7f844cea2f87f50152665bcbc2c279d8d70',
      FRAX: '0xdc42728b0ea910349ed3c6e1c9dc06b5fb591f98',
      TUSD: '0x1c20e891bab6b1727d14da358fae2984ed9b59eb',
      USDT: '0xc7198437980c041c805a1edcba50c1ce5db95118'
    },
    VOTE: {
      GOVERNANCE_V2: '0xfdCcf6D49A29f435E509DFFAAFDecB0ADD93f8C0',
    }
  } : {
    GOVERNANCE: '0x9013dE5325c7923CB9DbF59a7BD5c5Bec31514c8',
    GAUGE_PROXY: '0x25dD97dD53f06b8a73C732FC262DB730E26862D6',
    SNOWBALL: '0xF319e2f610462F846d6e93F51CdC862EEFF2a554',
    SNOWCONE: '0x9a37dC4f28C38813A6D31391721376066FbB401d',
    ICE_QUEEN: '0x041EE186982159da50Cc8A3A87B5eC669Db0b758',
    FEE_DISTRIBUTOR: '0xCb084A79F988273021b1F07E41AA6B47b0dDBe02',
    S3D: {
      GAUGE: '0x2e6Ae946D163C87254aaf2358A16553c08794f11',
      VAULT: '0x427BBe0E9D632b0285F046Ca36898D07F449452A',
      TOKEN: '0xE730AFB0C84416e33f17a6C781e46E59C6780CC4',
      USDT: '0xF7838d3fb0c8Ea840191a463551662c4064D3775',
      BUSD: '0xA79d0E1cD4E2482C7DEcCB50848d91B3daFE10F0',
      DAI: '0xa17901A40Ec10a72840e1EaEa0Ea11B0Ad8a53D9'
    },
    VOTE: {
      GOVERNANCE_V2: '0xfdCcf6D49A29f435E509DFFAAFDecB0ADD93f8C0',
    }
  }

export {
  IS_MAINNET,
  C_CHAIN_ID,
  CONTRACTS,
  MAX_RETRIES
}