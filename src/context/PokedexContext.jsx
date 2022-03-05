import React, { createContext, useState, useEffect } from 'react';
import api from '../config/api'
import api2 from '../config/api2'
import history from '../history'

const ContextPokedex = createContext();

function PokedexContext({ children }) {

    const [pokemons, setPokemons] = useState(undefined)
    const [pokemonSelected, setPokemonSelected] = useState(undefined)

    const [next,setNext] = useState('')
    const [previous,setPrevious] = useState('')
    const [field, setField] = useState('')

    useEffect(() => {
        if (pokemons === undefined) {
            handleGetPokemons()
        }
    })

    useEffect(() => {
        console.log('AQUi',pokemons)
    },[pokemons])

    async function handleGetPokemons(){
        api.get('pokemon').then(result => {
            setPokemons(result.data.results)
            setNext(result.data.next)
            setPrevious(result.data.previous)
        }).catch(error=>{
            console.error(error)
        })
    }
    async function handleGetPokemonsWithFilter(event,string){
        event.preventDefault()
        if(string.trim() === ''){
            api.get('pokemon').then(result => {
                setPokemons(result.data.results)
                setNext(result.data.next)
                setPrevious(result.data.previous)
            }).catch(error=>{
                console.error(error)
            })
        }
        else{
            console.log('https://pokeapi.co/api/v2/'+'pokemon/'+string)
            let pokemon = []
            api.get('pokemon/'+string).then(result => {
                console.log(result.data)
                pokemon.push({
                    id: result.data.id,
                    url: result.data.name
                })
                setPokemons(pokemon)
                setNext(undefined)
                setPrevious(undefined)
            }).catch(error=>{
                console.error(error)
            })
        }  
    }

    async function handlePageNext(){
        api2.get(next).then(result => {
            setPokemons(result.data.results)
            setNext(result.data.next)
            setPrevious(result.data.previous)
        }).catch(error=>{
            console.error(error)
        })

    }

    async function handlePagePrevious(){
        api2.get(previous).then(result => {
            setPokemons(result.data.results)
            setNext(result.data.next)
            setPrevious(result.data.previous)
        }).catch(error=>{
            console.error(error)
        })
    }

    return (
        <ContextPokedex.Provider value={{
            pokemons,
            next,
            previous,
            pokemonSelected,
            field,
            handleGetPokemons,
            handlePageNext,
            handlePagePrevious,
            setPokemonSelected,
            setField,
            handleGetPokemonsWithFilter
        }}>
            {children}
        </ContextPokedex.Provider>
    );
}

export { ContextPokedex, PokedexContext };
