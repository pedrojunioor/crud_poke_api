import React, { useState, useContext } from "react";

import './Header.scss'

import { Context } from '../../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import googleIcon from '../../assets/images/google-icon.svg'


export function Header() {

    const history = useHistory()
    const { user, sigInWithGoogle, logout } = useContext(Context)

    async function singIn() {
        if (!user) {
            await sigInWithGoogle()
        }
        history.push('/')
    }

    function singOut() {
        if (user) {
            if (window.confirm('Deseja efetuar o logout')) {
                logout()
            }
            return
        }
    }


    return (
        <div className="header">
            <div className="logp-area">
                <Link to='/'>HOME</Link>
            </div>
            <div className="input-area">
                <input
                    type="text"
                    placeholder="Buscar" />
            </div>
            <div className="user-area">
                <div className="login-area">
                    <div className="user-area">
                        {user && <div className="user">
                            <img src={user?.avatar} alt="" />
                            <span>{user?.name}</span>
                        </div>}
                        {!user && <button
                            className="login-button"
                            onClick={singIn}>
                            <img src={googleIcon} alt="Logo do Google" />
                            Login
                        </button>}
                        {user && <button
                            className="login-button"
                            onClick={singOut}>
                            <img src={googleIcon} alt="Logo do Google" />
                            Logout
                        </button>}
                    </div>

                </div>
            </div>
        </div>
    )
}