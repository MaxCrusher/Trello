import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers';

const rootConf = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(rootConf, rootReducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
