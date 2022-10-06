import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Formulario = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [producto, setproducto] = useState({
    id: '',
    nombre: '',
    precio: ''
  });
  const [editing, setediting] = useState(false)

  const loadProducto = async (id) => {
    const res = await fetch(`http://localhost:4000/producto/${id}`);
    const data = await res.json()
    setproducto({
      id: data[0].idprod,
      nombre: data[0].nombreprod,
      precio: data[0].precio
    })
    setediting(true)
  }
  useEffect(() => {
    if (params.id) {
      loadProducto(params.id);

    }

  }, [params.id])

  const handleChange = (e) => {

    setproducto({ ...producto, [e.target.name]: e.target.value })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) { 
      await fetch(`http://localhost:4000/productos/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          idprod: producto.id,
          nombreprod: producto.nombre,
          precio: producto.precio
        }),
        headers: { 'Content-type': 'application/json' }
      })
    }
    else {
     await fetch('http://localhost:4000/productos', {
        method: 'POST',
        body: JSON.stringify({
          idprod: producto.id,
          nombreprod: producto.nombre,
          precio: producto.precio
        }),
        headers: { 'Content-type': 'application/json' }
      })

      
    }
    navigate('/productos')
  }



  return (
    <div className="bg-light" style={{ marginTop: 20, padding: 20 }}>

      <div className="h3">

        Formulario De Registro De Productos
        <br />
        <form id="miFormulario"  >
          <div className="row" style={{ marginTop: 20 }}>
            <div className="col-6">
              <input name='id' value={producto.id} onChange={handleChange} id='id' className="form-control form-control-lg text-center" type="number" placeholder="Digite El ID del producto" required />
            </div>
            <div className="col-6">
              <input name='nombre' value={producto.nombre} onChange={handleChange} id='nombre' className="form-control form-control-lg text-center" type="text" placeholder="Digite El nombre del producto" required />
            </div>
            <div className="col-6" style={{ marginTop: 10 }}>
              <input name='precio' value={producto.precio} onChange={handleChange} id='precio' className="form-control form-control-lg text-center" type="number" placeholder="Digite El precio del producto" required />
            </div>
          </div>



          <div className="row" style={{ marginTop: 20 }}>
            <div className="col" >
              <center><button className="btn btn-primary btn-lg" onClick={handleSubmit}>Guardar Datos</button></center>
            </div>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Formulario