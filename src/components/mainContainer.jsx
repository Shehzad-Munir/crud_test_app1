import React from 'react'
import { motion } from 'framer-motion'
import {MdChevronLeft, MdChevronRight}  from 'react-icons/md'
import RowContainer from './RowContainer'
import { useStateValue } from '../context/StateProvider'
import { useState } from 'react'
import { useEffect } from 'react'


const MainContainer = () => {
  const [{foodItems,cartShow}, dispatch] = useStateValue();
  const [scrollValue,setScrollValue] =useState(0)
  useEffect(()=>{

  },[scrollValue,cartShow])
  useEffect(()=>{},[foodItems])

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">

      <section className='w-full my-6'>
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-300 to-orange-600 transition-all ease-in-out">
            Our Fresh & Healthy Meal
          </p>
          <div className="hidden md:flex gap-3 items-center">
            <motion.div whileTap={{scale:0.65}} onClick={()=> setScrollValue((previous)=> Math.sign(previous)===-1 ? previous - 200:0-200)} className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center">
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div whileTap={{scale:0.65}} onClick={()=> setScrollValue((previous)=> Math.sign(previous)!=-1 ? previous + 200:0+200)} className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center">
              <MdChevronRight className="text-lg text-white"/>
            </motion.div>

          </div>
        </div>
        {/* <RowContainer flag={true} data={foodItems?.filter(n=>n.category ==='fruits')} /> */}
        <RowContainer scrollValue={scrollValue}  flag={true} data={foodItems} />

      </section>

    </div>
  )
}

export default MainContainer