import React, { useState } from 'react';
import { loginWithEmailPassword } from '../../sideEffects/authEffects';
import { useTranslation } from 'react-i18next';

export default function Login() {
    const { t } = useTranslation();

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
        } catch (error) {
            console.error("Error logging in", error);
            setErrorMessage(t(error.code) || t("login_failed"));
        }
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