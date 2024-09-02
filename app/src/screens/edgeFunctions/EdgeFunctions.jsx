import React, { useState } from 'react';
import { supabase } from '../../supabase/supabase';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export default function EdgeFunctions() {
    const { t } = useTranslation();
    const session = useSelector(state => state.auth.session);
    const accessToken = session?.accessToken;

    async function callHello() {
        const { data, error } = await supabase.functions.invoke('hello', {
            body: JSON.stringify({ param1: 5, param2: 10 }),
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Function result:', data.result);
        }
    }

    async function registerUserWithProfile() {
        console.log("Access Token:", accessToken);
        const { data, error } = await supabase.functions.invoke('registerUSerWithProfile', {
            body: JSON.stringify({ param1: 5, param2: 10 }),
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Function result:', data.result);
        }
    }

    return (
        <div style={styles.container}>
            <h1>{t('edge_functions')}</h1>
            <button onClick={() => callHello()}>{t('test_edge_function')}: hello</button>
            <button onClick={() => registerUserWithProfile()}>{t('test_edge_function')}: registerUserWithProfile</button>
        </div>
    );
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