import { configureStore } from '@reduxjs/toolkit';
import futGameReducer from './slices/futSlices';
import navGameReducer from './slices/navSlices';

const store = configureStore({
  reducer: {
    fut: futGameReducer,
    nav: navGameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredPaths: ["fut.futGame"],
            ignoredActions: ["futGame/pass"]
        },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
