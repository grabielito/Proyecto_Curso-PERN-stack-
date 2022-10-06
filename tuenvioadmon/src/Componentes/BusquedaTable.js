import React from 'react'
import { useEffect, useState } from 'react'
const BusquedaTable = () => {
    
    const [estantes, setestantes] = useState([]);
    const [search, setsearch] = useState("");
  const loadEstantes=async()=>{
    const response= await fetch('http://localhost:4000/estantes/allestantes')
    const data= await response.json()
    setestantes(data)
  }

  const searcher=(e)=>{
    setsearch(e.target.value)
}
let est=[];
if(!search){
est= estantes
}
else{
est=estantes.filter((estante)=>estante.codpaq.includes(search))
}
  useEffect(() => {
    loadEstantes();

  }, [])
    return (
        <>
    <form className="d-flex" role="search">
                <input value={search} onChange={searcher} className="form-control me-2" type="search" placeholder="Digite el codigo del paquete" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Estante</th>
                        <th scope="col">Area</th>
                        <th scope="col">Codigo del paquete</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        est.map((estante, index) =>
                            <tr key={index}>
                                <th scope="row">{estante.idestante}</th>
                                <td>{estante.idarea}</td>
                                <td>{estante.codpaq}</td>
                              
                            </tr>)
                    }

                </tbody>
            </table>

        </>
  )
}

export default BusquedaTable