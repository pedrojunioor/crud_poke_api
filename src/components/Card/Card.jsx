import React, { useState, useEffect } from "react";

import api from '../../config/api'
import { Button } from "../Button/Button";

import './Card.scss'

export function Card(pokemon) {

    const [pokemonDetails, setPokemonDetails] = useState(undefined)

    useEffect(() => {
        api.get(`pokemon/${pokemon.pokemon.url.split('/')[6]}`).then(result => {
            setPokemonDetails(result.data)
        }).catch(error => {
            console.log(error)
        })
    }, [pokemon])

    return (
        <div className='card-area'>
            <div className="card shadow">
                {console.log(pokemonDetails)}
                {pokemonDetails && <div className="card-content">
                    <h1>{pokemonDetails.name}</h1>
                    <img src={pokemonDetails.sprites.front_default} alt="" />
                </div>}
            </div>
            <div className="add-to-deck">
                <Button estilo='btn2' onClick={() => console.log('ADD')}>Add To Deck</Button>
            </div>

        </div>
    )
}