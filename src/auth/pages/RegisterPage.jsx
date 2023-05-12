import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, TextField, Button, Link, Alert } from "@mui/material"
import { Link as RouterDomLink } from "react-router-dom";
import { AuthLayouth } from "../layout/AuthLayouth";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
import { useForm } from "../../hooks/useForm";
import { clearErrorMessage } from "../../store/auth/authSlice";


const formData = {
  email: '',
  password: '',
  displayName: '',
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe tener un @' ],
  password: [ (value) => value.length >= 6, 'El password debe contener almenos 6 caracteres' ],
  displayName: [ (value) => value.length >= 2, 'El nombre es obligatorio' ],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const { errorMessage, status } = useSelector( state => state.auth );

  const [formSubmited, setFormSubmited] = useState(false);

  const isCheckingAuthentication = useMemo( () => status === 'checking', [status]);

  const {
    onInputChange, email, password, displayName, formState,
    isFormValid, displayNameValid, emailValid, passwordValid 
    } = useForm(formData, formValidations);

    if ( !!errorMessage ) {
      setTimeout( () => {
        dispatch( clearErrorMessage() );
      }, 4000);
    }

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmited(true);

    dispatch( startCreatingUserWithEmailPassword(formState) );
  }

  return (
    
    <AuthLayouth title='Registro'>

        <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster" >
          <Grid container>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo"
                type="text"
                placeholder="Nombre"
                fullWidth
                name="displayName"
                value={ displayName }
                onChange={ onInputChange }
                error={ !!displayNameValid && formSubmited }
                helperText={ displayNameValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo electronico"
                type="email"
                placeholder="correo@google.com"
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
                error={ !!emailValid && formSubmited }
                helperText={ emailValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
                name="password"
                value={ password }
                onChange={ onInputChange }
                error={ !!passwordValid && formSubmited }
                helperText={ passwordValid }
              />
            </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }} >
              
              <Grid 
                item  
                xs={ 12 }
                display={ (!!errorMessage) ? '' : 'none' }>
                <Alert severity="error">{ errorMessage }</Alert>
              </Grid>

              <Grid 
                item  
                xs={ 12 }
                disabled={ isCheckingAuthentication }>
                <Button 
                  variant="contained" 
                  fullWidth 
                  type='submit'>
                  Crear cuenta
                </Button>
              </Grid>

            </Grid>

            <Grid container justifyContent="end">
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link to="/auth/login" color="inherit" component={ RouterDomLink }>
                Ingresar
              </Link>
            </Grid>

          </Grid>
        </form>
        
    </AuthLayouth>

  )
}
