import '../../styles/components/layout/Header.css';
import {NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTheaterMasks, faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import useWindowSize from '../WindowSize';

const Header = (props) => {
    const {width} = useWindowSize();
    const [show, setshow] = useState('false');
    
    function toggleClass () {
        if (width < 768) {
            setshow(!show);
        }
    };

    return (
        <header className={show ? null : 'show'}>
            <nav>
                <div class="title">
                    <h1><span><FontAwesomeIcon icon={faTheaterMasks}/></span>Ceres</h1>
                    <h2>Teatro Independiente Mar del Plata</h2>
                </div>
                <ul className={ show ? 'menu' : 'menu show'}>
                    <li><NavLink onClick={toggleClass} className={({isActive})=>isActive ? 'activo' : undefined} to="/">Inicio</NavLink></li>
                    <li><NavLink onClick={toggleClass} className={({isActive})=>isActive ? 'activo' : undefined} to='/pages/Cartelera'>Cartelera</NavLink></li>
                    <li><NavLink onClick={toggleClass} className={({isActive})=>isActive ? 'activo' : undefined} to='/pages/Cursos'>Cursos</NavLink></li>
                    <li><NavLink onClick={toggleClass} className={({isActive})=>isActive ? 'activo' : undefined} to='/pages/Teatros'>Teatros</NavLink></li>
                    <li><NavLink onClick={toggleClass} className={({isActive})=>isActive ? 'activo' : undefined} to="/pages/Contacto">Contacto</NavLink></li>
                </ul>
                <button className="check checkbtn" onClick={toggleClass}><FontAwesomeIcon icon={faBars} /></button>
            </nav>
        </header>
    );
}

export default Header;