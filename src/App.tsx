import './style.module.css'
import Task from './components/Task/Task'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Cadastro from './components/Cadastro'
import NotFound from './components/NotFound/NotFound'
import { useState } from 'react'
import { User } from './types/type'
import Navbar from './components/navBar'


const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem('isLoggedIn') === 'true'); // Verifica se o usuário estava logado antes
    const [user, setUser] = useState<User | null>(null);

    const handleLogin = (userData: User) => {
        setIsLoggedIn(true);
        setUser(userData);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('isLoggedIn'); // Remove o estado de login ao fazer logout
    };

    return (
        <BrowserRouter>
            <Navbar isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Navigate to={isLoggedIn ? '/task' : '/login'} />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/task" element={isLoggedIn ? <Task /> : <Navigate to="/login" />} />
                <Route path="/notFound" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};


export default App;