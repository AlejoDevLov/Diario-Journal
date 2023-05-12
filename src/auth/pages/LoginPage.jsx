import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterDomLink } from "react-router-dom";
import { Grid, Typography, TextField, Button, Link, Alert } from "@mui/material"
import Google from "@mui/icons-material/Google";
import { AuthLayouth } from "../layout/AuthLayouth";
import { checkingAutentication, startGoogleSignIn, startLoginWithEmailAndPassword } from "../../store/auth/thunks";
import { useForm } from "../../hooks/useForm";
import { clearErrorMessage } from "../../store/auth/authSlice";


const formState = {
  email: '',
  password: '',
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector( (state) => state.auth );

  const isAuthenticating = useMemo( () => status === 'checking', [status] );

  const { email, password, onInputChange } = useForm( formState );

  const dispatch = useDispatch();

  if ( !!errorMessage ) {
    setTimeout( () => {
      dispatch( clearErrorMessage() );
    }, 4000);
  }

  const onSubmit = event => {
      event.preventDefault();
      // dispatch( checkingAutentication() );
      dispatch( startLoginWithEmailAndPassword({email, password}) );
  }

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() );
  }


  return (
    
    <AuthLayouth title='Login'>

        <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster" >
          <Grid container>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="correo"
                type="email"
                name="email"
                value={ email }
                placeholder="correo@google.com"
                fullWidth
                onChange={ onInputChange }
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
              />
            </Grid>

            <Grid 
                item  
                xs={ 12 }
                sx={{ mt: 2 }}
                display={ (!!errorMessage) ? '' : 'none' }>
                <Alert severity="error">{ errorMessage }</Alert>
              </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }} >
              <Grid item  xs={ 12 } sm={ 6 } >
                <Button 
                  type="submit" 
                  variant="contained" 
                  fullWidth 
                  disabled={ isAuthenticating }>
                  Login
                </Button>
              </Grid>

              <Grid item  xs={ 12 } sm={ 6 } >
                <Button 
                  onClick={ onGoogleSignIn } 
                  variant="contained" 
                  fullWidth 
                  disabled={ isAuthenticating }>
                  <Google />
                    <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container justifyContent="space-between">
              <Link to="/auth/recovery" color="inherit" component={ RouterDomLink }>
                Olvidé mi contraseña
              </Link>
              <Link to="/auth/register" color="inherit" component={ RouterDomLink }>
                Crear Cuenta
              </Link>
            </Grid>

          </Grid>
        </form>
        
    </AuthLayouth>

  )
}
