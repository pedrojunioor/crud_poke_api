import React, { useContext, useEffect, useState } from "react";
import { ContextPokedex } from '../../context/PokedexContext'
import { Context } from '../../context/AuthContext'
import { useHistory } from 'react-router-dom'
import { Button } from '../Button/Button'
import { Card } from '../Card/Card'
import { Modal } from '../Modal/Modal'

import { collection, doc, setDoc, addDoc, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { database, auth, firebase } from '../../services/firebase'
// import {auth} from '../../services/firebase'
import './Catalog.scss';


export function Catalog() {

    const { pokemons, next, previous, handleGetPokemons, handlePageNext, handlePagePrevious } = useContext(ContextPokedex)

    const { user } = useContext(Context)

    const history = useHistory();

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
        console.log('USER', user.uid)
        console.log('POKEMON', pokemon)


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


    function showPokemons() {
        return pokemons.map((pokemon, i) => {
            return <div key={i} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div onClick={() => history.push(`/pokemon/${pokemon.url.split('/')[6]}`)}>
                    <Card pokemon={pokemon}></Card>
                </div>
                {user && <div className="add-to-deck">
                    {/* <Button estilo='btn2' onClick={() => console.log('ADD',pokemon.url.split('/')[6])}>Add To Deck</Button> */}
                    <Button estilo='btn2' onClick={() => addDeck(pokemon, 'deck4')}>Add To Deck</Button>
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
            <div className="pagination">
                {previous && <Button estilo='btn1' onClick={handlePagePrevious}> Previous  </Button>}
                {next && <Button estilo='btn1' onClick={handlePageNext}> Next  </Button>}
            </div>
        </div>
    )
}