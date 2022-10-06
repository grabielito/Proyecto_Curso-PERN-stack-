import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

const FormEnvDon = () => {
  const navigate=useNavigate();
  const params=useParams();
 const [area, setarea] = useState({area:''})


  const sendDonaciones=async(e)=>{
    e.preventDefault(); 
     await fetch(`http://localhost:4000/estantes/${params.id}`,{
       method: 'PUT',
       body: JSON.stringify({
         idarea:area.area
       }),
       headers: { 'Content-type': 'application/json' }
     })
    
    navigate('/estantes')
  }
  
  const handleChange = (e) => {

    setarea({ ...area, [e.target.name]: e.target.value })
  }

  
  return (
    <div className="bg-light" style={{ marginTop: 20, padding: 20 }}>

      <div className="h3">

        Envio a donaciones del paquete {params.id}
        <br />
        <form id="miFormulario"  >
          <div className="row" style={{ marginTop: 20 }}>
            

            <div className="col-6" style={{marginTop:10}}>
                <select name='area' value={area.area} onChange={handleChange} id='select' className="form-select form-select-lg text-center" required  >
                  <option value="">Seleccione el area </option>
                  <option value="d1">d1</option>
                  <option value="d2">d2</option>
                  <option value="d3">d3</option>
                  
                </select>
              </div>
             
          </div>



          <div className="row" style={{ marginTop: 20 }}>
            <div className="col" >
              <center><button onClick={sendDonaciones} className="btn btn-primary btn-lg">Enviar a donaciones</button></center>
            </div>
          </div>
        </form>
      </div>

    </div>
  )
}

export default FormEnvDon