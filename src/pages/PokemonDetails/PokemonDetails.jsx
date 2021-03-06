import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory, Link } from 'react-router-dom';

import { ContextPokedex } from "../../context/PokedexContext";
// import { Button } from "../../components/Button/Button";
import { Header } from '../../components/Header/Header'
import api from '../../config/api'

import './PokemonDetails.scss'

import {Card} from '../../components/Card/Card'

export function PokemonDetails() {

    const { pokemonSelected, setPokemonSelected } = useContext(ContextPokedex)

    const params = useParams();
    const history = useHistory();

    const pokeId = params.id;

    useEffect(() => {
        api.get('pokemon/' + pokeId).then(result => {
            setPokemonSelected(result.data)
        })
    }, [params])

    // function showAbilities(abilities) {
    //     let temp = ''
    //     abilities.forEach((item, i) => {
    //         if (i === 0) {
    //             temp += item.ability.name
    //         }
    //         else {
    //             temp += ', ' + item.ability.name
    //         }
    //     })

    //     return <h4>{temp}</h4>
    // }

    return (
        <div>
            <Header home={false} />
            {pokemonSelected !== undefined &&
                <Card pokemon={pokemonSelected} details={true}></Card>
            }
        </div>
    )
}