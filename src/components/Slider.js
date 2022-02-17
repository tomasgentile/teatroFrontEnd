import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../styles/components/layout/Slider.css';
import Modal from './Modal';

const Slider = ({ datosObras }) => {
    const [currentSlide, setCurrentSlide] = useState(datosObras[0].imagen);
    const [modalSlider, setModalSlider] = useState(false);
    var contador = 0;
    const incrementar = () => {
        contador++;
    }

    const restar = () => {
        contador--;
    }

    function change_img_right() {
        if (contador < (datosObras.length - 1)) {
            incrementar();
        } else {
            contador = 0;
        }
        setCurrentSlide(datosObras[contador].imagen);
    }

    function change_img_left() {
        if (contador === 0) {
            contador = datosObras.length - 1;
        } else {
            restar();
        }
        setCurrentSlide(datosObras[contador].imagen);
    }

    function change_state() {
        setModalSlider(true);
    }

    return (
        <section className="holder">
            <div className="slider">
                <button className="btn-slider" onClick={change_img_left}><FontAwesomeIcon icon={faChevronLeft} /></button>
                <img id="big_img" src={currentSlide} alt="cartelera" />
                <button id="btn-abrir" onClick={change_state}>+ Información</button>
                <button className="btn-slider" onClick={change_img_right}><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
            {<Modal
                estado={modalSlider}
                cambiarEstado={setModalSlider}
                titulo={datosObras[contador].nombre_obra}
                elenco={datosObras[contador].elenco}
                direccion={datosObras[contador].direccion}
                horario_funciones={datosObras[contador].horario_funciones}
                clasificacion={datosObras[contador].clasificacion}
                resumen={datosObras[contador].resumen}
                img={datosObras[contador].imagen}>
            </Modal>}
        </section>
    );
}

export default Slider;




