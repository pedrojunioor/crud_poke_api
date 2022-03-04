import React,{useState,useEffect} from "react";

import api from '../../config/api'

import './Card.scss'

export function Card (pokemon){

    const [pokemonDetails,setPokemonDetails] = useState(undefined)

    useEffect(()=>{
        api.get(`pokemon/${pokemon.pokemon.url.split('/')[6]}`).then(result => {
            setPokemonDetails(result.data)
        }).catch(error => {
            console.log(error)
        })
    },[pokemon])
    
    return (
        <div className="card shadow">
            {pokemonDetails && <div>
                <h1>{pokemonDetails.name}</h1>
            </div> }
        </div>
    )
}