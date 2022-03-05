import React, { useState, useContext, useEffect } from "react";
import { Button } from '../Button/Button'

import './Header.scss'

import { Context } from '../../context/AuthContext'
import { ContextPokedex } from '../../context/PokedexContext'
import { Link, useHistory } from 'react-router-dom'
import googleIcon from '../../assets/images/google-icon.svg'

import listPokemons from '../../mocks/listPokemons.json'
import listAbility from '../../mocks/listAbility.json'

export function Header() {

    const history = useHistory()
    const { user, sigInWithGoogle, logout } = useContext(Context)
    const [filter, setFilter] = useState('name')

    const { field,
        setField,
        ability,
        setAbility,
        handleGetPokemons,
        handleGetPokemonsByName,
        handleGetPokemonsByAbility } = useContext(ContextPokedex)

    async function singIn() {
        if (!user) {
            await sigInWithGoogle()
        }
        history.push('/')
    }

    useEffect(() => {
        if (filter === 'name') {
            if (field.trim() === '') {
                handleGetPokemons()
            }
        }
        else if(filter === 'ability'){
            if (ability.trim() === '') {
                handleGetPokemons()
            } 
        }
    }, [field,ability])

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

    function mountInputName(lista) {
        return <form onSubmit={e => handleGetPokemonsByName(e, field)}>
            <div className="input-area">
                <input
                    type="search"
                    list="pokemons"
                    placeholder="Name"
                    onInput={event => { setField(event.target.value) }}
                    value={field}
                />
                {field.length > 0 &&
                    <datalist id="pokemons">
                        {mountOptions(lista)}
                    </datalist>
                }
                <Button estilo='btn3' type="submit">Buscar</Button>
            </div>
        </form>
    }

    function mountInputAbility(lista) {
        return <form onSubmit={e => handleGetPokemonsByAbility(e, ability)}>
            <div className="input-area">
                <input
                    type="search"
                    list="ability"
                    placeholder="Ability"
                    onInput={event => { setAbility(event.target.value) }}
                    value={ability}
                />
                <datalist id="ability">
                    {mountOptions(lista)}
                </datalist>
                <Button estilo='btn3' type="submit">Buscar</Button>
            </div>
        </form>
    }




    return (
        <div className="header">
            <div className="logo-area">
                <Link to='/'>HOME</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="radio"
                        onChange={() => setFilter('name')}
                        checked={filter === 'name' ? true : false} />

                </div>
                <div>
                    <label htmlFor="ability-input">Ability</label>
                    <input
                        id="ability-input"
                        type="radio"
                        checked={filter === 'ability' ? true : false}
                        onChange={() => setFilter('ability')} />
                </div>

            </div>
            {filter === 'name' ? mountInputName(listPokemons) : mountInputAbility(listAbility)}

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
        </div >
    )
}