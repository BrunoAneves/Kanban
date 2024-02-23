import React, { useState } from 'react';
import { User } from '../../types/type';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

interface LoginProps {
    onLogin: (userData: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const storedUserData: string | null = localStorage.getItem('userData');
        if (storedUserData) {
            const userData: User = JSON.parse(storedUserData);
            if (userData.email === userEmail && userData.senha === userPassword) {
                onLogin(userData);
                navigate('/task');
            } else {
                setError('Credenciais inválidas');
            }
        } else {
            setError('Credenciais inválidas');
        }
    };

    const handleRegister = () => {
        navigate('/cadastro');
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h2>Login</h2>
                <p>Entre para organizar suas tarefas</p>
                <form>
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
                    <button type="button" onClick={handleLogin}>Login</button>
                    <button type="button" onClick={handleRegister}>Cadastre-se</button>
                    {error && <small className={styles.error}>{error}</small>}
                </form>
            </div>
        </div>
    );
};

export default Login;