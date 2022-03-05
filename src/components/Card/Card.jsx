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

    function showAbilities(abilities) {
        let temp = ''
        abilities.forEach((item,i) =>{
            if(i === 0){
                temp += item.ability.name
            }
            else{
                temp += ', ' + item.ability.name
            }
        })
        
        return <h4>{temp}</h4>
    }

    return (
        <div className='card-area'>
            <div className="card shadow">
                {pokemonDetails && <div className="card-content">
                    <h2>#{pokemonDetails.id}</h2>
                    <img src={pokemonDetails.sprites.front_default} alt="" />
                    <h1>{pokemonDetails.name}</h1>
                    {showAbilities(pokemonDetails.abilities)}
                </div>}
            </div>
        </div>
    )
}