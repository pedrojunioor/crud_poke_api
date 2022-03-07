import React, { useState, useEffect,useContext } from "react";
import { Header } from "../../components/Header/Header"

import api from '../../config/api'
import {Catalog} from '../../components/Catalog/Catalog'
import { collection, addDoc, getDocs } from "firebase/firestore";

import { database } from '../../services/firebase'

import {ContextPokedex} from '../../context/PokedexContext'
export function Home() {

    return (
        <div>
            <Header home={true} />
            <Catalog/>
        </div>
    )
}