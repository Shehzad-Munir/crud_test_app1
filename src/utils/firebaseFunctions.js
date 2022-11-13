// saving items

import { collection, deleteDoc, doc, documentId, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore"
import { firestore } from "../firebase.config"

export const saveItem = async (data)=>{
    await setDoc(doc(firestore,'foodItems', `${Date.now()}`), data, {merge: true})
}
export const saveUser = async (Uid,data)=>{
    await setDoc(doc(firestore,'userDetail', `${Uid}`), data, {merge: true})
}
export const updateItem = async (id,data)=>{
    await updateDoc(doc(firestore,'foodItems', `${id}`), data)

}
export const deleteItems = async (id)=>{
    await deleteDoc(doc(firestore,'foodItems', `${id}`))
    
}

// GET DATA

export const getAllFoodItems = async ()=>{
    const items = await getDocs(query(collection(firestore,"foodItems"), orderBy("id","desc")))

    return items.docs.map((doc)=> doc.data())
}
export const getFoodItem = async (id)=>{
    const docRef =doc(firestore, "foodItems", id);
    const docSnap = await getDoc(docRef);

  
    return docSnap.data();
}