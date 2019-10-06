import React, { useState} from 'react';
import api from '../../services/api';

export default function Login({ history }) { 
    const [email, setEmail] = useState('');

        // inativa o auto load da page quando da o submit
        async function handleSubmit(event){
            event.preventDefault();
  

    // armazena a reposta da chamada api
    const response = await api.post('/sessions', { email });

    const { _id } = response.data;

    localStorage.setItem('user', _id);

    history.push('/dashboard');
    }

    return (
        <>
            <p>
                Ofereça <strong>Spot</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL*</label>
                <input 
                    type="email"
                    id="email" 
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    );
    
}