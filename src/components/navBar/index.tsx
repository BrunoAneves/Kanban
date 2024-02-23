// Navbar.tsx
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User } from '../../types/type';
import styles from './NavBar.module.css';

interface NavbarProps {
    onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setUser(userData);
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        onLogout();
        localStorage.removeItem('userData');
        setUser(null);
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarBrand}>
                <NavLink to="/" className={styles.logo}>
                    Todo App
                </NavLink>
            </div>
            {isLoggedIn && user ? (
                <div className={styles.userSection}>
                    <span className={styles.userName}>Bem-vindo, {user.nome}</span>
                    <button className={styles.logoutButton} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            ) : (
                <div className={styles.userSection}>
                    <NavLink to="/login" className={styles.loginLink}>
                        Login
                    </NavLink>
                    <NavLink to="/cadastro" className={styles.registerLink}>
                        Cadastre-se
                    </NavLink>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
