import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import AuthSlice from "../../app/modules/auth/redux/AuthSlice";
import {persistReducer,persistStore} from 'redux-persist'
import {reduxBatch} from '@manaflair/redux-batch'
import createSagaMiddleware from 'redux-saga'
import ChatSlice from "../../app/modules/chat/redux/ChatSlice";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, ChatSlice)

const sagaMiddleware = createSagaMiddleware()
const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
  }),
  sagaMiddleware,
]

const store = configureStore({
  reducer: {
    Auth: AuthSlice,
    Chat: persistedReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [reduxBatch],
});

export default store;

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
