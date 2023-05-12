import { useEffect } from "react"

import { useDispatch } from "react-redux";

import { DeleteOutline, SaveOutlined, UploadFileOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css';

import { ImageGalery } from "../components"
import { setActiveNote } from "../../store/journal"
import { useNoteView } from "../../customHooks/useNoteView";
import { firebaseAuth } from "../../firebase/config";


export const NoteView = () => {

    const { 
        fileInputRef,
        note, messageSaved, isSaving, formState,
        title, body, onInputChange,
        dateString,
        onSaveNotes,
        onFileInputChange,
        onDelete,
     } = useNoteView();

     const dispatch = useDispatch();

    useEffect(() => {
        dispatch( setActiveNote(formState) );
    }, [formState]);

    useEffect(() => {
        if ( messageSaved.length > 0 ){
            Swal.fire( 'Nota actualizada', messageSaved, 'success' );
        }  
    }, [messageSaved]);

  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }} >
        <Grid item >
            <Typography fontSize={ 39 } fontWeight="light" >{ dateString }</Typography>
        </Grid>
        <Grid item >

            <input
                type="file"
                multiple
                ref={ fileInputRef }
                onChange={ onFileInputChange }
                style={{ display: 'none' }}
            />

            <IconButton
                color="primary"
                disabled={ isSaving }
                onClick={ () => fileInputRef.current.click()}
                >
                <UploadFileOutlined/>
            </IconButton>

            <Button 
                disabled={ isSaving }
                onClick={ onSaveNotes }
                color="primary" 
                sx={{ padding: 2 }} >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un titulo"
                label="Título"
                name="title"
                value={ title }
                onChange={ onInputChange }
                sx={{ border: 'none', mb: 1 }}
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="Que sucedió el dia de hoy"
                name="body"
                value={ body }
                onChange={ onInputChange }
                minRows={ 5 }
            />
        </Grid>

        <Grid container justifyContent="end">
            <Button
                onClick={ onDelete }
                sx={{ mt: 2 }}
                color="error"
            >
                <DeleteOutline />
                Borrar nota
            </Button>
        </Grid>
            <ImageGalery images={ note.imageUrls }/>

    </Grid>
  )
}
