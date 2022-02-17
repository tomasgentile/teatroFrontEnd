import '../styles/components/pages/Cartelera.css';
import Card from '../components/Card';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Cursos = (props) => {
    const [loadingCursos, setLoadingCursos] = useState(false);
    const [Cursos, setCursos] = useState([]);
    const [filteredData, setfilteredData] = useState([]);
    const [searchSelect, setsearchSelect] = useState('nombre_curso');

    useEffect(() => {
        const cargarDatos = async () => {
            setLoadingCursos(true);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cursos`);
            setCursos(response.data);
            setfilteredData(response.data);
            console.log('Datos cargados en cursos');
            console.log(response.data);
            setLoadingCursos(false);
        };
        cargarDatos();
    }, []);

    const selectedValue = (event) => {
        setsearchSelect(event.target.value);
    }

    const handleFilter = (event) => {
        const searchWord = event.target.value.toLowerCase();
        if (searchSelect === 'nombre_curso') {
            let dataFiltered = Cursos.filter((value) => {
                return value.nombre_curso.toLocaleLowerCase().includes(searchWord);
            });
            setfilteredData(dataFiltered);
        } else if (searchSelect === 'docentes') {
            let dataFiltered = Cursos.filter((value) => {
                return value.docentes.toLocaleLowerCase().includes(searchWord);
            });
            setfilteredData(dataFiltered);
        } else if (searchSelect === 'clasificacion') {
            let dataFiltered = Cursos.filter((value) => {
                return value.clasificacion.toLocaleLowerCase().includes(searchWord);
            });
            setfilteredData(dataFiltered);
        } else if (searchSelect === 'nombre_teatro') {
            let dataFiltered = Cursos.filter((value) => {
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
                    <option value="nombre_curso" label="Títulos"></option>
                    <option value="nombre_teatro" label="Teatros"></option>
                    <option value="docentes" label="Docentes"></option>
                    <option value="clasificacion" label="Clasificación"></option>
                </select>
                <input onChange={handleFilter} type="text" placeholder="Búsqueda..."></input>
            </div>

            {loadingCursos ? (
                <p>Cargando</p>
            ) : (
                <div className="cards">
                    {filteredData.map(element => {
                        return (
                            <Card
                                key={element.id_curso}
                                title={element.nombre_curso}
                                horario_funciones={element.horario}
                                img={element.imagen}
                                clasificacion={element.clasificacion}
                                resumen={element.resumen}
                                nombre_teatro={element.nombre_teatro}
                                docentes={element.docentes}
                                fecha_inicio={element.fecha_inicio}
                                fecha_fin={element.fecha_fin} />
                        )
                    })};
                </div>
            )}
        </main>
    );
}

export default Cursos;