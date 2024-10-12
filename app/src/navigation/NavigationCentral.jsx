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
import ChangePassword from '../screens/settings/changePassword/ChangePassword';
import ChangePhonenumber from '../screens/settings/changePhoneNumber/ChangePhonenumber';
import ChangeProfilePicture from '../screens/settings/changeProfilePicture/ChangeProfilePicture';
import EdgeFunctions from '../screens/edgeFunctions/EdgeFunctions';
import ProfileLoading from '../screens/auth/profileLoading/ProfileLoading';

export default function NavigationCentral() {

    const auth = useSelector(state => state.auth.user);
    const isProfileLoading = useSelector(state => state.profile.loading);

    return (
        <BrowserRouter>
            <Routes>
                {auth ?
                    <>
                        {isProfileLoading && <Route path="/*" element={<ProfileLoading />} />}

                        <Route path="/" element={<Home />} />

                        {/* Settings */}
                        <Route path="/change-email" element={<ChangeEmail />} />
                        <Route path="/change-password" element={<ChangePassword />} />
                        <Route path="/change-phone" element={<ChangePhonenumber />} />
                        <Route path="/change-profilepicture" element={<ChangeProfilePicture />} />
                        <Route path="/edge-functions" element={<EdgeFunctions />} />

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
