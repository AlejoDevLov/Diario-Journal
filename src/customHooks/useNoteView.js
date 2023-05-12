import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../hooks/useForm";
import { useMemo, useRef } from "react";
import { startDeletingNote, startSaveNote, startUpLoadingFiles } from "../store/journal";


export const useNoteView = () => {

    const fileInputRef = useRef();


    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );

    const dispatch = useDispatch();

    const { title, body, date, onInputChange, formState } = useForm( note );

    const dateString = useMemo( () => {
        const newDate = new Date( date );
        return newDate.toUTCString();
    }, [date]);
    
    const onSaveNotes = () => {
        dispatch( startSaveNote() );
    }

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;

        // console.log(target.files);
        dispatch( startUpLoadingFiles( target.files ) );
    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

    return {
        fileInputRef,
        note, messageSaved, isSaving, formState,
        title, body, onInputChange,
        dateString,
        onSaveNotes,
        onFileInputChange,
        onDelete,
    }

}