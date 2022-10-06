import React from 'react'
import Footer from '../Componentes/Footer'
import Homeimage from '../Imagenes/Home.png'

//Este componente renderiza una interfaz estatica la cual vendria siendo como una seccion about de una pagina, solo es para mostrar informacion sobre la pagina al usuario y dar un poco mas de estilo al sitio
const Home = () => {
  return (
    <div>
      
      <div className='image-cont' >
        <img alt='home' className='img-fluid' src={Homeimage} style={{ width: 1355, height: 370 }}></img>
      </div>
      <Footer />
    </div>
  )
}

export default Home