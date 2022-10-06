import React, { useState } from 'react'

const InfoGTable = ({estantes=[],areas=[]}) => {
    const [paqtam, setpaqtam] = useState([])
     const [search, setsearch] = useState("");
    const getPaqTam=async(e)=>{
        e.preventDefault();
        try {
            const response= await fetch(`http://localhost:4000/estantes/paquetes/${search}`)
            const data= await response.json()
            setpaqtam(data)
            console.log(data)  
        } catch (error) {
            console.log(error)
        }
        
    }
     const searcher=(e)=>{
         setsearch(e.target.value)
     }
  return (
    <>
<table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Estante</th>
                        <th scope="col">Cantidad de paquetes</th>
                        <th scope="col">Capacidad Total</th>
                        <th scope="col" >Cantidad de paquetes de determinado tamaño <form><input value={search} id='valor' onChange={searcher} type={'number'}></input><button
                       onClick={getPaqTam}>Buscar</button></form>
                      <p>La cantidad es: {paqtam}</p></th>
                                    
                    </tr>
                </thead>
                <tbody>
                    {
                        estantes.map((estante,index) =>
                            <tr key={index}>
                                <th scope="row">{estante.idestante}</th>
                                <td>{estante.cantpaquetes}</td>
                                <td>{estante.totalpaq}</td>
                              
                            </tr>)
                    }

                </tbody>
            </table>  
<hr/>
            <table className="table table-striped">
                <thead>
                    <tr>
                       
                        <th scope="col">Areas</th>
                        <th scope="col">Cantidad de paquetes</th>
                        <th scope="col">Capacidad Total</th>
                        <th scope="col">Rangos de Tamaño</th>
                        <th scope="col">Estante perteneciente</th>
                                    
                    </tr>
                </thead>
                <tbody>
                    {
                        areas.map((area,index) =>
                            <tr key={index}>
                                <th scope="row">{area.idarea}</th>
                                <td>{area.cantidaddepaq}</td>
                                <td>{area.cantpaq}</td>
                                <td>{area.rangptam}</td>
                                <td>{area.idestante}</td>
                        
                                

                                
                            </tr>)
                    }

                </tbody>
            </table>  

    </>
  )
}

export default InfoGTable