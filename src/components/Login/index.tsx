import React, { useState } from 'react';
import { User } from '../Cadastro';



const Login: React.FC = () => {

    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);


    const handleLogin = () => {
        const storedUserData: string | null = localStorage.getItem('userData');
        if (storedUserData) {
            const userData: User = JSON.parse(storedUserData);
            if (userData.email === userEmail && userData.senha === userPassword) {
                setIsLoggedIn(true);
                console.log('Login feito!');
            } else {
                console.log('Email ou senha incorretos');
            }
        } else {
            console.log('Tá louco? Cadastra aí primeiro.');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        console.log('Logout realizado.');
    };

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <h2>Usuário Logado</h2>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
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
            )}
        </div>
    );
}

export default Login;