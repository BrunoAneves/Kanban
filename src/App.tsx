import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Task from './components/Task/Task';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import NotFound from './components/NotFound/NotFound';
import { User } from './types/type';
import Navbar from './components/navBar';

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem('userData') || 'null'));

    const handleLogin = (userData: User) => {
        setUser(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('userData');
    };

    return (
        <BrowserRouter>
            <Navbar isLoggedIn={user !== null} user={user} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Navigate to={user ? '/task' : '/login'} />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/task" element={user ? <Task /> : <Navigate to="/login" />} />
                <Route path="/notFound" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
