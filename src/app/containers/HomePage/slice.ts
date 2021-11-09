import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import { homePageSaga } from "./saga";
import { ContainerState } from './types';

// The initial state of the HomePage container
export const initialState: ContainerState = {};

const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    getHomePageInitialDataAction(state, action: PayloadAction<any>) { },
  },
});

export const {
  actions: HomePageActions,
  reducer: HomePageReducer,
  name: sliceKey,
} = homePageSlice;
export const useHomeSlice = () => {

  useInjectReducer({ key: sliceKey, reducer: HomePageReducer });
  useInjectSaga({ key: sliceKey, saga: homePageSaga });

  return HomePageActions
}