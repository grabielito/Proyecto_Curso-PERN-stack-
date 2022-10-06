import React, { useState, useContext } from 'react';

//Material UI Components
import { Button, Stack } from '@mui/material';
import { Home, Login } from '@mui/icons-material';
import GridViewIcon from '@mui/icons-material/GridView';
import GroupsIcon from '@mui/icons-material/Groups';
import GridOnIcon from '@mui/icons-material/GridOn';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

//React Router DOM
import {useNavigate} from "react-router-dom";

//Pages
import NavbarStyle from '../Estilos/NavbarStyle.css'
import { AuthContext } from '../auth/authContext';
import { types } from '../types/types';




//Componente de navegación principal de la aplicación
const Navbar = () => {
  const navigate = useNavigate();
  const {dispatch} = useContext(AuthContext);
  function cerrarSesion() {
    if (window.confirm("Esta seguro que desea cerrar la sesion?")) {
      dispatch({type: types.logout})
      navigate("/", {
        replace: true}
        );

    }

  }

  return (
    <div>


      <nav className='navbar-dark  navbar bg-dark' id='navbar'>
        <div className="container">
          <h1 className='bg-light maintitle '>TuEnvio Admin</h1>

          <div className='iconos-contenedor'>
            <Stack direction="row" spacing={1}>
              <Button variant='contained' startIcon={<Home />} onClick={() => navigate('/home')}>Home</Button>
              <Button variant='outlined' startIcon={<GridViewIcon />} onClick={() => navigate('/productos')}>Productos</Button>
              <Button variant='outlined' startIcon={<GroupsIcon />} onClick={() => navigate('/clientes')}>Clientes</Button>
              <Button variant='outlined' startIcon={<AddShoppingCartIcon />} onClick={() => navigate('/ordenes')} >Ordenes</Button>
              <Button variant='outlined' startIcon={<GridOnIcon />} onClick={() => navigate('/estantes')} >Estantes</Button>
            </Stack>

            <div className='loggin-contenedor'>

              <Button variant='outlined' endIcon={<ArrowForwardIcon />} onClick={cerrarSesion}>Salir</Button>

            </div>
          </div>


        </div>
      </nav>




    </div>


  )
}

export default Navbar