import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, firebase } from '../services/firebase';

import { collection, setDoc, doc, getDocs } from "firebase/firestore";

import { database } from '../services/firebase'

import history from '../history'

const Context = createContext()

function AuthProvider({ children }) {

    const [user, setUser] = useState()


    async function getUsers() {
        const querySnapshot = await getDocs(collection(database, "users"));
        let users = []
        querySnapshot.forEach((doc) => {
            users.push(JSON.parse(JSON.stringify(doc.data())).email)
        });
        return users
    }

    async function persistUser(user) {
        console.log(user)

        try {
            const userRef = collection(database, "users")

            const docRef = await setDoc(doc(userRef, `${user.id}`), {
                name: user.name,
                email: user.emaill,
                decks: [{}]
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid, email } = user
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
            let emails = await getUsers()

            if (!(emails.includes(`${email}`))) {
                persistUser({
                    id: uid,
                    name: displayName,
                    emaill: email
                })
            }

        }
    }

    function logout() {
        firebase.auth().signOut().then(() => {
            history.push('/')
        })
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
            .then(async () => {
                alert("Conta criada com sucesso")
                let emails = await getUsers()

                if (!(emails.includes(`${email}`))) {
                    const user = firebase.auth().currentUser;
                    persistUser({
                        id: user.uid,
                        name: user.displayName,
                        emaill: user.email
                    })
                }

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
            history.push('/')
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