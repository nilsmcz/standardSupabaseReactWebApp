import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { deleteAccount } from '../../../sideEffects/settingEffects';

export default function DeleteAccount() {
    const { t } = useTranslation();

    function deleteUserAccount() {
        deleteAccount();
    }

    return (
        <div>
            <button onClick={() => deleteUserAccount()}>{t('delete_account')}</button>
        </div>
    )
}
