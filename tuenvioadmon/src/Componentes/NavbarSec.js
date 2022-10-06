import React, { useEffect, useState } from 'react'
import BusquedaTable from './BusquedaTable';
import EstanteTable from './EstanteTable'
import InfoGTable from './InfoGTable';

//Este componente renderiza una barra de navegacion secundaria para separar la logica de los estantes.
const NavbarSec = () => {
    
    const [estanted, setestanted] = useState([]);
    const [estante1, setestante1] = useState([]);
    const [estante2, setestante2] = useState([]);
    const [estante3, setestante3] = useState([]);
    const [infoest, setinfoest] = useState([]);
    const [infoarea, setinfoarea] = useState([]);
  const loadestantes=async()=>{
    const estanted= await fetch('http://localhost:4000/estantes/estanted')
    const estante1= await fetch('http://localhost:4000/estantes/estante1')
    const estante2= await fetch('http://localhost:4000/estantes/estante2')
    const estante3= await fetch('http://localhost:4000/estantes/estante3')
    const infoest= await fetch('http://localhost:4000/paquetes/paquetes_cant')
    const infoarea= await fetch('http://localhost:4000/areas')
    const dataestante1= await estante1.json()
    const dataestante2= await estante2.json()
    const dataestante3= await estante3.json()
    const dataestanted= await estanted.json()
    const datainfoest= await infoest.json()
    const datainfoarea= await infoarea.json()
    setestanted(dataestanted)
    setestante1(dataestante1)
    setestante2(dataestante2)
    setestante3(dataestante3)
    setinfoest(datainfoest)
    setinfoarea(datainfoarea)
  }

  useEffect(() => {
    loadestantes();

  }, [])
    return (
        <div>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true"><strong>Estante1</strong></button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false"><strong>Estante2</strong></button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false"><strong>Estante3</strong></button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="estante-tab" data-bs-toggle="tab" data-bs-target="#estante-tab-pane" type="button" role="tab" aria-controls="estante-tab-pane" aria-selected="false"><strong>Donaciones</strong></button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="infog-tab" data-bs-toggle="tab" data-bs-target="#infog-tab-pane" type="button" role="tab" aria-controls="infog-tab-pane" aria-selected="false"><strong>Información general de los estantes y areas</strong> </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="busq-tab" data-bs-toggle="tab" data-bs-target="#busq-tab-pane" type="button" role="tab" aria-controls="busq-tab-pane" aria-selected="false"><strong>Efectuar Busqueda de paquete</strong> </button>
                </li>
            </ul>
            
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">{<EstanteTable estante={estante1}
                    estado={true}
                />}</div>
                <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">{<EstanteTable estante={estante2}
                estado={true}
                    

                />}</div>
                <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0">{<EstanteTable estante={estante3}
                    estado={true}

                />}</div>
                <div className="tab-pane fade" id="estante-tab-pane" role="tabpanel" aria-labelledby="estante-tab" tabIndex="0">{<EstanteTable estante={estanted}
                estado={false}
                

                />}</div>
                <div className="tab-pane fade" id="infog-tab-pane" role="tabpanel" aria-labelledby="infog-tab" tabIndex="0"><InfoGTable
                    estantes={infoest}
                    areas={infoarea}
                /></div>
                <div className="tab-pane fade" id="busq-tab-pane" role="tabpanel" aria-labelledby="busq-tab" tabIndex="0"><BusquedaTable/></div>
            </div>
            

        </div>
    )
}

export default NavbarSec