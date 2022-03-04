import React, { useState, useEffect,useContext } from "react";
import { Header } from "../../components/Header/Header"
import {Catalog} from '../../components/Catalog/Catalog'
import { collection, addDoc, getDocs } from "firebase/firestore";

import { database } from '../../services/firebase'

import {ContextPokedex} from '../../context/PokedexContext'

// import { CategoryBar } from "../../components/CategoryBar/CategoryBar";
// import {Catalog} from '../../components/Catalog/Catalog'

export function Home() {

    
    // async function teste() {
    //     console.log('ENTROU')
    //     try {
    //         const docRef = await addDoc(collection(database, "users"), {
    //             first: "Ada",
    //             last: "Lovelace",
    //             born: 1815
    //         });
    //         console.log("Document written with ID: ", docRef.id);
    //     } catch (e) {
    //         console.error("Error adding document: ", e);
    //     }
    // }


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

    // async function getUsers() {
    //     const querySnapshot = await getDocs(collection(database, "users"));
    //     let users = []
    //     querySnapshot.forEach((doc) => {
    //         users.push(JSON.stringify(doc.data()))
    //     });
    //     // console.log('NA FUNCAO',users)
    //     handleGetUser(users)
    // }

    return (
        <div>
            <Header />
            <Catalog/>

        </div>
    )
}