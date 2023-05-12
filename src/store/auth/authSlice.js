import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // autenticated, not-autenticated, checking
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
        emailVerified: false,
        confirmEmail: null,
    },
    reducers: {

        login: (state, { payload } ) => {
            const { uid, email, displayName, photoURL, emailVerified } = payload;
            state.status = 'autenticated';
            state.uid = uid;
            state.email = email;
            state.displayName = displayName;
            state.photoURL = photoURL;
            state.errorMessage = null;
            state.emailVerified = emailVerified;
        },

        logout: (state, { payload }) => {
            state.status = 'not-autenticated';
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload?.errorMessage;
            state.emailVerified = false;
        },

        checkingCredentials: (state) => {
            state.status = 'checking';
        },

        clearErrorMessage: (state) => {
            state.errorMessage = null;
            state.confirmEmail = null;
        },

        updateEmailValidation: ( state, action ) => {
            state.emailVerified = action.payload;
        },

        sendConfirmEmail: ( state, action ) => {
            state.confirmEmail = action.payload;
        },
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials, clearErrorMessage, updateEmailValidation, sendConfirmEmail } = authSlice.actions;