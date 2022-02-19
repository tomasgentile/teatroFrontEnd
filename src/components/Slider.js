import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../styles/components/layout/Slider.css';
import Modal from './Modal';
import axios from 'axios';

const Slider = () => {
    const [datosObras, setDatosObras] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentSlide, setCurrentSlide] = useState([]);
    const [modalSlider, setModalSlider] = useState(false);
    const [contador, setContador] = useState(0);

    useEffect(() => {
        setLoading(true);
        const cargarDatos = async () => {
            const responseObras = await axios.get(`${process.env.REACT_APP_API_URL}/api/obras`);
            setDatosObras(responseObras.data);
            setCurrentSlide(responseObras.data.slice(0, 1));
        }
        cargarDatos();
        setLoading(false);
        console.log('datos crgados en Slider');

    }, []);

    function change_img_right() {
        if (contador < (datosObras.length - 1)) {
            setContador(contador + 1);
            console.log(contador);
        } else {
            setContador(0);
            console.log(contador);
        }
        setCurrentSlide(datosObras.slice(contador, contador + 1));
        console.log(currentSlide);
    }

    function change_img_left() {
        if (contador === 0) {
            setContador(datosObras.length - 1);
            console.log(contador);
        } else {
            setContador(contador - 1);
            console.log(contador);
        }
        setCurrentSlide(datosObras.slice(contador, contador + 1));
        console.log(currentSlide);
    }

    function change_state() {
        setModalSlider(true);
    }

    return (
        <div className="holder">
            {loading ? (
                <p>Cargando</p>
            ) : (
                <div className="slider">
                    <button className="btn-slider" onClick={change_img_left}><FontAwesomeIcon icon={faChevronLeft} /></button>
                    
                    {currentSlide.map(slide =>
                        <>
                            <div className="img-info">
                                <img id="big_img" src={slide.imagen} alt="cartelera" />
                                <div className="info-slider">
                                    <h2>{slide.nombre_obra}</h2>
                                    <h3>{slide.nombre_teatro}</h3>
                                    <h3>{slide.horario_funciones}</h3>
                                    <button id="btn-abrir" onClick={change_state}>+ Información</button>
                                </div>
                            </div>
                            <Modal
                                estado={modalSlider}
                                cambiarEstado={setModalSlider}
                                titulo={slide.nombre_obra}
                                elenco={slide.elenco}
                                direccion={slide.direccion}
                                horario_funciones={slide.horario_funciones}
                                clasificacion={slide.clasificacion}
                                resumen={slide.resumen}
                                nombre_teatro={slide.nombre_teatro}
                                fecha_inicio={slide.fecha_inicio}
                                fecha_fin={slide.fecha_fin}
                                img={slide.imagen}>
                            </Modal>
                        </>
                    )}
                    <button className="btn-slider" onClick={change_img_right}><FontAwesomeIcon icon={faChevronRight} /></button>
                </div>
            )}


        </div>
    );
}

export default Slider;




