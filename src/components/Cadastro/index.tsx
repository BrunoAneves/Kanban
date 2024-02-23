import React, { useState } from 'react';
import styles from './Cadastro.module.css';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../types/type';
import { useNavigate } from 'react-router-dom';

const Cadastro: React.FC = () => {
    const [userEmail, setUserEmail] = useState<string>('');
    const [userNome, setUserNome] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);
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
        return userNome.length >= 3 && userEmail.length >= 3 && userPassword.length >= 6;
    };

    const isUpperCase = /[A-Z]/.test(userPassword);
    const isLowerCase = /[a-z]/.test(userPassword);
    const hasNumber = /\d/.test(userPassword);
    const isLengthValid = userPassword.length >= 6;

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
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        required
                    />
                    {isPasswordFocused && (
                        <div className={styles.passwordRequirements}>
                           <div className={`${styles.requirement} ${isUpperCase ? styles.filled : ''} ${isUpperCase ? styles.filledRequirement : ''}`}>
                                <small>Pelo menos 1 letra maiúscula</small>
                            </div>
                            <div className={`${styles.requirement} ${isLowerCase ? styles.filled : ''} ${isUpperCase ? styles.filledRequirement : ''}`}>
                                <small>Pelo menos 1 letra minúscula</small>
                            </div>
                            <div className={`${styles.requirement} ${hasNumber ? styles.filled : ''} ${isUpperCase ? styles.filledRequirement : ''}`}>
                                <small>Pelo menos 1 número</small>
                            </div>
                            <div className={`${styles.requirement} ${isLengthValid ? styles.filled : ''}`}>
                                <small>Mínimo de 6 caracteres</small>
                            </div>
                        </div>
                    )}
                </div>
                <button type="button" onClick={handleRegister} disabled={!isFormValid()}>
                    Cadastrar
                </button>
            </form>
        </div>
    );
};

export default Cadastro;
