import { configureStore } from '@reduxjs/toolkit';
import futGameReducer from './slices/futSlices';

const store = configureStore({
  reducer: {
    fut: futGameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredPaths: ["fut.futGame"],
        },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
