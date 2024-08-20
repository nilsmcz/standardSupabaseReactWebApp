import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { changePhoneNumber } from '../../../sideEffects/settingEffects';
import store from '../../../redux/store';
import { setAuthUser } from '../../../redux/actions/userActions';

export default function ChangePhonenumber() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { dispatch } = store;

    const [newPhoneNumber, setNewPhoneNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChangePhonenumber = async () => {
        if (errorMessage) setErrorMessage("");

        if (!newPhoneNumber) {
            setErrorMessage(t("inputs_missing"));
            return;
        }

        try {
            const data = await changePhoneNumber(newPhoneNumber);
            const newUser = data.user;
            dispatch(setAuthUser(newUser));
            console.log("Phonenumber changed:", data.user);
        } catch (error) {
            console.error("Error changing phonenumber", error);
            setErrorMessage(t(error.code) || t("change_phonenumber_failed"));
        }
    }

    return (
        <div style={styles.container}>
            <h1>{t('change_phonenumber')}</h1>

            <input
                type="phonenumber"
                placeholder={t('new_phonenumber')}
                value={newPhoneNumber}
                onChange={(e) => setNewPhoneNumber(e.target.value)}
                aria-label={t('new_phonenumber')}
            />

            {errorMessage}

            <button onClick={handleChangePhonenumber}>{t('change')}</button>
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