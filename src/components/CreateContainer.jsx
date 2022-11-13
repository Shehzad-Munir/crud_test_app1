import React, { useState,useEffect } from 'react'
import { motion } from 'framer-motion'
import { MdFastfood,MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney } from 'react-icons/md'
import { categories } from '../utils/data';
import Loader from './Loader';
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import { storage } from '../firebase.config';
import { getAllFoodItems, getFoodItem, saveItem, updateItem } from '../utils/firebaseFunctions';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';


const CreateContainer = () => {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger")
  const[msg, setMsg] = useState(null)
  const[isLoading, setIsLoading] = useState(false)
  const[imageAssets, setImageAssets] = useState(false) 

  let location = useLocation();
  let item_id = location.search.replace("?","")
  const [idData, setIdData] = useState({})
  console.log(item_id)
  useEffect(() => {
    if(item_id != '')
    {
      console.log(getFoodItem(item_id))
      const data =  getFoodItem(item_id).then((response) => response).then((it) => {
        setIdData(it)
    });}
    
  }, [item_id])



  const uploadImage=(e)=>
  {
    setIsLoading(true)
    const imageFile = e.target.files[0]
    console.log(imageFile)
    const storageRef = ref(storage,`Images/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef,imageFile)
    uploadTask.on('state_changed',(snapshot)=>{
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    },(error)=>{
      console.log(error)
      setFields(true)
      setMsg("Error while uploading image")
      setAlertStatus('danger')
      setTimeout(()=>{
        setFields(false)
        setIsLoading(false)

      },4000)
    },()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl =>{setImageAssets(downloadUrl)
      setIsLoading(false)
      setFields(true)
      setMsg('Image Uploaded successfully')
      setAlertStatus('success')
      setTimeout(()=>{
        setFields(false)
        setIsLoading(false)

      },4000)
    })
    })

  }
  const deleteImage=()=>
  {
    setIsLoading(true)
    const deleteRef = ref(storage,imageAssets)
    deleteObject(deleteRef).then(()=>{
      setImageAssets(null)
      setIsLoading(false)
      setFields(true)
      setMsg('Image Deleted successfully')
      setAlertStatus('success')
      setTimeout(()=>{
        setFields(false)
        setIsLoading(false)

      },4000)
    })


  }
  const clearData = ()=>
  {
    setTitle("")
    setImageAssets(null)
    setCalories("")
    setPrice("")
    setCategory("Select Category")
  }

  const saveDetail= ()=>
  {
    setIsLoading(true)
    try 
    {

        const data ={
          id: `${item_id == ''? Date.now(): item_id}`,
          title: title == '' && item_id != '' ? idData.title : title,
          imageUrl: imageAssets == '' && item_id != '' ? idData.imageUrl : imageAssets,
          category: category == '' && item_id != '' ? idData.category : category,
          calories: calories == '' && item_id != '' ? idData.calories : calories,
          qty: 1,
          price: price == '' && item_id != '' ? idData.price : price
        }
        if(item_id != '')
        {
          updateItem(item_id,data)
          console.log('updated')

        }
        else
        {
          saveItem(data)
        }
        setIsLoading(false)
        setFields(true)
        setMsg('Data Uploaded successfully')
        clearData()
        setAlertStatus('success')
        setTimeout(()=>{
          setFields(false)
          setIsLoading(false)
          
        },4000)
        fetchData()
      
      
    } catch (error) {
      console.log(error)
      setFields(true)
      setMsg("Error while uploading image")
      setAlertStatus('danger')
      setTimeout(()=>{
        setFields(false)
        setIsLoading(false)

      },4000)
      
    }

  }
  const [{foodItems}, dispatch] = useStateValue();
  const fetchData = async () =>{
    await getAllFoodItems().then((data) =>{
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data
      })
    })
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center ">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {
          fields && (
            <motion.p 
              initial={{opacity:0}}
              animate={{opacity:1}}
              exit={{opacity:0}}
              className={`w-full  p-2 rounded-lg text-center text-lg  ${alertStatus === "danger"? " bg-red-400 text-red-800":" bg-emerald-400 bg-emerald-800 text-white"}`}>
              {msg}
            </motion.p>
          )
        }
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className='text-xl text-gray-700'/>
          <input type="text" name="" id="" value={title} onChange={(e)=> setTitle(e.target.value)} placeholder="Enter a Food Name"
          className='w-full h-full text-lg bg-transparent  outline-none border-none placeholder:text-gray-400 text-textColor' />

        </div>
        <div 
          className="w-full"
        >
          <select name="" id="" 
            onChange={(e)=>setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer">
            <option value="Other" className='bg-white'>Select Category</option>
            {
            categories && categories.map((cat)=>(
              <option value={cat.urlParamName} key={cat.id} className="text-base border-0 outline-none capitalize bg-white text-textColor">{cat.name}</option>
            ))
            }
          </select>

        </div>

        <div className='group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-255 md:h-420 cursor-pointer rounded-lg'>
          {isLoading ? (<Loader />): (
          <>
          {!imageAssets ? 
          <>
            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
              <div className="w-full h-full flex flex-col items-center justify-center  gap-2">
                <MdCloudUpload className='text-gray-500  text-3xl hover:text-gray-700' />
                <p className="text-gray-500 hover:text-gray-700">Click Here to Upload</p>

              </div>
              <input type="file" name="UploadImage" accept='image/*' className='w-0 h-0' onChange={uploadImage}  />
            </label>
          </> :
          <>
            <div className="relative h-full">
              <img src={imageAssets} alt="uploaded image" className="w-full h-full object-cover" />
              <button type='button' className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
              onClick={deleteImage}
              ><MdDelete className="text-white" /></button>
            </div>
          </>}

          </>)}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input type="text" required placeholder='Calories' value={calories} onChange={(e)=> setCalories(e.target.value)} className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor' />

          </div>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input type="text" required placeholder='Price' value={price} onChange={(e)=> setPrice(e.target.value)} className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor' />

          </div>
        </div>
        <div className="flex items-center w-full">
          <button type='button' className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold" onClick={saveDetail}>
            Save

          </button>

        </div>
  

      </div>
    </div>
  )
}

export default CreateContainer