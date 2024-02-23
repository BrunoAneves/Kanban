import React, { useState } from 'react';
import styles from './Cadastro.module.css';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../types/type';
import { useNavigate } from 'react-router-dom';

const Cadastro: React.FC = () => {
    const [userEmail, setUserEmail] = useState<string>('');
    const [userNome, setUserNome] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleRegister = () => {
        const userData: User = {
            id: uuidv4(),
            nome: userNome,
            email: userEmail,
            senha: userPassword
        };

        localStorage.setItem('userData', JSON.stringify(userData));

        setUserEmail('');
        setUserNome('');
        setUserPassword('');

        console.log('Foi :', userData);

        navigate('/');
    };

    const isFormValid = () => {
        return userNome.length >= 3 && userEmail.length >= 3 && userPassword.length >= 3;
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h2>Cadastro de Usuário</h2>
            </div>
            <form className={styles.form}>
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        value={userNome}
                        onChange={(e) => setUserNome(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="senha">Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="button" onClick={handleRegister} disabled={!isFormValid()}>
                    Cadastrar
                </button>
            </form>
        </div>
    );
};

export default Cadastro;
