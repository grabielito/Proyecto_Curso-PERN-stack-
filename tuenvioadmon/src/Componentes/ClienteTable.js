import { Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
const ClienteTable = () => {
    const navigate = useNavigate();
    const [clientes, setclientes] = useState([]);
    const [search, setsearch] = useState("");
  const loadClientes=async()=>{
    const response= await fetch('http://localhost:4000/clientes')
    const data= await response.json()
    setclientes(data)
  }

  const searcher=(e)=>{
    setsearch(e.target.value)
}
let clie=[];
if(!search){
clie= clientes
}
else{
clie=clientes.filter((cliente)=>cliente.ci.includes(search))
}
  useEffect(() => {
    loadClientes();

  }, [])
    const handleDelete=async(ci,nombre)=>{
        if(window.confirm(`Esta seguro de eliminar al cliente ${nombre}`)){
        await fetch(`http://localhost:4000/clientes/${ci}`,{
            method:'DELETE',
        })
        
        alert("Cliente eliminado satisfactoriamente del sistema")
        setclientes(clientes.filter((cliente)=>cliente.ci!==ci))
    }
    }
    return (
        <>
        <form className="d-flex" role="search">
                <input value={search} onChange={searcher} className="form-control me-2" type="search" placeholder="Digite el ci del cliente" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">CI</th>
                        <th scope="col">Nombre cliente</th>
                        <th scope="col">#tarjeta</th>
                        <th scope="col">Dirección</th>
                        <th scope="col"><Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/clienteform')}>
                            Agregar Cliente
                        </Button></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clie.map((cliente, index) =>
                            <tr key={index}>
                                <th scope="row">{cliente.ci}</th>
                                <td>{cliente.nombre}</td>
                                <td>{cliente.numtarj}</td>
                                <td>{cliente.direccion}</td>

                                <td>  <Stack direction="row" spacing={1}>
                                    <Button onClick={()=>navigate(`/clienteform/${cliente.ci}/edit`)} variant="contained" startIcon={<EditIcon />}>
                                        Editar
                                    </Button>
                                    <Button variant="contained" onClick={()=>handleDelete(cliente.ci,cliente.nombre)} color='warning' startIcon={<DeleteIcon />}>
                                        Eliminar
                                    </Button>
                                </Stack></td>
                            </tr>)
                    }

                </tbody>
            </table>

        </>
    )
}

export default ClienteTable