import React, { useEffect, useState } from 'react'
import { Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate} from "react-router-dom";
const ProductosTable = () => {
    const navigate = useNavigate();
    const [productos, setproductos] = useState([]);
    const [search, setsearch] = useState("");
    const loadProductos=async()=>{
      const response= await fetch('http://localhost:4000/productos')
      const data= await response.json()
      setproductos(data)
    }
  
    const searcher=(e)=>{
        setsearch(e.target.value)
    }
    let prod=[];
if(!search){
   prod= productos
}
else{
    prod=productos.filter((producto)=>producto.nombreprod.includes(search))
}
    useEffect(() => {
      loadProductos();
  
    }, [])
    
    const handleDelete=async(id,nombre)=>{
        if(window.confirm(`Esta seguro de eliminar el producto ${nombre}`)){
        await fetch(`http://localhost:4000/productos/${id}`,{
            method:'DELETE',
        })
        
        alert("Producto eliminado satisfactoriamente del sistema")
        setproductos(productos.filter((producto)=>producto.idprod!==id))
    }
    }

    return (
        <div>
         <form className="d-flex" role="search">
                <input value={search} onChange={searcher} className="form-control me-2" type="search" placeholder="Digite el nombre del producto deseado" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Codigo de producto</th>
                        <th scope="col">Nombre de producto</th>
                        <th scope="col">Precio en MLC</th>
                        <th scope="col"><Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/productoform')}>
                            Agregar Producto
                        </Button></th>

                    </tr>
                </thead>
                <tbody>
                    {prod.map((producto, index) => (
                        <tr key={index}>
                            <th scope="row">{producto.idprod}</th>
                            <td>{producto.nombreprod}</td>
                            <td>{producto.precio}</td>
                            <td>
                                <Stack direction="row" spacing={1}>
                                    <Button onClick={()=>navigate(`/productoform/${producto.idprod}/edit`)} variant="contained" startIcon={<EditIcon />}>
                                        Editar
                                    </Button>
                                    <Button variant="contained" onClick={()=>handleDelete(producto.idprod,producto.nombreprod)} color='warning' startIcon={<DeleteIcon />}>
                                        Eliminar
                                    </Button>
                                </Stack>
                            </td>
                        </tr>
                    ))

                    }

                </tbody>
            </table>
        </div>
    )
}

export default ProductosTable