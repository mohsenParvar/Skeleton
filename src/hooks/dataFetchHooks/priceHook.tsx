import { useCallback, useEffect, useRef } from "react"
import CoinGecko from 'coingecko-api'
import { BehaviorSubject } from 'rxjs';

interface pricePayloadInterface {
  SNOB: number;
  AVAX: number;
  SNOB24HChange: number;
}
const priceSubscription = new BehaviorSubject<pricePayloadInterface>({
  AVAX: 0,
  SNOB: 0,
  SNOB24HChange: 0
})



const priceMessageService = {
  send: function (msg: pricePayloadInterface) {
    priceSubscription.next(msg);
  },
};

export const usePriceFetchRX = (interval = 10000) => {

  const fetchPrice = useCallback(
    async () => {
      const CoinGeckoClient = new CoinGecko();
      const { data: response } = await CoinGeckoClient.simple.price({
        ids: [
          'snowball-token',
          'wrapped-avax',
        ],
        vs_currencies: ['usd'],
        //@ts-ignore
        include_24hr_change: [true]
      });

      const prices = {
        SNOB: response['snowball-token']?.usd || 0,
        AVAX: response['wrapped-avax']?.usd || 0,
        SNOB24HChange: response['snowball-token']?.usd_24h_change || 0,
      };
      priceMessageService.send(prices);
    },
    [],
  )

  const intervalTimer = useRef<any>()

  useEffect(() => {
    fetchPrice()
    intervalTimer.current = setInterval(() => {
      fetchPrice()
    }, interval)
    return () => {
      if (intervalTimer.current) {
        clearInterval(intervalTimer.current)
      }
    }
  }, [])

}