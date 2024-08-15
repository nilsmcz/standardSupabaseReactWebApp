import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from '../supabase/supabase';

//Screens
import Login from '../screens/login/Login';
import Register from '../screens/register/Register';

export default function NavigationCentral() {

    const user = supabase.auth ?? null; //TODO: NOT WORKING -> ICH BRAUCHE EINE ART LISTENER FILE DIE AUF SESSION ÄNDERUNGEN HÖRT
    console.log(user);

    return (
        <BrowserRouter>
            <Routes>
                {user ?
                    <>
                        <Route path="/" element={<Register />} />
                    </> : <>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </>
                }
            </Routes>
        </BrowserRouter>
    )
}
