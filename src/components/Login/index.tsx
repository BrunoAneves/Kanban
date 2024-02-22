import React, { useState } from 'react';
import { User } from '../Cadastro';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login: React.FC = () => {
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isWrongPassword, setIsWrongPassword] = useState<boolean>(false); // Estado para controlar se a senha está incorreta

    const navigate = useNavigate();

    const handleLogin = () => {
        const storedUserData: string | null = localStorage.getItem('userData');
        if (storedUserData) {
            const userData: User = JSON.parse(storedUserData);
            if (userData.email === userEmail && userData.senha === userPassword) {
                setIsLoggedIn(true);
                navigate('/task');
                // console.log('Login feito!');
            } else if (userData.email !== userEmail) {
                navigate('/cadastro');
                console.log('Email ou senha incorretos');
            } else if (userData.senha !== userPassword) {
                setIsWrongPassword(true);
            }
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };
    const handlePasswordFocus = () => {
        setIsWrongPassword(false); 
    };
    return (
        <div className={styles.container}>
            {isLoggedIn ? (
                <div className={styles.form}>
                    <h2>Usuário Logado</h2>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
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
                                onKeyUp={handlePasswordFocus} 
                                required
                            />
                            {isWrongPassword && <small className={styles.error}>Senha Incorreta!</small>}
                            
                        </div>
                        <button type="button" onClick={handleLogin}>Login</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Login;
