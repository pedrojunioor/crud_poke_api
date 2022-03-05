import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory, Link } from 'react-router-dom';

import { ContextPokedex } from "../../context/PokedexContext";
// import { Button } from "../../components/Button/Button";
import { Header } from '../../components/Header/Header'
import api from '../../config/api'

import './PokemonDetails.scss'

import { Button } from '../../components/Button/Button'


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

    function showAbilities(abilities) {
        let temp = ''
        abilities.forEach((item, i) => {
            if (i === 0) {
                temp += item.ability.name
            }
            else {
                temp += ', ' + item.ability.name
            }
        })

        return <h4>{temp}</h4>
    }

    return (
        <div>
            <Header home={false} />
            {pokemonSelected !== undefined &&
                <div class="cardd">
                    <div class="card-border-top">
                    </div>
                    <div class="img">
                        <img src={pokemonSelected.sprites.front_default} alt="" />
                    </div>
                    <span> {pokemonSelected.name}</span>
                    <p class="job"> {showAbilities(pokemonSelected.abilities)}</p>
                    <Button> Adicionar a um Deck </Button>
                </div>
            }

        </div>
    )
}