import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { BehaviorSubject } from 'rxjs';


type web3InfoPayloadInterface = any
export const web3Subscription = new BehaviorSubject<web3InfoPayloadInterface>(null)
const web3MessageService = {
  send: function (msg: web3InfoPayloadInterface) {
    web3Subscription.next(msg);
  },
};


export const useWeb3InfoEmitterHook = () => {
  const web3Info = useWeb3React();
  web3MessageService.send(web3Info)
}