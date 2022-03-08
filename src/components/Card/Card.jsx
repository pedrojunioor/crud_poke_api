import React, { useState, useEffect } from "react";

import api from '../../config/api'
import { Button } from "../Button/Button";

import './Card.scss'

export function Card({ pokemon, details }) {

    const [pokemonDetails, setPokemonDetails] = useState(undefined)

    useEffect(() => {
        if (details) {
            setPokemonDetails(pokemon)
        }
        else {
            api.get(`pokemon/${pokemon.url.split('/')[6]}`).then(result => {
                setPokemonDetails(result.data)
            }).catch(error => {
                console.log(error)
            })
        }

    }, [pokemon])

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

    function showStats(stats) {
        return stats.map(stat => {
            return <div style={{ display: 'flex', justifyContent: 'space-between', gap: '40px' }}>
                <p style={{ fontWeight: "1000", fontFamily: 'Roboto' }}>{`${stat.stat.name}:   `}</p>
                <p style={{ textDecoration: 'underline', textAlign: 'flex-end' }}>{`${stat.base_stat}`}</p>
            </div>
        })
    }

    function showMoves(moves) {
        return moves.map(move => {
            return <div style={{ display: 'flex' }}>
                <p>{`${move.move.name},`}</p>
            </div>
        })
    }

    return (
        <div className='card-area'>
            <div className="card shadow">
                {pokemonDetails &&
                    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <div className="card-content">
                            <h2>#{pokemonDetails.id}</h2>
                            <div className="card-img">
                                <img src={pokemonDetails.sprites.other.dream_world.front_default} alt="" />
                            </div>
                            <h1>{pokemonDetails.name}</h1>
                            <div style={{display: 'flex', flexDirection: 'column',alignItems: 'center', fontWeight:"1000"}}>
                                <p>{`Heigth: ${pokemonDetails.height}`}</p>
                                <p>{`Weight: ${pokemonDetails.weight}`}</p>
                            </div>
                        </div>
                    </div>
                }

            </div>
            {pokemonDetails && details &&
                <div className="card-details">
                    {console.log(pokemonDetails)}
                    <div className='stats'>
                        <div>
                            <h2>Stats</h2>
                            {showStats(pokemonDetails.stats)}
                        </div>
                        <div>
                            <h2>Abilities</h2>
                            {showAbilities(pokemonDetails.abilities)}
                        </div>
                    </div>
                    <div>
                        <h2>Moves</h2>
                        <div className='moves'>
                            {showMoves(pokemonDetails.moves)}
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}