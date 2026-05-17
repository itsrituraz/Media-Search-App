import { useDispatch } from 'react-redux'
import { addCollection, addedToast } from '../redux/features/collectionSlice'

const ResultCard = ({ item }) => {
  const dispatch = useDispatch()

  const addToCollection = (item) => {
    dispatch(addCollection(item))
    dispatch(addedToast())
  }

  const handleDownload = async () => {
    if (item.type === 'video') {
      window.open(item.url, '_blank')
      return
    }
    try {
      const response = await fetch(item.src)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${item.title}.${item.type === 'gif' ? 'gif' : 'jpg'}`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Download failed', err)
    }
  }

  return (
    <div className='relative w-[18vw] h-80 overflow-hidden rounded bg-white'>

      <a target='_blank' rel='noreferrer' href={item.src}>
        {item.type === 'photo' && (
          <img loading='lazy' className='w-full h-full object-cover' src={item.src} alt={item.title} />
        )}
        {item.type === 'video' && (
          <video loading='lazy' className='w-full h-full object-cover' autoPlay loop muted src={item.src} />
        )}
        {item.type === 'gif' && (
          <img loading='lazy' className='w-full h-full object-cover' src={item.thumbnail} alt={item.title} />
        )}
      </a>

      <div
        id='bottom'
        className='absolute bottom-0 flex justify-between items-start w-full px-4 py-4 bg-gradient-to-t from-black/70 to-transparent text-white'
      >
        <h2 className='text-sm font-semibold capitalize h-14 overflow-hidden'>
          {item.title}
        </h2>

        <div className='flex gap-2 items-center'>
          <button
            onClick={() => addToCollection(item)}
            className='bg-indigo-600 active:scale-95 text-white rounded px-3 py-2 text-sm cursor-pointer font-medium'>
            Save
          </button>

          <button
            onClick={handleDownload}
            className='bg-white/20 backdrop-blur-sm active:scale-95 text-white rounded p-2 text-sm cursor-pointer font-medium'>
            {item.type === 'video' ? '↗' : '↓'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default ResultCard