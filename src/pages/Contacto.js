import '../styles/components/pages/Contacto.css';
import { useState } from 'react';
import axios from 'axios';

const Contacto = (props) => {
    const initialForm = {
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    }

    const [sending, setSending] = useState(false);
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState(initialForm);
    
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(oldData => ({
            ...oldData,
            [name]: value
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setMsg('');
        setSending(true);
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/contacto`, formData);
        setSending(false);
        setMsg(response.data.message);
        if (response.data.error === false) {
            setFormData(initialForm);
        }
    }

    return (
        <main className="holder">
            <div className="contacto">
                <h2>Contactanos!</h2>
                <form action="" className="formulario" onSubmit={handleSubmit}>
                    <p>
                        <input type="text" placeholder="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
                    </p>
                    <p>
                        <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
                    </p>
                    <p>
                        <input type="text" placeholder="Teléfono" name="telefono" value={formData.telefono} onChange={handleChange} />
                    </p>
                    <p>
                        <textarea cols="30" rows="10" placeholder="Ingrese su mensaje" name="mensaje" value={formData.mensaje} onChange={handleChange} />
                    </p>
                    <p className="acciones">
                        <input type="submit" value="Enviar" />
                    </p>
                    {sending ? <p>Enviando...</p> : null}
                    {msg ? <p>{msg}</p> : null}
                </form>
            </div>
        </main>
    );
}

export default Contacto;