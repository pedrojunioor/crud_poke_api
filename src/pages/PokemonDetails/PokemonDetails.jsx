import React,{ useState,useEffect,useContext} from "react";
import { useParams,useHistory } from 'react-router-dom';

import { ContextPokedex } from "../../context/PokedexContext";
import { Button } from "../../components/Button/Button";
import api from '../../config/api'

export function PokemonDetails(){

    const { pokemonSelected,setPokemonSelected } = useContext(ContextPokedex)

    const params = useParams();
    const history = useHistory();

    const pokeId = params.id;

    useEffect(() =>{
        console.log('sffdfdfd')
        if(pokemonSelected === undefined){
            api.get('pokemon/'+pokeId).then(result =>{
                console.log(result)
                setPokemonSelected(result.data)
            })
        }
    },[pokeId])

    return (
        <div>
            <Button estilo='btn2' onClick={()=>{history.push('/')}}>VOLTAR</Button>
            POKEMON
        </div>
    )
}