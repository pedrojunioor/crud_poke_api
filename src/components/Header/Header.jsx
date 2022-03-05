import React, { useState, useContext } from "react";

import './Header.scss'

import { Context } from '../../context/AuthContext'
import { ContextPokedex } from '../../context/PokedexContext'
import { Link, useHistory } from 'react-router-dom'
import googleIcon from '../../assets/images/google-icon.svg'

import listPokemons from '../../mocks/listPokemons.json'


export function Header() {

    const history = useHistory()
    const { user, sigInWithGoogle, logout } = useContext(Context)

    const { field, setField, handleGetPokemonsWithFilter } = useContext(ContextPokedex)


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

    function mountOptions(lista) {
        return lista.map((item, i) => {
            return <option key={i} value={`${item.name}`} />
        })
    }

    function mountInput(lista) {
        return <div className="input-area">
            <input
                type="text"
                list="pokemons"
                placeholder="Name"
                onInput={event => { setField(event.target.value) }}
                value={field}
            />
            <datalist id="pokemons">
                {mountOptions(lista)}
            </datalist>
        </div>

    }


    return (
        <div className="header">
            <div className="logp-area">
                <Link to='/'>HOME</Link>
            </div>
            <div style={{display: 'flex', width: '1000%',justifyContent: 'center'}}>
                <form onSubmit={e =>handleGetPokemonsWithFilter(e, field)}>
                    {mountInput(listPokemons)}
                    <button type="submit">Buscar</button>
                </form>
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