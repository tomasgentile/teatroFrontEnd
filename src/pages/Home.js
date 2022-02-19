import '../styles/components/pages/Home.css';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import useWindowSize from '../components/WindowSize';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from '../components/Slider';

const Home = (props) => {
    const [loadingDatos, setLoadingDatos] = useState(false);
    const [Obras, setObras] = useState([]);
    const [Cursos, setCursos] = useState([]);
    const [modal, setModal] = useState(false);
    const [cantidadCards, setCantidadCards] = useState(6);
    const { width } = useWindowSize();

    useEffect(() => {
        const cargarDatos = async () => {
            setLoadingDatos(true);
            const responseObras = await axios.get(`${process.env.REACT_APP_API_URL}/api/obras`);
            const responseCursos = await axios.get(`${process.env.REACT_APP_API_URL}/api/cursos`);

            // Calcula la cantidad de Cards a mostrar en funcion del ancho de la pantalla
            if (width < 1200 && width >= 1000) {
                setCantidadCards(5);
            } else if (width < 1000 && width >= 800) {
                setCantidadCards(4);
            } else {
                setCantidadCards(6);
            }
            
            setObras(responseObras.data.slice(0, cantidadCards)); 
            setCursos(responseCursos.data.slice(0, cantidadCards));
            console.log('Datos cargados en Home');
            setLoadingDatos(false);
        };
        cargarDatos();
    }, [cantidadCards, width]);

    return (
        <main className="holder">
            <Slider />
            <div>
                <div className="subtitles">
                    <h2>Cartelera</h2>
                    <Link to="pages/Cartelera">Ver más</Link>
                </div>
                <section className="cards-container">
                    {loadingDatos ? (
                        <p>Cargando</p>
                    ) : (
                        Obras.map(obra =>
                            <Card
                                key={obra.id_obra}
                                title={obra.nombre_obra}
                                horario_funciones={obra.horario_funciones}
                                img={obra.imagen}
                                elenco={obra.elenco}
                                direccion={obra.direccion}
                                clasificacion={obra.clasificacion}
                                resumen={obra.resumen}
                                nombre_teatro={obra.nombre_teatro}
                                estado={modal}
                                cambiarEstado={setModal}
                                fecha_inicio={obra.fecha_inicio}
                                fecha_fin={obra.fecha_fin}
                            />)
                    )}
                </section>
            </div>

            <div>
                <div className="subtitles">
                    <h2>Cursos</h2>
                    <Link to="pages/Cursos">Ver más</Link>
                </div>
                <section className="cards-container">
                    {loadingDatos ? (
                        <p>Cargando</p>
                    ) : (
                        Cursos.map(curso =>
                            <Card
                                key={curso.id_curso}
                                title={curso.nombre_curso}
                                nombre_teatro={curso.nombre_teatro}
                                docentes={curso.docentes}
                                resumen={curso.resumen}
                                horario_funciones={curso.horario}
                                clasificacion={curso.clasificacion}
                                img={curso.imagen}
                                estado={modal}
                                cambiarEstado={setModal}
                                fecha_inicio={curso.fecha_inicio}
                                fecha_fin={curso.fecha_fin}
                            />)
                    )}
                </section>
            </div>
        </main>
    );
}

export default Home;

