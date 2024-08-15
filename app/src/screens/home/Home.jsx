import React from 'react'
import { logout } from '../../sideEffects/authEffects'

export default function Home() {
    return (
        <div onClick={() => logout()}>Home</div>
    )
}
