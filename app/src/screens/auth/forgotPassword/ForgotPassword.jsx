import React, { useState } from 'react';
import { sendPasswordResetEmail } from '../../../sideEffects/authEffects';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleReset = async () => {
        if (errorMessage) setErrorMessage("");

        if (!email) {
            setErrorMessage(t("inputs_missing"));
            return;
        }

        try {
            const data = await sendPasswordResetEmail(email);
            console.log("Password reset email sent", data);
        } catch (error) {
            console.error("Error sending password reset email", error);
            setErrorMessage(t(error.code) || t("password_reset_failed"));
        }
    }

    function handleLogin() {
        navigate('/login');
    }

    return (
        <div style={styles.container}>
            <h1>{t('forgot_password')}</h1>

            <input
                type="email"
                placeholder={t('email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label={t('email')}
            />

            {errorMessage}

            <button onClick={handleReset}>{t('reset')}</button>

            <div onClick={() => handleLogin()}>{t('login')}</div>
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
