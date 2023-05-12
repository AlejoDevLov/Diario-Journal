import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth/authSlice";
import { startLoadingNotes } from "../store/journal/thunks";
import { firebaseAuth } from "../firebase/config";


// Verifica el estado actual y mantiene los datos del usuario al recargar la pagina
export const useCheckAuth = () => {
    const { status, emailVerified: email } = useSelector( state => state.auth );
    const dispatch = useDispatch();
    // console.log( {email} );
    
    //  este bloque de codigo utiliza el hook useEffect para disparar la accion onAuthStateChanged
    //  la cual verifica el estado de autenticacion del usuario en Firebase.
    useEffect(() => {
        onAuthStateChanged( firebaseAuth, async (user) => {
            // console.log( user );
            // console.log(user.emailVerified);
            if ( !user || !user.emailVerified ) return dispatch( logout() );

            const { uid, displayName, email, photoURL, emailVerified } = user;
            dispatch( login({ uid, displayName, email, photoURL, emailVerified }) );
            dispatch( startLoadingNotes() );
        } );
    }, []);

    return status;
}
