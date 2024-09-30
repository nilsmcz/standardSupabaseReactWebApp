import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import store from '../../../redux/store';
import { changeProfilePicture } from '../../../sideEffects/settingEffects';
import { useSelector } from 'react-redux';

export default function ChangeProfilePicture() {
    const { t } = useTranslation();
    const session = useSelector(state => state.auth.session);
    const accessToken = session?.accessToken;

    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const fileInputRef = useRef(null);


    async function imageUploadHandler(event) {
        const file = event.target.files[0];
        if (file) {
            setNewProfilePicture(file);
            try {
                const result = await changeProfilePicture(accessToken, file);
                console.log("Profile picture changed successfully: ", result);
            } catch (error) {
                console.error("Error changing profile picture", error);
                setErrorMessage(t("change_profile_picture_failed"));
            }
        }
    }

    function triggerFileInput() {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    return (
        <div style={styles.container}>
            <h1>{t('change_profile_picture')}</h1>

            {/* Hidden file input */}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={imageUploadHandler}
                style={{ display: 'none' }}
            />

            <div onClick={triggerFileInput}>{t('upload')}</div>

            <div>{t('delete')}</div>

            {errorMessage}
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