import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { changeEmail } from '../../../sideEffects/settingEffects';
import store from '../../../redux/store';
import { setAuthUser } from '../../../redux/actions/userActions';

export default function ChangeProfilePicture() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { dispatch } = store;
    
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");


    return (
        <div style={styles.container}>
            <h1>{t('change_profile_picture')}</h1>
            <div>{t('upload')}</div>
            <div>{t('delete')}</div>
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