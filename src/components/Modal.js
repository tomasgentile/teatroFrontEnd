import React from 'react';
import '../styles/components/pages/Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import 'moment/locale/es';


const Modal = (props) => {
    const { estado, cambiarEstado, titulo, img, elenco, direccion, docentes, resumen, horario_funciones, clasificacion, nombre_teatro, fecha_inicio, fecha_fin } = props;

    function cierreModal() {
        cambiarEstado(false);
    }

    moment.locale('es')

    return (
        <section>
            {estado &&
                <div className='modal'>
                    <div className='modal-container'>
                        <div className='modal-title'>
                            <h2>{titulo}</h2>
                            <button id="btn-close" onClick={cierreModal}><FontAwesomeIcon icon={faTimesCircle} /></button>
                        </div>
                        <div className='modal-contenido'>
                            <img src={img} alt='imagen obra' />
                            <p>{resumen}</p>
                            <p>Teatro:  {nombre_teatro}</p>
                            {elenco ? (<p>Elenco:  {elenco}</p>) : null}
                            {docentes ? (<p>Docentes:  {docentes}</p>) : null}
                            {direccion ? (<p>Dirección:  {direccion}</p>) : null}
                            <p>Horario:  {horario_funciones}</p>
                            <p>Clasificación:  {clasificacion}</p>
                            <p>Inicia:  { moment(fecha_inicio).format("LL") }</p>
                            <p>Termina:  { moment(fecha_fin).format("LL") }</p>
                        </div>
                    </div>
                </div>
            }
        </section>
    );
}

export default Modal;