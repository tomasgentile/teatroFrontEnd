import '../styles/components/layout/Card.css';
import Modal from './Modal';
import { useState } from 'react';

const Card = (props) => {
    const { title, horario_funciones, img, elenco, direccion, clasificacion, resumen, nombre_teatro, docentes, fecha_inicio, fecha_fin } = props;
    const [modalCard, setModalCard] = useState(false);

    function change_state() {
        setModalCard(true);
    }
    console.log('render card');

    return (
        <main>
            <div className="card">
                <img src={img} alt="img obra" />
                <button id="btn-open" onClick={change_state}>+ Información</button>
                <h3>{title}</h3>
                <p>{horario_funciones}</p>
            </div>
            <Modal
                estado={modalCard}
                cambiarEstado={setModalCard}
                titulo={title}
                elenco={elenco}
                direccion={direccion}
                docentes={docentes}
                horario_funciones={horario_funciones}
                clasificacion={clasificacion}
                resumen={resumen}
                img={img}
                nombre_teatro={nombre_teatro}
                fecha_inicio={fecha_inicio}
                fecha_fin={fecha_fin}>
            </Modal>
        </main>
    );
}

export default Card;