import React, { useContext, useState } from 'react'
//Pages
import Footer from '../Componentes/Footer'
import HomeSlideShow from '../Componentes/HomeSlideShow.js'

//React Router DOM
import { useNavigate } from 'react-router-dom'
//Material UI Components
import { Button } from '@mui/material'
import { AuthContext } from '../auth/authContext'
import { types } from '../types/types'

//Este es el primer componente que renderizara la SPA al acceder el usuario, al ser este la pagina principal de autenticacion,en el se ha trabajado para guardar los datos de autenticacion de manera global en el local storage, con lo cual garantizamos rutas privadas, garantizando que si el usuario no se encuentra autenticado no podra acceder a ninguna de las rutas aunque disponga de sus url.



const Login = () => {
  const {dispatch}= useContext(AuthContext);
  const navigate= useNavigate();

   const [user, setuser] = useState("");
   const [pass, setpass] = useState("");

   function iniciarSesion(e) {
   e.preventDefault();

   var user = document.getElementById("txtusu");
   var pass = document.getElementById("txtpas");
   if (user.value.length === 0 || pass.value.length === 0) {
     alert("Complete los datos faltantes!!")
     document.getElementById('txtusu').value = "";
     document.getElementById('txtpas').value = "";
     document.getElementById('txtusu').focus();
   }

   else if (user.value === "admin" && pass.value === "123") {
    const action={
      type: types.login,
      payload: { name: "Grabiel"}

    }
    dispatch(action);
     navigate("home",{
      replace: true
     });
    }
    else {
      alert("Error de usuario o contraseña");
      document.getElementById('txtusu').value = "";
      document.getElementById('txtpas').value = "";
      document.getElementById('txtusu').focus();
    }}



  return (



    <div>
      
        <div id='main-cont'>
          <HomeSlideShow/>
          <div className="container" style={{ background: "lightgray", marginTop: 0,minWidth:1366, height:250 }} >

            <form id="form_login" >
              <center><div>
                <h2 style={{ color: "blue", textalign: "center" }}>Bienvenido!</h2>
                <label htmlFor="txtusu"><strong>Nombre de usuario</strong></label>
                <input type="text" autoFocus id="txtusu" style={{ textAlign: "center", width: 300 }} className="form-control" onChange={(e) => setuser(e.target.value)} required />
              </div>
                <div>
                  <label htmlFor="txtpas"><strong>Contraseña</strong></label>
                  <input type="password" id="txtpas" style={{ textAlign: "center", width: 300 }} className="form-control" onChange={(e) => setpass(e.target.value)} required />
                </div>
                <br style={{ marginBottom: 0 }} />
                <Button variant='contained' type='submit'  style={{ marginTop: 0 }} onClick={iniciarSesion}>Entrar</Button></center>

            </form>


          </div>
          <Footer />
        </div>
      
    </div>


  )
}
   
export default Login