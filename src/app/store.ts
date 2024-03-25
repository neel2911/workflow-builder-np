import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { workflowBuilderReducer } from "../features/workflowBuilder";

export const store = configureStore({
  reducer: {
    workFlowBuilder: workflowBuilderReducer,
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
