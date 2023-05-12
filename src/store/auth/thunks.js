import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, login, logout, sendConfirmEmail, updateEmailValidation } from "./authSlice"
import { firebaseAuth } from "../../firebase/config";


export const checkingAutentication = () => {

    return async ( dispatch ) => {

        dispatch( checkingCredentials() );

    }

}


export const startGoogleSignIn = () => {
    return async ( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();
        // console.log(result);
        if( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ) );
    }
}


export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async( dispatch, getState ) => {

        dispatch( checkingCredentials() );

        const { emailVerified } = getState().auth;

        const { ok, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

        if (!ok) return dispatch( logout({ errorMessage }) );

        firebaseAuth.useDeviceLanguage();

        sendEmailVerification( firebaseAuth.currentUser )
        .then( () => 'Email enviado' )
        .catch( error => console.log(error) );

        if(!emailVerified) return dispatch( logout({ errorMessage: 'Debes verificar el email en tu bandeja de correo' }) );

        // dispatch( login({ uid, displayName, email, photoURL }) );
    }
}


export const startLoginWithEmailAndPassword = ({ email, password }) => {

    return async ( dispatch, getState ) => {

        dispatch( checkingCredentials() );

        // const { emailVerified } = getState().auth;

        const { ok, uid, photoURL, displayName, errorMessage } = await (loginWithEmailPassword( {email, password} ));

        if (!ok) return dispatch(logout({errorMessage}));

        const { emailVerified } = firebaseAuth.currentUser;

        if(!emailVerified) return dispatch( logout({ errorMessage: 'Debes verificar el email en tu bandeja de correo' }) );

        dispatch(login({ uid, email, photoURL, displayName, emailVerified }));
    }

}


export const startLogout = () => {
    return async ( dispatch ) => {

        await logoutFirebase();

        dispatch( clearNotesLogout() );
        dispatch( logout() );
    }
}

export const startRecoveryPassword = ( email ) => {
    return async ( dispatch) => {

        // console.log(email);
        try {
            // especificar un idioma
            // firebaseAuth.languageCode = 'es';

            // seleccionar idioma del navegador del usuario
            firebaseAuth.useDeviceLanguage();

            await sendPasswordResetEmail(firebaseAuth, email);
            
        } catch (error) {
            console.log(error);
            return dispatch( logout({ errorMessage: 'verifica bien el correo electrónico' }) );
        }
        dispatch( sendConfirmEmail('Hemos enviado un mensaje a tu correo electrónico') );
    }
}