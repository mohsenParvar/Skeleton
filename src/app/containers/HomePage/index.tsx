/**
 *
 * HomePage
 *
 */

import { Grid } from "@material-ui/core";
import { memo } from 'react';
import { CompoundAndEarn } from './components/compoundAndEarn'


interface Props { }

export const HomePage = memo((props: Props) => {

  // const homePage = useSelector(selectHomePage);
  // const dispatch = useDispatch();
  // const { t, i18n } = useTranslation();

  return <>
    <Grid container spacing={3}>
      <Grid item xs={12} lg={6}>
        <CompoundAndEarn />
      </Grid>
      <Grid item xs={12} lg={6}>
        {/* <TotalLockedValue /> */}
      </Grid>
      <Grid item xs={12} lg={12}>
        {/* <LastTransactions /> */}
      </Grid>
    </Grid>



  </>;
});
