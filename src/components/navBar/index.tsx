// Navbar.tsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User } from '../../types/type';
import styles from './NavBar.module.css';

interface NavbarProps {
    isLoggedIn: boolean;
    user: User | null;
    onLogout: () => void;
    onLogin: (userData: User) => void; // Adicione essa propriedade
}
  
const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, user, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        localStorage.removeItem('userData');
        navigate('/');
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarBrand}>
                <NavLink to="/" className={styles.logo}>
                    Kabanzinho 
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