// saving items

import { collection, doc, getDoc, getDocs, orderBy, query, setDoc } from "firebase/firestore"
import { firestore } from "../firebase.config"

export const saveItem = async (data)=>{
    await setDoc(doc(firestore,'foodItems', `${Date.now()}`), data, {merge: true})
}
export const saveUser = async (Uid,data)=>{
    await setDoc(doc(firestore,'userDetail', `${Uid}`), data, {merge: true})
}

// GET DATA

export const getAllFoodItems = async ()=>{
    const items = await getDocs(query(collection(firestore,"foodItems"), orderBy("id","desc")))

    return items.docs.map((doc)=> doc.data())
}