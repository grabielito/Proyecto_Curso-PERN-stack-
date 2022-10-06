import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'

const FormCliente = () => {
  const navigate=useNavigate();
  const params= useParams();
  const [editing, setediting] = useState(false)
  const [cliente, setcliente] = useState({
    ci:'',
    nombre:'',
    numtarj:'',
    direccion:''
  })

  const loadClient=async(id)=>{
   const res= await fetch(`http://localhost:4000/clientes/${id}`);
   const data= await res.json()
   setcliente({
    ci:data[0].ci,
    nombre:data[0].nombre,
    numtarj:data[0].numtarj,
    direccion:data[0].direccion
   })
setediting(true)
  }

  useEffect(() => {
    if (params.id) {
      loadClient(params.id);

    }
  }, [params.id])
  

  const handleChange=(e)=>{
    setcliente({...cliente,[e.target.name]:e.target.value})
  }
  const handlesubmit= async(e)=>{
    e.preventDefault(); 

    if(editing){
      await fetch(`http://localhost:4000/clientes/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ci: cliente.ci,
          nombre: cliente.nombre,
          numtarj: cliente.numtarj,
          direccion:cliente.direccion
        }),
        headers: { 'Content-type': 'application/json' }
      })
    } 
    else {
      await fetch('http://localhost:4000/clientes',{
        method:'POST',
        body:JSON.stringify({
          ci:cliente.ci,
          nombre:cliente.nombre,
          numtarj:cliente.numtarj,
          direccion:cliente.direccion
        }),
        headers:{'Content-type': 'application/json'}
      })
   
  } 
    
    navigate('/clientes')
  
  }
  
  return (
    <div className="bg-light" style={{ marginTop: 20, padding: 20 }}>

        <div className="h3">
        
          Formulario De Registro De Clientes
          <br />
          <form id="miFormulario"  >
            <div className="row" style={{ marginTop: 20 }}>
              <div className="col-6">
                <input name='ci' value={cliente.ci} onChange={handleChange} className="form-control form-control-lg text-center" type="number" placeholder="Digite El CI del cliente" required />
              </div>
  
              
              <div className="col-6">
                <input name='nombre' value={cliente.nombre} onChange={handleChange} className="form-control form-control-lg text-center" type="text" placeholder="Digite El nombre del cliente" required />
              </div>

              <div className="col-6" style={{marginTop:10}}>
                <input name='numtarj' value={cliente.numtarj} onChange={handleChange} className="form-control form-control-lg text-center" type="number" placeholder="Digite El numero de tarjeta" required />
              </div>

              <div className="col-6" style={{marginTop:10}}>
                <input name='direccion' value={cliente.direccion} onChange={handleChange} className="form-control form-control-lg text-center" type="text" placeholder="Digite la dirección" required />
              </div>
            </div>



            <div className="row" style={{ marginTop: 20 }}>
              <div className="col" >
                <center><button className="btn btn-primary btn-lg" onClick={handlesubmit}>Guardar Datos</button></center>
              </div>
            </div>
          </form>
        </div>

      </div>
  )
}

export default FormCliente