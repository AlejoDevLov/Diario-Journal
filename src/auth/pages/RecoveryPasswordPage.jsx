import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, Button, Link, Alert } from "@mui/material"
import { Link as RouterDomLink } from "react-router-dom";
import { AuthLayouth } from "../layout/AuthLayouth";
import { startRecoveryPassword } from "../../store/auth/thunks";
import { useForm } from "../../hooks/useForm";
import { clearErrorMessage } from "../../store/auth/authSlice";


const formData = {
  email: '',
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe tener un @' ],
}

export const RecoveryPasswordPage = () => {

  const dispatch = useDispatch();

  const { errorMessage, confirmEmail } = useSelector( state => state.auth );

  const [formSubmited, setFormSubmited] = useState(false);

  const {
    onInputChange, email,
     emailValid,
    } = useForm(formData, formValidations);

    if ( !!errorMessage || !!confirmEmail ) {
      setTimeout( () => {
        dispatch( clearErrorMessage() );
      }, 4000);
    }
    
  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmited(true);

    dispatch( startRecoveryPassword( email ) );

    setFormSubmited(false);
  }

  return (
    
    <AuthLayouth title='Recuperar contraseña'>

        <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster" >
          <Grid container>

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
                display={ (!!confirmEmail) ? '' : 'none' }>
                <Alert severity="success">{ confirmEmail }</Alert>
              </Grid>

              <Grid 
                item  
                xs={ 12 }
                >
                <Button 
                    disabled={ formSubmited || !!emailValid }
                    variant="contained" 
                    fullWidth 
                    type='submit'>
                    Enviar
                </Button>
              </Grid>

            </Grid>

            <Grid container justifyContent="end">
              <Link to="/auth/login" color="inherit" component={ RouterDomLink }>
                Ingresar
              </Link>
            </Grid>

          </Grid>
        </form>
        
    </AuthLayouth>

  )
}
