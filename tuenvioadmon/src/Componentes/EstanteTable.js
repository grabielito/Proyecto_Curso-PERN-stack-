import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { format,parseISO} from 'date-fns';

const EstanteTable = ({ estante = [],estado }) => {
const navigate=useNavigate();
    //TODO:implementar esta logica con props
    const handleDelete=async(id)=>{
        if(window.confirm(`Esta seguro de eliminar el paquete ${id}, al eliminar el paquete elimina a su vez todas las compras del mismo`)){
        await fetch(`http://localhost:4000/compra/${id}`,{
            method:'DELETE',
        })
        
        alert("Paquete eliminado satisfactoriamente del sistema")
        window.location.reload();
    }
    }
    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>

                        <th scope="col">Area</th>
                        <th scope="col">Codigo de paquete</th>
                        <th scope="col">Tamaño de paquete</th>
                        <th scope="col">Fecha de compra</th>
                        <th scope="col">CI cliente</th>
                        <th scope="col">Nombre cliente</th>
                        <th scope="col">Dirección</th>

                    </tr>
                </thead>
                <tbody>
        
                    {
                        estante.map((est,index) =>
                            <tr key={index}>
                                <th scope="row">{est.idarea}</th>
                                <td>{est.codpaq}</td>
                                <td>{est.tamaño}</td>
                                <td>{format(parseISO(est.fecha),'dd-MM-yyyy')}</td>
                                <td>{est.ci}</td>
                                <td>{est.nombre}</td>
                                <td>{est.direccion}</td>


                                <td><IconButton onClick={()=>handleDelete(est.codpaq)} color='warning' aria-label="delete">
                                    <DeleteIcon color='secundary' />
                                </IconButton></td>
                        
                                <td>{
                                 estado && <Button onClick={()=>navigate(`/estantes/envdon/${est.codpaq}`)} variant="contained" endIcon={<SendIcon />}>
                                    Donaciones
                                </Button>}

                                </td>

                            </tr>)
                    }

                </tbody>
            </table>

        </>
    )
}

export default EstanteTable