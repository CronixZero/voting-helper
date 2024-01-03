import {combineReducers, configureStore} from '@reduxjs/toolkit'
import candidatesReducer from '@/app/store/slices/candidatesSlice'
import cloudReducer from '@/app/store/slices/cloudSlice'
import changeHistoryReducer from '@/app/store/slices/changeHistorySlice'
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import {CloudMiddleware} from "@/app/store/middleware/cloud";
import {ChangeHistoryMiddleware} from "@/app/store/middleware/changeHistory";
import {Client} from "@stomp/stompjs";
import {WEBSOCKET_URL} from "@/app/constants";

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['cloud', 'changeHistory']
}

const cloudPersistConfig = {
  key: 'cloud',
  storage: storage,
  blacklist: ['connected']
}

const rootReducer = combineReducers({
  candidates: candidatesReducer,
  changeHistory: changeHistoryReducer,
  cloud: persistReducer(cloudPersistConfig, cloudReducer),
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const cloudClient = new Client({
  brokerURL: WEBSOCKET_URL
});
const {cloudMiddleware} = new CloudMiddleware(cloudClient);
const {changeHistoryMiddleware} = new ChangeHistoryMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(cloudMiddleware).concat(changeHistoryMiddleware);
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch