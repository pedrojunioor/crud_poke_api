import React, { createContext, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { auth, firebase } from '../services/firebase';

const Context = createContext()

function AuthProvider({children}) {

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
            else{
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
    }

    function logout() {
        firebase.auth().signOut()
        history.push('/')
    }

    function isLoggedIn() {
        if(!user){
            return false
        }
        return true
    }

    
    return (
        <div>
            <Context.Provider value={{ user, sigInWithGoogle, logout, isLoggedIn}}>
                {children}
            </Context.Provider>
        </div >
    )
}

export { Context, AuthProvider };