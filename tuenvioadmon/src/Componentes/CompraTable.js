import React from 'react'
import { Button, IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { format,parseISO } from 'date-fns';
const CompraTable = () => {
    
    const navigate = useNavigate();
    const [compras, setcompras] = useState([]);
    const [search, setsearch] = useState("");
    const loadCompras = async () => {
        const response = await fetch('http://localhost:4000/compra')
        const data = await response.json()
        setcompras(data)
    }
    const searcher = (e) => {
        setsearch(e.target.value)
    }

    let ord = [];
    if (!search) {
        ord = compras
    }
    else {
        ord = compras.filter((compra) => compra.idcompra.includes(search))
    }

    useEffect(() => {
        loadCompras();

    }, [])
    const handleDelete = async (id) => {
        if (window.confirm(`Esta seguro de eliminar la compra con id de paquete ${id}, esta se eliminará de todo el sistema `)) {
            await fetch(`http://localhost:4000/compra/${id}`, {
                method: 'DELETE',
            })

            alert("Compra eliminada satisfactoriamente del sistema")
            setcompras(compras.filter((compra)=>compra.codpaq!==id))
        }
    }
    return (
        <>
            <form className="d-flex" role="search">
                <input value={search} onChange={searcher} className="form-control me-2" type="search" placeholder="Digite el id de la compra" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">IdCompra</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Producto</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">CI</th>
                        <th scope="col">CodPaquete</th>
                        <th scope="col"><Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/compraform')}>
                            Agregar Compra
                        </Button></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ord.map((compra, index) =>
                            <tr key={index}>
                                <th scope="row">{compra.idcompra}</th>
                                <td>{format(parseISO(compra.fecha),'dd-MM-yyyy')}</td>
                                <td>{compra.nombreprod}</td>
                                <td>{compra.cantprod}</td>
                                <td>{compra.nombre}</td>
                                <td>{compra.ci}</td>
                                <td>{compra.codpaq}</td>

                                <td>
                                    <Stack direction="row" spacing={1}>
                                      
                                        <Button variant="contained" onClick={() => handleDelete(compra.codpaq)} color='warning' startIcon={<DeleteIcon />}>
                                            Eliminar
                                        </Button>
                                    </Stack>
                                </td>
                            </tr>)
                    }

                </tbody>
            </table>
        </>
    )
}

export default CompraTable