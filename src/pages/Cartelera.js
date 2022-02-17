import '../styles/components/pages/Cartelera.css';
import Card from '../components/Card';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Cartelera(props) {
    const [loadingObras, setLoadingObras] = useState(false);
    const [obrasCartelera, setObrasCartelera] = useState([]);
    const [filteredData, setfilteredData] = useState([]);
    const [searchSelect, setsearchSelect] = useState('nombre_obra');

    useEffect(() => {
        const cargarObras = async () => {
            setLoadingObras(true);
            const response = await axios.get('http://localhost:3000/api/obras');
            setObrasCartelera(response.data);
            setfilteredData(response.data)
            setLoadingObras(false);
            console.log('Datos cargados en Cartelera');
        }
        cargarObras();
    }, []);

    const selectedValue = (event) => {
        setsearchSelect(event.target.value);
    }

    const handleFilter = (event) => {
        console.log('render');
        const searchWord = event.target.value.toLowerCase();
        if (searchSelect === 'nombre_obra') {
            let dataFiltered = obrasCartelera.filter((value) => {
                return value.nombre_obra.toLocaleLowerCase().includes(searchWord);
            });
            setfilteredData(dataFiltered);
        } else if (searchSelect === 'direccion') {
            let dataFiltered = obrasCartelera.filter((value) => {
                return value.direccion.toLocaleLowerCase().includes(searchWord);
            });
            setfilteredData(dataFiltered);
        } else if (searchSelect === 'clasificacion') {
            let dataFiltered = obrasCartelera.filter((value) => {
                return value.clasificacion.toLocaleLowerCase().includes(searchWord);
            });
            setfilteredData(dataFiltered);
        } else if (searchSelect === 'nombre_teatro') {
            let dataFiltered = obrasCartelera.filter((value) => {
                return value.nombre_teatro.toLocaleLowerCase().includes(searchWord);
            });
            setfilteredData(dataFiltered);
        };
    };

    return (
        <main className="holder">
            <div className='search-container'>
                <FontAwesomeIcon icon={faSearch} className='search-icon' />
                <select onChange={selectedValue}>
                    <option value="nombre_obra" label="Títulos"></option>
                    <option value="nombre_teatro" label="Teatros"></option>
                    <option value="direccion" label="Dirección"></option>
                    <option value="clasificacion" label="Clasificación"></option>
                </select>
                <input onChange={handleFilter} type="text" placeholder="Búsqueda..." />
            </div>
            <section>
                {loadingObras ? (
                    <p>Cargando</p>
                ) : (
                    <div className="cards">
                        {filteredData.map(element => {
                            return (
                                <Card
                                    key={element.id_obra}
                                    title={element.nombre_obra}
                                    horario_funciones={element.horario_funciones}
                                    img={element.imagen}
                                    elenco={element.elenco}
                                    direccion={element.direccion}
                                    clasificacion={element.clasificacion}
                                    resumen={element.resumen}
                                    nombre_teatro={element.nombre_teatro}
                                    fecha_inicio={element.fecha_inicio}
                                    fecha_fin={element.fecha_fin} />
                            )
                        })};
                        ;
                    </div>
                )}
            </section>
        </main>
    );
}

export default Cartelera;