import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { collection, doc, setDoc, addDoc, getDocs, getDoc, query, where } from "firebase/firestore";
import { database, auth, firebase } from '../../services/firebase'

import { Card } from '../../components/Card/Card'
import { Header } from '../../components/Header/Header'
import { Button } from '../../components/Button/Button'

import './Decks.scss'

export function Decks() {

    const params = useParams()
    const history = useHistory()

    const userId = params.id

    useEffect(() => {
        // console.log
        if (firebase.auth().currentUser !== undefined ) {

            if (firebase.auth().currentUser.uid !== userId) {
                history.push('/')
            }
        }
    }, [firebase.auth().currentUser, userId])

    const [decks, setDecks] = useState([])

    function handleDecks(data) {
        setDecks([
            ...decks,
            data
        ])
    }

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

    function showDecksNaTela(decks) {
        let ArrayDecks = []
        Object.entries(decks[0]).forEach(item => {
            ArrayDecks.push(item[1])
        })
        if (ArrayDecks.length > 0) {
            return ArrayDecks.map((item, i) => {
                if (item.length > 0) {
                    return <div className="card-layout">
                        <div style={{ marginBottom: '20px' }}>
                            <h1>{`Deck ${i + 1}`}</h1>

                        </div>
                        <div className="deck" >
                            <div style={{ display: 'flex', flexWrap: "wrap" }}>
                                {showDeck(item)}
                            </div>
                            <Button estilo='btn5'>EXCLUIR DECK</Button>
                        </div>
                    </div>
                }

            })
        }
    }

    function showDeck(deck) {
        return deck.map((item, i) => {
            return <div className="deck">

                <Card pokemon={item} />
                <Button estilo='btn5'>Remover do Deck</Button>
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