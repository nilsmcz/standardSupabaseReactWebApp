import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import store from '../../../redux/store';
import { setAuthUser } from '../../../redux/actions/userActions';
import { changePassword } from '../../../sideEffects/settingEffects';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ChangePassword() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { dispatch } = store;
    const auth = useSelector(state => state.auth.auth);
    const userEmail = auth.email;

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChangePassword = async () => {
        if (errorMessage) setErrorMessage("");

        if (!password || !newPassword || !newPasswordConfirmation) {
            setErrorMessage(t("inputs_missing"));
            return;
        }

        if (newPassword !== newPasswordConfirmation) {
            setErrorMessage(t("passwordsDoNotMatch"));
            return;
        }

        try {
            const data = await changePassword(userEmail, password, newPassword);
            const newUserAuth = data.user;
            dispatch(setAuthUser(newUserAuth));
            console.log("Password changed:", data.user);
        } catch (error) {
            console.error("Error changing password", error);
            setErrorMessage(t(error.code) || t("change_password_failed"));
        }
    }

    return (
        <div style={styles.container}>
            <h1>{t('change_password')}</h1>

            <input
                type="password"
                placeholder={t('password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label={t('password')}
            />

            <input
                type="password"
                placeholder={t('new_password')}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                aria-label={t('new_password')}
            />

            <input
                type="password"
                placeholder={t('new_password_confirm')}
                value={newPasswordConfirmation}
                onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                aria-label={t('new_password_confirm')}
            />

            {errorMessage}

            <button onClick={handleChangePassword}>{t('change')}</button>
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
