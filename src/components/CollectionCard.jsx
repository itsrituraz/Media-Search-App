import React from 'react'
import { useDispatch } from 'react-redux'
import { removeCollection, removeToast } from '../redux/features/collectionSlice'

const CollectionCard = ({item}) => {

  const dispatch = useDispatch()

  const removeFromCollection = (item) =>{
    dispatch(removeCollection(item.id))
    dispatch(removeToast())

  }
  return (
    <div>
      <div className='relative w-[18vw] h-80 overflow-hidden rounded bg-white'>

      <a target='_blank' rel='noreferrer' href={item.src}>

        {item.type === 'photo' ? (
          <img
            className='w-full h-full object-cover'
            src={item.src}
            alt={item.title}
          />
        ) : null}

        {item.type === 'video' ? (
          <video
            className='w-full h-full object-cover'
            autoPlay
            loop
            muted
            src={item.src}
          />
        ) : null}

        {item.type === 'gif' ? (
          <img
            className='w-full h-full object-cover'
            src={item.src}
            alt={item.title}
          />
        ) : null}

      </a>

      <div
        id='bottom'
        className='absolute bottom-0 flex justify-between items-start w-full px-4 py-4 bg-gradient from-black/70 to-transparent text-white'
      >
        <h2 className='text-sm font-semibold capitalize h-14 overflow-hidden'>
          {item.title}
        </h2>

        <button 
        onClick={()=>
          removeFromCollection(item)
        }
          className='bg-indigo-600 active:scale-95 text-white rounded px-3 py-2 text-sm cursor-pointer font-medium'>
          Remove
        </button>
      </div>
    </div>
    </div>
  )
}

export default CollectionCard
