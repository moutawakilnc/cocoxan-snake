import { configureStore } from "@reduxjs/toolkit";

// Exemple de reducer (tu peux le personnaliser selon tes besoins)
import counterReducer from "./features/counter/counterSlice";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
	},
});

// Types pour les hooks Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
