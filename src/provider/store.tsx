import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './theme/theme'
import languageReducer from './language/language'
import userReducer from "./user/user"
import modalsReducer from './modals/modals.reducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import snackbarReducer from './snackbar/snackbar.reducer';


const store = configureStore({
    reducer: {
        theme: themeReducer,
        language: languageReducer,
        globalUser: userReducer,
        modals: modalsReducer,
        snackbar: snackbarReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export type AppDispatch = typeof store.dispatch; // Here we export the store's dispatch type
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store




