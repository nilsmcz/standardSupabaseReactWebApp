import React, { useState } from 'react';
import { registerWithEmailPassword } from '../../sideEffects/authEffects';
import { useTranslation } from 'react-i18next';

export default function Register() {
    const { t } = useTranslation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function register() {
        errorMessage && setErrorMessage("");
        if (email === "" || password === "" || confirmPassword === "") {
            setErrorMessage("Please fill in all fields");
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
        try {
            const user = await registerWithEmailPassword(email, password);
            console.log("User registered", user);
        } catch (error) {
            setErrorMessage(error.message || "An unknown error occurred" );
        }
    }

    return (
        <div style={{ display: "flex", width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            {t('registration')}

            <input
                type="text"
                placeholder={"Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="text"
                placeholder={"Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <input
                type="text"
                placeholder={"Confirm Password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {errorMessage}

            <button onClick={() => register()}>{t('register')}</button>

        </div>
    )
}
