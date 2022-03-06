import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'

import { collection, doc,setDoc, addDoc, getDocs, getDoc, query, where } from "firebase/firestore";
import { database, auth, firebase } from '../../services/firebase'


export function Decks() {

    const params = useParams()

    const userId = params.id

    const [decks,setDecks] = useState([])

    function handleDecks(data){
        setDecks([
            ...decks,
            data
        ])
    }

    useEffect(() => {
        getDecks()
    },[])

    async function getDecks() {
        const docRef = doc(database, "users",`${userId}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setDecks(docSnap.data().decks)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    return (
        <div>
            {JSON.stringify(decks)}
           
        </div>
    )
}