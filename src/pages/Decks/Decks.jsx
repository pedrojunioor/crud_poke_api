import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { collection, doc, setDoc, addDoc, updateDoc, getDocs, getDoc, query, where } from "firebase/firestore";
import { database, auth, firebase } from '../../services/firebase'

import { Card } from '../../components/Card/Card'
import { Header } from '../../components/Header/Header'
import { Button } from '../../components/Button/Button'

import './Decks.scss'

export function Decks() {

    const params = useParams()
    const history = useHistory()

    function isEquals(obj1, obj2) {
        if (obj1.url === obj2.url && obj1.name === obj2.name) {
            return true;
        };
        return false;
    }

    function pertence(item, arrayy) {
        return arrayy.some((element) => isEquals(item, element));
    }

    const userId = params.id

    useEffect(() => {
        if (firebase.auth().currentUser !== null) {
            if (firebase.auth().currentUser.uid !== userId) {
                history.push('/')
            }
            else {
                getDecks()
            }
        }
    }, [firebase.auth().currentUser, userId])

    const [decks, setDecks] = useState([])

    // function handleDecks(data) {
    //     setDecks([
    //         ...decks,
    //         data
    //     ])
    // }

    useEffect(() => {
        getDecks()
    }, [userId])

    async function getDecks() {
        const docRef = doc(database, "users", `${userId}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setDecks(docSnap.data().decks)
        } else {
            console.log("No such document!");
        }
    }

    async function handleDeleteFromDeck(e, deck, item,ref) {
        e.preventDefault();
        if (window.confirm(`Tem certeza que quer excluir esta carta do ${ref}?`)) {

            const user = firebase.auth().currentUser
            if (user !== null) {
                const q = query(collection(database, "users"), where("email", "==", user.email));
                const docSnap = await getDocs(q);

                let novoDeck = deck.filter(ele => {
                    if (!isEquals(item, ele)) {
                        return item
                    }
                })

                let novoPack = decks[0]
                Object.entries(decks[0]).filter(deck => {
                    if ((deck[0].toString() === ref)) {
                        novoPack[`${ref}`] = novoDeck
                    }
                })
                let decksSend = []
                decksSend.push(novoPack)

                const userRefAdd = collection(database, "users")
                const docRef = await updateDoc(doc(userRefAdd, `${user.uid}`), {
                    decks: decksSend
                });
                setDecks(decksSend)

            }
        }


    }

    async function handleDeleteDeck(e, decks, item) {
        e.preventDefault();
        if (window.confirm(`Você realmente quer excluir o ${item[0]}`)) {

            const user = firebase.auth().currentUser
            if (user !== null) {

                const q = query(collection(database, "users"), where("email", "==", user.email));
                const docSnap = await getDocs(q);

                let novoPack = [{}]

                Object.entries(decks[0]).filter(deck => {
                    if ((deck[0].toString() !== item[0].toString())) {
                        let temp = deck[1]
                        novoPack[0] = {
                            ...novoPack[0],
                            [`${deck[0]}`]: temp
                        }

                    }
                })

                const userRefAdd = collection(database, "users")
                const docRef = await updateDoc(doc(userRefAdd, `${user.uid}`), {
                    decks: novoPack
                });
                setDecks(novoPack)
            }
        }

    }

    function showDecksNaTela(decks) {
        return Object.entries(decks[0]).map((item, i) => {
            return <div key={i} className="deck">

                <h1>{item[0]}</h1>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                    {showDeck(item[0],item[1])}
                </div>
                <Button
                    estilo='btn5'
                    onClick={e => handleDeleteDeck(e, decks, item)}
                >Excluir Deck</Button>
            </div>
        })
    }

    function showDeck(ref,deck) {
        return deck.map((item, i) => {
            return <div className="deck-card">
                <Card pokemon={item} />
                <Button
                    estilo='btn5'
                    onClick={e => handleDeleteFromDeck(e, deck, item,ref)}
                >Remover do Deck</Button>
            </div>
        })

    }

    return (
        <div className="decks-layout">
            <Header home={false} />
            <div >
                <div className="decks">
                    {decks.length > 0 ?
                        showDecksNaTela(decks) :
                        <h1>Você ainda não possui nenhum Deck</h1>}
                </div>
            </div>
        </div>
    )
}