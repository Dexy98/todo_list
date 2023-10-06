import { configureStore } from "@reduxjs/toolkit";
import { Notes } from "./features/featuresApi";
export const store = configureStore({
  reducer: {
    [Notes.reducerPath]: Notes.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Notes.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
