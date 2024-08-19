import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from '../supabase/supabase';
import { useSelector } from 'react-redux';

//Screens
import Login from '../screens/auth/login/Login';
import Register from '../screens/auth/register/Register';
import Home from '../screens/home/Home';
import ForgotPassword from '../screens/auth/forgotPassword/ForgotPassword';
import ChangeEmail from '../screens/settings/changeEmail.jsx/ChangeEmail';

export default function NavigationCentral() {

    const user = useSelector(state => state.user.user);

    return (
        <BrowserRouter>
            <Routes>
                {user ?
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/change-email" element={<ChangeEmail />} />
                        <Route path="/*" element={<Home />} />
                    </> : <>
                        <Route path="/" element={<Login />} />

                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        
                        <Route path="/*" element={<Login />} />
                    </>
                }
            </Routes>
        </BrowserRouter>
    )
}
