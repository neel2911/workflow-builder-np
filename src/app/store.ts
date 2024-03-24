import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { workflowBuilderReducer } from "../features/workflowBuilder";
import { homeReducer } from "../features/home";

export const store = configureStore({
  reducer: {
    workFlowBuilder: workflowBuilderReducer,
    home: homeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
