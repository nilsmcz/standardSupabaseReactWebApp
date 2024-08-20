import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../sideEffects/authEffects'
import { useTranslation } from 'react-i18next';

export default function Home() {
    const { t } = useTranslation();

    return (
        <>
            <h1>Home</h1>
            
            <Link to="/change-email">{t("change_email")}</Link>
            <br/>
            <Link to="/change-password">{t("change_password")}</Link>
            <br/>
            <Link to="/change-phone">{t("change_phonenumber")}</Link>
            <br/>
            <Link to="/change-profilepicture">{t("change_profile_picture")}</Link>

            <br/><br/>
            <div onClick={()=>logout()}>{t("logout")}</div>
        </>
    )
}
