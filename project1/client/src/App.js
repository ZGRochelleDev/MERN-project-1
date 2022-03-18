import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} exact />
                <Route path="/register" element={<Register />} exact />
                <Route path="/dashboard" element={<Dashboard />} exact />
            </Routes>
        </BrowserRouter>
    )
}

export default App