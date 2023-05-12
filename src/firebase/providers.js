import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { firebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {

    try {
        
        const result = await signInWithPopup(firebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        const { email, displayName, photoURL, uid } = result.user;
        // console.log(user);

        return {
            ok: true,
            // info usuario
            email,
            photoURL, 
            displayName, 
            uid,
        }

    } catch (error) {

        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        
        return {
            ok: false,
            errorMessage,
            errorCode,
        }
    }
}


export const registerUserWithEmailPassword = async({ email, password, displayName }) => {
    try {
        const resp = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        // TODO: actualizar displayName en firebase
        await updateProfile( firebaseAuth.currentUser, { displayName } );

        return {
            ok: true, uid, photoURL, email, displayName,
        }

    } catch (error) {
        return {
            ok: false, errorMessage: error.message,
        }
    }
}


export const loginWithEmailPassword = async ( {email, password} ) => {

    //! signInWithEmailAndPassword

    try {
        const resp = await signInWithEmailAndPassword( firebaseAuth, email, password );
        // console.log(resp.user);
        const { uid, photoURL, displayName } = resp.user;
        return {
            ok: true,
            uid, 
            photoURL, 
            displayName
        }

    } catch (error) {
        return {
            ok: false, errorMessage: error.message,
        }
    }
}


export const logoutFirebase = async () => {
    return await firebaseAuth.signOut();
}