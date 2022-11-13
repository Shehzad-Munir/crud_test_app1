import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {IoFastFood} from 'react-icons/io5'
import { categories } from '../utils/data'
import { motion } from 'framer-motion'
import RowContainer from './RowContainer'
import { useStateValue } from '../context/StateProvider'
const MenuContainer = () => {
    const [filter, setFilter] = useState("chicken")
    const [{foodItems}, dispatch] = useStateValue();

  return (
    <section className='w-full my-6' id="menu">
        <div className='w-full flex flex-col items-center justify-center'>
            <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-300 to-orange-600 transition-all ease-in-out mr-auto">
            Our Hot Dishes
            </p>

            <div className='w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none'>
                {
                    categories && categories.map((category)=>
                    (
                        <motion.div whileTap={{scale:0.75}} key={category.id} onClick={()=>setFilter(category.urlParamName)} className={`group ${filter === category.urlParamName ?' bg-red-400 ':' bg-card '} w-24 min-w-[94px] h-28 hover:bg-red-400 cursor-pointer rounded-lg shadow-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center `}>
                            <div className={`w-10 h-10 rounded-full ${filter === category.urlParamName ?'bg-card ':' bg-red-400 '} group-hover:bg-card flex items-center justify-center `}>
                                <IoFastFood className={`${filter === category.urlParamName ?'text-textColor ':' text-card '} text-lg shadow-lg group-hover:text-textColor `}/>
                            </div>
                            <p className='text-sm text-textColor group-hover:text-card'>{category.name}</p>

                        </motion.div>

                    ))
                } 
            </div>
            <div className='w-full'>
                 {/* <RowContainer flag={true} data={foodItems?.filter(n=>n.category ==='fruits')} /> */}
                <RowContainer  flag={false} data={foodItems?.filter(n=>n.category ===filter)}/>
            </div>

        </div>
    </section>
  )
}

export default MenuContainer