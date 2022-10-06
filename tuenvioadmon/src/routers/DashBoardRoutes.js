import React from 'react'
import { Routes,Route } from 'react-router-dom'

//Pages
import Navbar from '../Componentes/Navbar'
import Clientes from '../Pages/Clientes'
import Estantes from '../Pages/Estantes'
import Home from '../Pages/Home'
import Ordenes from '../Pages/Ordenes'
import Productos from '../Pages/Productos'
import Formulario from '../Componentes/FormProducto'

import FormCliente from '../Componentes/FormCliente'
import CompraForm from '../Componentes/FormCompra'
import FormEnvDon from '../Componentes/FormEnvDon'

const DashBoardRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='estantes/envdon/:id' element={<FormEnvDon/>} />
        <Route path='clienteform/:id/edit' element={<FormCliente/>} />
        <Route path='productoform/:id/edit' element={<Formulario/>} />
        <Route path='clienteform' element={<FormCliente/>}/>
        <Route path='compraform' element={<CompraForm/>}/>
        <Route path='productoform' element={<Formulario/>}/>
        <Route path='clientes' element={<Clientes />} />
        <Route path='productos' element={<Productos />} />
        <Route path='ordenes' element={<Ordenes />} />
        <Route path='estantes' element={<Estantes />} />
        <Route exact path='home' element={<Home />} />
      </Routes>
        
       


    </>
  )
}

export default DashBoardRoutes