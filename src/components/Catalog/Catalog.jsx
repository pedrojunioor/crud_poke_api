import React, { useContext, useEffect, useState } from "react";
import { ContextPokedex } from '../../context/PokedexContext'
import { useHistory } from 'react-router-dom'
import { Button } from '../Button/Button'
import { Card } from '../Card/Card'
import { Modal } from '../Modal/Modal'


import './Catalog.scss';


export function Catalog() {

    const { pokemons, next, previous, handleGetPokemons, handlePageNext, handlePagePrevious } = useContext(ContextPokedex)

    const history = useHistory();

    function showPokemons() {
        return pokemons.map((pokemon, i) => {
            return <div key={i} style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                <div onClick={() => history.push(`/pokemon/${pokemon.url.split('/')[6]}`)}>
                    <Card pokemon={pokemon}></Card>
                </div>
                <div className="add-to-deck">
                    <Button estilo='btn2' onClick={() => console.log('ADD',pokemon.url.split('/')[6])}>Add To Deck</Button>
                </div>


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