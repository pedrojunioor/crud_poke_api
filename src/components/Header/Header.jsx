import React, { useState, useContext, useEffect } from "react";
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'

import './Header.scss'

import { Context } from '../../context/AuthContext'
import { ContextPokedex } from '../../context/PokedexContext'
import { Link } from 'react-router-dom'
import googleIcon from '../../assets/images/google-icon.svg'
import logo from "../../assets/images/logo.png"
import { User } from '../../assets/images/User'

import listPokemons from '../../mocks/listPokemons.json'
import listAbility from '../../mocks/listAbility.json'
import history from "../../history"

export function Header(home) {


    const { user, sigInWithGoogle, logout, handleNewAccount, handleLoginWithEmailAndPassword } = useContext(Context)
    const [filter, setFilter] = useState('name')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    function toggleModal(e) {
        e.preventDefault()
        setShowModal(!showModal)
    }

    const [showModal, setShowModal] = useState(false)

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
        else if (filter === 'ability') {
            if (ability.trim() === '') {
                handleGetPokemons()
            }
        }
    }, [field, ability])

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

    function createAcount(e, email, password, name) {
        handleNewAccount(e, email, password, name)
        setName('')
        setEmail('')
        setPassword('')
        setShowModal(false)

    }

    async function loginWithEmailAndPassword(e, email, password) {
        const user = await handleLoginWithEmailAndPassword(e, email, password)
        setEmail('')
        setPassword('')
    }

    function goToDecks() {
        history.push(`/${user.id}/decks`)
    }


    return (
        <div className="header">

            <div className="logo-area">
                <Link to='/'>
                    <div className="logo-img" >
                        <img src={logo} />
                    </div>
                </Link>
            </div>
            {home.home &&
                <div className='input-radio'>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="radio"
                            onChange={() => setFilter('name')}
                            checked={filter === 'name' ? true : false} />

                    </div>
                    <div style={{ display: 'flex',justifyContent: 'center', alignItems: 'center' }}>
                        <label htmlFor="ability-input">Ability</label>
                        <input
                            id="ability-input"
                            type="radio"
                            checked={filter === 'ability' ? true : false}
                            onChange={() => setFilter('ability')} />
                    </div>
                </div>
            }
            {home.home &&
                (filter === 'name' ? mountInputName(listPokemons) : mountInputAbility(listAbility))
            }


            <div className="login-area">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <User width='25px' height='25px' />
                </div>
                <div className="card-user">
                    <div>
                        {!user && <div>
                            <form className='form-login' onSubmit={e => loginWithEmailAndPassword(e, email, password)}>
                                <span>Ja possui conta? </span>
                                <input
                                    type="text"
                                    placeholder="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}

                                />
                                <input
                                    type="password"
                                    placeholder="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />

                                <Button type="submit" estilo='btn4'>LOGIN</Button>
                                <span>Não possui? </span>
                                <Button estilo='btn3' onClick={e => toggleModal(e)} >Cadastre-se</Button>
                                <span>ou</span>
                            </form>
                            <div>
                            </div>
                        </div>
                        }
                        <div className="user-area">
                            {user && <div className="user">
                                <img src={user?.avatar} alt="" />
                                <span>{user?.name}</span>
                                {/* <Link to={`/${user.id}/decks`}>Meus Decks</Link> */}
                                <Button estilo='btn3' onClick={() => goToDecks()}>Meus Decks</Button>
                                <Button
                                    estilo='btn1'
                                    // className="login-button"
                                    onClick={singOut}>
                                    {/* <img src={googleIcon} alt="Logo do Google" /> */}
                                    Logout
                                </Button>
                            </div>}

                            {!user && <button
                                className="login-button"
                                onClick={singIn}>
                                <img src={googleIcon} alt="Logo do Google" />
                                LOGIN
                            </button>}
                        </div>
                    </div>
                </div>
            </div>

            {showModal &&
                <Modal closeModal={e => toggleModal(e)}>
                    <form className='form-login-cadastro' onSubmit={e => createAcount(e, email, password, name)}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}

                        />
                        <input
                            type="text"
                            placeholder="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}

                        />
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button type="submit" estilo='btn4'>Cadastrar</Button>
                    </form>
                </Modal>}
        </div >
    )
}