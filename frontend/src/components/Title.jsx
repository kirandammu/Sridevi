import React from 'react'

const Title = ({text1, text2}) => {
  return (
    <div className='flex items-center mx-auto justify-center py-3 gap-2'>
              <p className='w-20 h-0.5 bg-gray-700'></p>
              <div className='font-semibold text-xl uppercase text-[red]'>{text1} <span className='text-black'>{text2}</span></div>
              <p className='w-20 h-0.5 bg-[red]'></p>
        </div> 
  )
}

export default Title
