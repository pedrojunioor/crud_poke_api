import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, firebase } from '../services/firebase';

const Context = createContext()

function AuthProvider({ children }) {

    const history = useHistory()
    const [user, setUser] = useState()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid, email } = user

                if (!displayName || !photoURL) {
                    throw new Error('Missing Information form Google Account')
                }
                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL,
                    emaill: email
                })
            }
            else {
                setUser(undefined)
            }
        })

        return () => {
            unsubscribe()
        }
    }, [])

    async function sigInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()
        const result = await auth.signInWithPopup(provider)

        if (result.user) {
            const { displayName, photoURL, uid, email } = result.user

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL,
                emaill: email
            })
        }
    }

    function logout() {
        firebase.auth().signOut()
        history.push('/')
    }

    function isLoggedIn() {
        if (!user) {
            return false
        }
        return true
    }

    async function handleNewAccount(e, email, password, name) {
        e.preventDefault();
        const user = await auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                const user = firebase.auth().currentUser;
                return user.updateProfile({
                    displayName: name
                })
            })
            .then(() => {
                alert("Conta criada com sucesso")

            })
            .catch((error) => {
                console.log(error)
            })
        return user
    }

    async function handleLoginWithEmailAndPassword(e, email, password) {
        e.preventDefault()
        const result = auth.signInWithEmailAndPassword(email, password).then(result => {
            
            if (result.user) {
                const { displayName, uid, email } = result.user
                setUser({
                    id: uid,
                    name: displayName,
                    emaill: email
                })
                alert("Login efetuado com sucesso")
            }
        }).then(() => {
        })
    }


    return (
        <div>
            <Context.Provider value={{ user, sigInWithGoogle, logout, isLoggedIn, handleNewAccount, handleLoginWithEmailAndPassword }}>
                {children}
            </Context.Provider>
        </div >
    )
}

export { Context, AuthProvider };