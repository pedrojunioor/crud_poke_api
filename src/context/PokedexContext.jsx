import React, { createContext, useState, useEffect } from 'react';
import api from '../config/api'
import api2 from '../config/api2'
import history from '../history'

const ContextPokedex = createContext();

function PokedexContext({ children }) {

    const [pokemons, setPokemons] = useState(undefined)
    const [pokemonSelected, setPokemonSelected] = useState(undefined)

    const [next, setNext] = useState('')
    const [previous, setPrevious] = useState('')
    const [field, setField] = useState('')
    const [ability, setAbility] = useState('')

    useEffect(() => {
        if (pokemons === undefined) {
            handleGetPokemons()
        }
    })

    async function handleGetPokemons() {
        api.get('pokemon').then(result => {
            setPokemons(result.data.results)
            setNext(result.data.next)
            setPrevious(result.data.previous)
        }).catch(error => {
            console.error(error)
        })
    }

    async function handleGetPokemonsByName(event, string) {
        event.preventDefault()
        if (string.trim() === '') {
            api.get('pokemon').then(result => {
                setPokemons(result.data.results)
                setNext(result.data.next)
                setPrevious(result.data.previous)
            }).catch(error => {
                console.error(error)
            })
        }
        else {
            let pokemon = []
            api.get('pokemon/' + string).then(result => {
                console.log('RESULTADO', result.data)
                pokemon.push({
                    name: result.data.name,
                    url: 'https://pokeapi.co/api/v2/pokemon/' + result.data.id + '/'
                })
                setPokemons(pokemon)
                setNext(undefined)
                setPrevious(undefined)
            }).catch(error => {
                console.error(error)
            })
        }
    }

    async function handleGetPokemonsByAbility(event, string) {
        event.preventDefault()
        if (string.trim() === '') {
            api.get('pokemon').then(result => {
                setPokemons(result.data.results)
                setNext(result.data.next)
                setPrevious(result.data.previous)
            }).catch(error => {
                console.error(error)
            })
        } else {
            api.get('ability/' + string).then(result => {
                console.log('RESULTADO', result.data.pokemon)
                let pokemons = result.data.pokemon.map(item => {
                    return item.pokemon
                })
                setPokemons(pokemons)
                setNext(undefined)
                setPrevious(undefined)
            }).catch(error => {
                console.error(error)
            })
        }
    }

    async function handlePageNext() {
        api2.get(next).then(result => {
            setPokemons(result.data.results)
            setNext(result.data.next)
            setPrevious(result.data.previous)
        }).catch(error => {
            console.error(error)
        })

    }

    async function handlePagePrevious() {
        api2.get(previous).then(result => {
            setPokemons(result.data.results)
            setNext(result.data.next)
            setPrevious(result.data.previous)
        }).catch(error => {
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
            ability,
            setAbility,
            handleGetPokemons,
            handlePageNext,
            handlePagePrevious,
            setPokemonSelected,
            setField,
            handleGetPokemonsByName,
            handleGetPokemonsByAbility
        }}>
            {children}
        </ContextPokedex.Provider>
    );
}

export { ContextPokedex, PokedexContext };
