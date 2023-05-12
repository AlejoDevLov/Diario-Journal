import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { firebaseDB } from "../../firebase/config"
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotoToActiveNote, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from "../../herlpers/loadNotes";
import { fileUpload } from "../../herlpers/fileUpload";


export const startNewNote = () => {
    return async ( dispatch, getState ) => {
        
        dispatch( savingNewNote() );
        
        // getState() devuelve toda la info que hay en el store
        // console.log(getState());
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime(),
        }

        // referencia que apunta a la direccion de la coleccion de firestore
        const newDoc = doc( collection( firebaseDB, `${uid}/journal/notes`) );
        await setDoc(newDoc, newNote);
        // console.log({newDoc, setDocResp});

        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );
    }
}


export const startLoadingNotes = () => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;
        if ( !uid ) throw new Error('El uid del usuario no existe');
        // console.log({uid});

        const notes = await loadNotes( uid );

        dispatch( setNotes(notes) )

    }
}


export const startSaveNote = () => {
    return async ( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        // referencia al documento en fireStore
        const docRef = doc( firebaseDB, `${ uid }/journal/notes/${ note.id }` );

        // modificacion de la nota en fireStore
        await setDoc( docRef, noteToFireStore, { merge: true } );

        dispatch( updateNote(note) );
    }
}


export const startUpLoadingFiles = ( files = [] ) => {
    return async( dispatch ) => {

        dispatch( setSaving() );

        // await fileUpload( files[0] );

        // ejecutar multiples peticiones o promesas a la vez
        const fileUpLoadPromises = [];
        for (const file of files) {
            // insercion de cada funcion asincrona al array
            fileUpLoadPromises.push( fileUpload( file ) );
        }

        // Devuelve un array con todas las promesas cuando sean resueltas
        const photoUrls = await Promise.all( fileUpLoadPromises );
        // console.log(photoUrls);

        dispatch( setPhotoToActiveNote( photoUrls ) )
    }
}


export const startDeletingNote = () => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        // console.log({uid, note});

        // crear referencia a la nota (es como el path hacia esa nota)
        const docRef = doc( firebaseDB, `${uid}/journal/notes/${note.id}` );
        
        // eliminar nota referenciada en firebase
        await deleteDoc( docRef );

        // eliminar nota del store
        dispatch( deleteNoteById(note.id) );
    }
}