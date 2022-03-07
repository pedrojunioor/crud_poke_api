import React, { useContext, useEffect, useState } from "react";
import { ContextPokedex } from '../../context/PokedexContext'
import { Context } from '../../context/AuthContext'
import { useHistory } from 'react-router-dom'
import { Button } from '../Button/Button'
import { Card } from '../Card/Card'
import { ModalAdd } from '../ModalAdd/ModalAdd'

import { collection, doc, setDoc, addDoc, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { database, auth, firebase } from '../../services/firebase'

import './Catalog.scss';


export function Catalog() {

    const { pokemons, next, previous, handleGetPokemons, handlePageNext, handlePagePrevious } = useContext(ContextPokedex)
    const [decks, setDecks] = useState([])

    const [pokemonSend, setPokemonSend] = useState(undefined)

    const { user } = useContext(Context)
    const history = useHistory();

    const [showModalAdd, setShowModalAdd] = useState(false)

    function toggleModalAdd() {
        setShowModalAdd(!showModalAdd)
    }

    function isEquals(obj1, obj2) {
        if (obj1.url === obj2.url && obj1.name === obj2.name) {
            return true;
        };
        return false;
    }

    function pertence(item, arrayy) {
        return arrayy.some((element) => isEquals(item, element));
    }

    async function addDeck(pokemon, deck) {

        const user = await firebase.auth().currentUser;
       
        try {

            const userRef = doc(database, "users", `${user.uid}`);
            const docSnap = await getDoc(userRef);

            let decksTemp = docSnap.data().decks

            let flag = Object.entries(decksTemp[0]).some(item =>
                item[0] === deck
            )
            if (flag === false) {
                decksTemp[0] = {
                    ...decksTemp[0],
                    [`${deck}`]: []
                }

            }

            if (decksTemp[0][`${deck}`].length <= 5) {
                if (!(pertence(pokemon, decksTemp[0][`${deck}`]))) {
                    decksTemp[0][`${deck}`].push(pokemon)
                }
            }

            const userRefAdd = collection(database, "users")

            const docRef = await updateDoc(doc(userRefAdd, `${user.uid}`), {
                decks: decksTemp
            });

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async function getDecks() {

        const user = await firebase.auth().currentUser;
        const docRef = doc(database, "users", `${user.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            if (docSnap.data().decks.length === 0) {
                let decks = []
                decks[0] = {
                    deck1: []
                }
                setDecks(decks)
            }
            else {
                let decks = docSnap.data().decks
                let tam = 0
                Object.keys(decks[0]).forEach(item => {
                    tam += 1
                })
                decks[0] = {
                    ...decks[0],
                    [`deck${tam + 1}`]: []
                }
                setDecks(decks)
            }
        } else {
            console.log("No such document!");
        }
    }

    function chooseDeck(e, pokemon) {
        setPokemonSend(pokemon)
        toggleModalAdd(e)
        getDecks()
    }

    const [deckSelected, setDeckSelected] = useState(undefined)

   

    function handleSendDeck(e, deck, pokemon) {
        e.preventDefault()
        let deckSend = deck
        if(deckSend === undefined){
            deckSend = 'deck1'
        }
        addDeck(pokemon, deckSend)
        setPokemonSend(undefined)
        toggleModalAdd(e)

    }
    function showOptions(decks) {
        return Object.entries(decks[0]).map((item,i) => {
            return <option key={i} value={`${item[0]}`}>{`${item[0]} QTD Atual: ${item[1].length}`}</option>
        })
    }

    function showDecks() {
        return <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={e => handleSendDeck(e, deckSelected, pokemonSend)}>
            <label htmlFor="deck-selected">Select Deck</label>
            <select id="deck-selected" value={deckSelected} onChange={(event) => { setDeckSelected(event.target.value) }}>
                {showOptions(decks)}
            </select>
            <button type="submit">Salvar</button>
        </form>
    }

    useEffect(() => {
        console.log(showModalAdd)
    }, [showModalAdd])


    function showPokemons() {
        return pokemons.map((pokemon, i) => {
            return <div key={i} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div onClick={() => history.push(`/pokemon/${pokemon.url.split('/')[6]}`)}>
                    <Card pokemon={pokemon}></Card>
                </div>
                {user && <div className="add-to-deck">
                    {/* <Button estilo='btn2' onClick={() => console.log('ADD',pokemon.url.split('/')[6])}>Add To Deck</Button> */}
                    <Button estilo='btn2' onClick={e => { showModalAdd === false && chooseDeck(e, pokemon) }}>Add To Deck</Button>
                </div>
                }
            </div>

        })
    }

    return (
        <div className="catalog">
            <div className="catalog-items">
                {pokemons && showPokemons()}
            </div>
            {showModalAdd && <ModalAdd closeModal={toggleModalAdd}>
                {decks.length > 0 && showDecks()}
                {/* {showDecks()} */}
            </ModalAdd>

            }
            <div className="pagination">
                {previous && <Button estilo='btn1' onClick={handlePagePrevious}> Previous  </Button>}
                {next && <Button estilo='btn1' onClick={handlePageNext}> Next  </Button>}
            </div>
        </div>
    )
}