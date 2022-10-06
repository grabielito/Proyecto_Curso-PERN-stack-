import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const CompraForm = () => {

  const navigate=useNavigate();
  const [compra, setcompra] = useState({
    codpaq:'',
    tamano:'',
    idarea:'',
    idcompra:'',
    cantprod:'',
    fecha:'',
    ci:'',
    idprod:'',
    idestante:''
  })

  const handleChange=(e)=>{
    setcompra({...compra,[e.target.name]:e.target.value})
  }
  const handlesubmit= async(e)=>{
    e.preventDefault(); 
    try {
      await fetch('http://localhost:4000/compra',{
        method:'POST',
        body:JSON.stringify({
          codpaq:compra.codpaq,
          tamano:compra.tamano,
          idarea:compra.idarea,
          idcompra:compra.idcompra,
          cantprod:compra.cantprod,
          fecha:compra.fecha,
          ci:compra.ci,
          idprod:compra.idprod,
          idestante:compra.idestante
        
        }),
        headers:{'Content-type': 'application/json'}
  
    }).then(navigate('/ordenes'))
    } catch (error) {
      console.log(error)
    }
   
  
  }
  return (
    <div className="bg-light" style={{ marginTop: 20, padding: 20 }}>

      <div className="h3">

        Formulario De Registro De Compras
        <br />
        <form id="miFormulario"  >
          <div className="row" style={{ marginTop: 20 }}>
            <div className="col-6">
              <input name='codpaq' onChange={handleChange} className="form-control form-control-lg text-center" type="number" placeholder="Digite El Codigo de paquete" required />
            </div>


            <div className="col-6">
              <input name='tamano' onChange={handleChange} className="form-control form-control-lg text-center" type="text" placeholder="Digite El tamaño del paquete" required />
            </div>

            <div className="col-6" style={{marginTop:10}}>
                <select name='idestante' onChange={handleChange} id='select' className="form-select form-select-lg text-center" required  >
                  <option value="">Seleccione el estante </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="d">Donaciones</option>
                </select>
              </div>
              <div className="col-6" style={{marginTop:10}}>
                <select name='idarea' onChange={handleChange} id='select' className="form-select form-select-lg text-center" required  >
                  <option value="">Seleccione el are del estante </option>
                  <option value="11">Area 11-Estante1</option>
                  <option value="12">Area 12-Estante1</option>
                  <option value="21">Area 21-Estante2</option>
                  <option value="22">Area 22-Estante2</option>
                  <option value="31">Area 31-Estante3</option>
                  <option value="32">Area 32-Estante3</option>
                  <option value="d1">Area d1-Estante de Donaciones</option>
                  <option value="d2">Area d2-Estante de Donaciones</option>
                  <option value="d3">Area d3-Estante de Donaciones</option>
                </select>
              </div>
            
      
            <div className="col-6" style={{ marginTop: 10 }}>
              <input name='idcompra' onChange={handleChange} className="form-control form-control-lg text-center" type="number" placeholder="Digite El id de la compra" required />
            </div>

            <div className="col-6" style={{ marginTop: 10 }}>
              <input name='cantprod' onChange={handleChange} className="form-control form-control-lg text-center" type="text" placeholder="Digite la cantidad de productos" required />
            </div>

            <div className="col-6" style={{ marginTop: 10 }}>
              <input name='idprod' onChange={handleChange} className="form-control form-control-lg text-center" type="number" placeholder="Digite el id del producto" required />
            </div>

            <div className="col-6" style={{ marginTop: 10 }}>
              <input name='fecha' onChange={handleChange} className="form-control form-control-lg text-center" type="date" placeholder="Digite la fecha" required />
            </div>

            <div className="col-6" style={{ marginTop: 10 }}>
              <input name='ci' onChange={handleChange} className="form-control form-control-lg text-center" type="number" placeholder="Digite el CI del cliente" required />
            </div>

          </div>



          <div className="row" style={{ marginTop: 20 }}>
            <div className="col" >
              <center><button onClick={handlesubmit} className="btn btn-primary btn-lg">Guardar Datos</button></center>
            </div>
          </div>
        </form>
      </div>

    </div>
  )
}

export default CompraForm