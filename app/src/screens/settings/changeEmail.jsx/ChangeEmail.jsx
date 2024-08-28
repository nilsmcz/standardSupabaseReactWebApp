import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { changeEmail } from '../../../sideEffects/settingEffects';
import store from '../../../redux/store';
import { setAuthUser } from '../../../redux/actions/authActions';

export default function ChangeEmail() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { dispatch } = store;

    const [newEmail, setNewEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChangeEmail = async () => {
        if (errorMessage) setErrorMessage("");

        if (!newEmail) {
            setErrorMessage(t("inputs_missing"));
            return;
        }

        try {
            const data = await changeEmail(newEmail);
            const newUser = data.user;
            dispatch(setAuthUser(newUser));
            console.log("Email changed:", data.user);
        } catch (error) {
            console.error("Error changing email", error);
            setErrorMessage(t(error.code) || t("change_email_failed"));
        }
    }

    return (
        <div style={styles.container}>
            <h1>{t('change_email')}</h1>

            <input
                type="email"
                placeholder={t('new_email')}
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                aria-label={t('new_email')}
            />

            {errorMessage}

            <button onClick={handleChangeEmail}>{t('change')}</button>
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
