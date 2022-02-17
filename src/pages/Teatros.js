import '../styles/components/pages/Teatros.css';
import TeatroCard from '../components/TeatroCard';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Teatros = (props) => {
    const [loadingTeatros, setLoadingTeatros] = useState(false);
    const [TeatrosDatos, setTeatrosDatos] = useState([]);

    useEffect(() => {
        const cargarTeatros = async () => {
            setLoadingTeatros(true);
            const response = await axios.get('http://localhost:3000/api/teatros');
            setTeatrosDatos(response.data);
            setLoadingTeatros(false);
        };
        cargarTeatros();
        console.log('Teatros cargados');
    }, []);


    return (
        <main className="holder">
            <div className='teatros'>
                <section>
                    {loadingTeatros ? (
                        <p>Cargando</p>
                    ) : (
                        TeatrosDatos.map(teatro =>
                            <TeatroCard
                                key={teatro.id_teatro}
                                nombre={teatro.nombre_teatro}
                                direccion={teatro.direccion}
                                telefono={teatro.telefono}
                                mail={teatro.mail}
                                img={teatro.imagen} />
                        )
                    )}
                </section>
            </div>
        </main>
    );
}

export default Teatros;