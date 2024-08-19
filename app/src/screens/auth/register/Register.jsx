import React, { useState } from 'react';
import { registerWithEmailPassword } from '../../../sideEffects/authEffects';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleRegister = async () => {
        if (errorMessage) setErrorMessage("");

        if (!email || !password || !confirmPassword) {
            setErrorMessage(t("inputs_missing"));
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage(t("passwordsDoNotMatch"));
            return;
        }

        try {
            const data = await registerWithEmailPassword(email, password);
            console.log("User registered", data);
        } catch (error) {
            console.error("Error registering", error);
            setErrorMessage(t(error.code) || t("registration_failed"));
        }
    };

    function handleLogin() {
        navigate('/login');
    }

    return (
        <div style={styles.container}>
            <h1>{t('registration')}</h1>

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

            <input
                type="password"
                placeholder={t('confirm_password')}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                aria-label={t('confirm_password')}
            />

            {errorMessage}

            <button onClick={handleRegister}>{t('register')}</button>

            <div onClick={()=>handleLogin()}>{t('login')}</div>
        </div>
    );
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
