import React, { useState, useEffect,useContext } from "react";
import { Header } from "../../components/Header/Header"

import api from '../../config/api'
import {Catalog} from '../../components/Catalog/Catalog'
import { collection, addDoc, getDocs } from "firebase/firestore";

import { database } from '../../services/firebase'

import {ContextPokedex} from '../../context/PokedexContext'

// import { CategoryBar } from "../../components/CategoryBar/CategoryBar";
// import {Catalog} from '../../components/Catalog/Catalog'

export function Home() {

    

    // const [users, setUsers] = useState([])

    // function handleGetUser(delta) {
    //     let users = []
    //     delta.forEach(item=>{
    //         users.push(JSON.parse(item))
    //     })
    //     setUsers(users);
    // }

    // useEffect(() => {
    //     if(users.length > 0) {
    //         console.log('NO USE EFFECT',users);
    //     }
    // }, [users])

  

    function getAll(){
        api.get('pokemon?limit=1126').then(result => {
            console.log(result.data);
        })
    }

    return (
        <div>
            <Header home={true} />
            <Catalog/>
        </div>
    )
}