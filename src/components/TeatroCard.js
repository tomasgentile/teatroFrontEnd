import '../styles/components/pages/Teatros.css';

const TeatroCard = (props) => {
    return (
        <main>
            <div className='teatro'>
                <img src={props.img} alt='img teatro' />
                <div className="info_teatro">
                    <h3>{props.nombre}</h3>
                    <p>Dirección: {props.direccion}</p>
                    <p>Teléfono: {props.telefono}</p>
                    <p>Mail: {props.mail}</p>
                </div>
            </div>
        </main>
    );
}

export default TeatroCard;