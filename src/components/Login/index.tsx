import React, { useState } from 'react';
import { User } from '../Cadastro';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const navigate = useNavigate(); // Chame useNavigate dentro do componente

    const handleLogin = () => {
        const storedUserData: string | null = localStorage.getItem('userData');
        if (storedUserData) {
            const userData: User = JSON.parse(storedUserData);
            if (userData.email === userEmail && userData.senha === userPassword) {
                setIsLoggedIn(true);
                navigate('/task'); // Use navigate diretamente
                // console.log('Login feito!');
            } else if (userData.email !== userEmail) {
                navigate('/cadastro')

                console.log('Email ou senha incorretos');
            } else if (userData.senha !== userPassword) {
                <small>Senha Incorreta!</small>
            }
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        console.log('Logout realizado.');
    };

    return (
        <div>


            <div>
                <h2>Login de Usuário</h2>
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
                    <p>senha dsaasd</p>
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
                </form>
            </div>

        </div>
    );
}

export default Login;
