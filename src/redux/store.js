import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import userReducer from "./user/userSlice";
import postReducer from "./post/postSlice";

const userConfig = {
  key: "user",
  storage: AsyncStorage,
  whitelist: ["user"],
};

/**
 * A store that holds the whole state tree of the application.
 */
const store = configureStore({
  reducer: {
    user: persistReducer(userConfig, userReducer),
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
