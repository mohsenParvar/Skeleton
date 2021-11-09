/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Helmet } from 'react-helmet-async';
import { Switch, Route } from 'react-router-dom';
import { GlobalStyle } from '../styles/global-styles';



import { HomePage } from './containers/HomePage/Loadable';
import { NotFoundPage } from './containers/NotFoundPage/Loadable';
import { AppPages } from './constants';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'utils/history';
import { useSelector } from 'react-redux';
import { selectRouter } from './appSelectors';

import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { usePriceFetchRX } from "hooks/dataFetchHooks/priceHook";
import { useProvidersFetchRX } from "hooks/dataFetchHooks/providersHook";
import { useContractsFetchRX } from "hooks/dataFetchHooks/contractHook";
import { useWeb3InfoEmitterHook } from "hooks/dataFetchHooks/web3InfoEmitterHook";

export function App() {

  usePriceFetchRX()
  useProvidersFetchRX()
  useContractsFetchRX()
  useWeb3InfoEmitterHook()

  const router = useSelector(selectRouter);
  const { t } = useTranslation();
  const { location } = router

  return (
    <ConnectedRouter history={history}>
      <Helmet
        titleTemplate="%s - Skeleton"
        defaultTitle={t(translations.Snowball())}
      >
        <meta name="description" content="Skeleton" />
      </Helmet>

      <Switch>
        <Route path={AppPages.RootPage} component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </ConnectedRouter>
  );
}
