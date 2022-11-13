import React, { useState } from 'react'
import logo from '../img/logo.png'
import avatar from '../img/avatar.png'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';
import {MdShoppingBasket, MdAdd, MdLogout} from 'react-icons/md'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { saveUser } from '../utils/firebaseFunctions';

const Header = () => {

  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider();
  const [isMenu,setisMenu] = useState(false);
  const [{user,cartShow,cartItems},dispatch] = useStateValue()
  const login = async () =>{
    if(!user)
    {
      const {user:{refreshToken,providerData}} = await signInWithPopup(firebaseAuth,provider)
      dispatch({
        type:actionType.SET_USER,
        user: providerData[0]
      })
      const userdetail=
      {
        user: providerData[0],
        address: '',
        phoneNo:''
      }

      saveUser(providerData[0].uid, userdetail)
      localStorage.setItem('user',JSON.stringify(providerData[0]))
    }
    else
    {
      setisMenu(!isMenu)
    }  
  }
  const logout = ()=>
  {
    setisMenu(false)
    localStorage.clear()
    dispatch({
      type:actionType.SET_USER,
      user:null
    })
  }
  const showCart =()=>
  {


  }
  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* desktop & Tabled */}
      <div className='hidden md:flex w-full h-full items-center justify-between '>
        <Link to={'/'} className='flex items-center gap-2'>
          <img className='w-8 object-cover' src={logo} alt="" />
          <p className='text-headingColor text-xl font-bold '>CityCafe</p>
        </Link>
        <div className='flex items-center gap-8'>
          <motion.ul 
            initial={{opacity:0, x:200}}
            animate={{opacity:1, x:0}}
            exit={{opacity:0, x:200}}
             className='flex items-center gap-8 '>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">
            <Link to={'/'}>Home</Link></li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">Menu</li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">About Us</li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">Service</li>
          </motion.ul>
          <div className='relative flex items-center justify-center ' onClick={showCart}>
            <MdShoppingBasket className='text-textColor text-2xl  cursor-pointer'/>
            {cartItems && cartItems.length >0 && (
              <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                <p className='text-xs text-white  font-semibold '>{cartItems.length}</p>
              </div>

            )}
            

          </div>
          <div className='relative'>
            <motion.img 
              whileTap={{scale:0.6}} 
              src={user? user.photoURL: avatar} 
              onClick={login}
              className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full' 
              alt="userProfile" />
            {isMenu &&

              (<motion.div 
                initial={{opacity:0, scale:0.6}}
                animate={{opacity:1, scale:1}}
                exit={{opacity:0, scale:0.6}}
                 className='w-40 bg-gray-50 shadow-xl flex flex-col rounded-lg absolute top-12 right-0 '>
               
                {
                  user && user.email ==='shehzadbaloch984@gmail.com' && (
                    <Link to={'/createItem'}>
                      <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base'
                      onClick={()=> setisMenu(false)}
                      ><MdAdd/> New Item</p>

                    </Link>
                  )
                }
                <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base'
                onClick={logout}><MdLogout/> Logout</p>
              </motion.div>)
            }


          </div>
        </div>


      </div>
      {/* mobile */}
      <div className='flex md:hidden  w-full h-full items-center justify-between  '>
          <div className='relative flex items-center justify-center ' onClick={showCart}>
            <MdShoppingBasket className='text-textColor text-2xl  cursor-pointer'/>
            {cartItems && cartItems.length >0 && (
              <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                <p className='text-xs text-white  font-semibold '>{cartItems.length}</p>
              </div>

            )}
            

          </div>
        <Link to={'/'} className='flex items-center gap-2'>
          <img className='w-8 object-cover' src={logo} alt="" />
          <p className='text-headingColor text-xl font-bold '>CityCafe</p>
        </Link>
        <div className='relative'>
            <motion.img 
              whileTap={{scale:0.6}} 
              src={user? user.photoURL: avatar} 
              onClick={login}
              className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full' 
              alt="userProfile" />
            {isMenu &&
              (<motion.div 
                initial={{opacity:0, scale:0.6}}
                animate={{opacity:1, scale:1}}
                exit={{opacity:0, scale:0.6}}
                 className='w-40 bg-gray-50 shadow-xl flex flex-col rounded-lg absolute top-12 right-0 '>
                {
                  user && user.email ==='shehzadbaloch984@gmail.com' && (
                    <Link to={'/createItem'}>
                      <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base' onClick={()=> setisMenu(false)}>New Item <MdAdd/></p>

                    </Link>
                  )
                }
                <ul
                  className='flex flex-col gap-3'>
                  <li className="text-base px-4 py-2 text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100" onClick={()=> setisMenu(false)}>Home</li>
                  <li className="text-base px-4 py-2 text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100" onClick={()=> setisMenu(false)}>Menu</li>
                  <li className="text-base px-4 py-2 text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100" onClick={()=> setisMenu(false)}>About Us</li>
                  <li className="text-base px-4 py-2 text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100" onClick={()=> setisMenu(false)}>Service</li>
                </ul>
                <p className='m-2 p-2 rounded-md shadow-md flex items-center gap-3 cursor-pointer justify-center bg-slate-200 hover:bg-red-300 transition-all duration-100 ease-in-out text-textColor text-base'
                onClick={logout}>Logout <MdLogout/></p>
              </motion.div>)
            }


          </div>

      </div>
    </header>

  )
}

export default Header