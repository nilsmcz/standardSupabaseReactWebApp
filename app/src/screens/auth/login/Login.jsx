import React, { useState } from 'react';
import { loginWithEmailPassword } from '../../../sideEffects/authEffects';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {
        if (errorMessage) setErrorMessage("");

        if (!email || !password) {
            setErrorMessage(t("inputs_missing"));
            return;
        }

        try {
            const data = await loginWithEmailPassword(email, password);
            console.log("User logged in", data);
            navigate('/');
        } catch (error) {
            console.error("Error logging in", error);
            setErrorMessage(t(error.code) || t("login_failed"));
        }
    }

    function handleRegister() {
        navigate('/register');
    }

    function handleForgotPassword() {
        navigate('/forgot-password');
    }

    return (
        <div style={styles.container}>
            <h1>{t('login')}</h1>

            <input
                type="email"
                placeholder={t('email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label={t('email')}
            />

            <input
                type="password"
                placeholder={t('password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label={t('password')}
            />

            {errorMessage}

            <button onClick={handleLogin}>{t('login')}</button>

            <div onClick={()=>handleRegister()}>{t('register')}</div>

            <div onClick={()=>handleForgotPassword()}>{t('forgot_password')}</div>

        </div>
    )
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
    },
};