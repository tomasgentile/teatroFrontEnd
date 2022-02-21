import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../styles/components/layout/HomeSlider.css';
import axios from 'axios';
import Slider from 'react-slick';

const HomeSlider = (props) => {

    const [datosObras, setDatosObras] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        setLoading(true);
        const cargarDatosSlider = async () => {
            const responseObras = await axios.get(`${process.env.REACT_APP_API_URL}/api/obras`);
            setDatosObras(responseObras.data);
        }
        cargarDatosSlider();
        setLoading(false);
        console.log('Datos crgados en Slider');
    }, []);

    const NextArrow = ({ onClick }) => {
        return (
            <button className="btn-slider next" onClick={onClick}>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        );
    };

    const PrevArrow = ({ onClick }) => {
        return (
            <button className="btn-slider prev" onClick={onClick}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
        );
    };

    const settings = {
        infinite: true,
        lazyLoad: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        centerPadding: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current, next) => setImageIndex(next),
    }

    return (
        <div className="holder">
            {loading ? (
                <p>Cargando</p>
            ) : (
                <div>
                    <Slider {...settings}>
                        {datosObras.map((slide, idx) => (
                            <div key={slide.id_obra}>
                                <div className={idx === imageIndex ? "slide activeSlide" : "slide"}>
                                    <img src={slide.imagen} alt="cartelera"></img>
                                        <div className="info-slider">
                                            <h2>{slide.nombre_obra}</h2>
                                            <h3>{slide.nombre_teatro}</h3>
                                            <h3>{slide.horario_funciones}</h3>
                                        </div>
                                </div>
                                    <div className="info-slider-smallscreen">
                                        <h2>{slide.nombre_obra}</h2>
                                        <h3>{slide.nombre_teatro}</h3>
                                        <h3>{slide.horario_funciones}</h3>
                                    </div>
                            </div>

                        )
                        )}
                    </Slider>
                </div>
            )}
        </div>
    );
}

export default HomeSlider;