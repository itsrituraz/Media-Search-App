import { useDispatch, useSelector } from "react-redux"
import { fetchPhotos, fetchVideos, fetchGIF } from "../api/mediaApi"
import { setQuery, setLoading, setError, setResults } from "../redux/features/searchSlice"
import { useEffect } from 'react'
import ResultCard from "./ResultCard"

const ResultGrid = () => {

  const dispatch = useDispatch()
  const {query,activeTab,results,loading,error} = useSelector((store) => store.search)

  useEffect(() => {
    if(!query) return
    let cancelled = false
    const getData = async () => {
      try {
        dispatch(setLoading())
        let data = []
        if (activeTab === 'photos') {
          let response = await fetchPhotos(query)
          data = response.results.map((item) => ({
            id: item.id,
            type: 'photo',
            title: item.alt_description || 'photo',
            thumbnail: item.urls.small,
            src: item.urls.regular
          }))
        }
        if (activeTab === 'videos') {
          let response = await fetchVideos(query)
          data = response.videos.map((item) => ({
            id: item.id,
            type: 'video',
            title: item.user.name || 'video',
            thumbnail: item.image,
            src: item.video_files[0]?.link,
            url:item.url
          }))
        }
        if (activeTab === 'GIF') {
          let response = await fetchGIF(query)
          data = response.data.map((item) => ({
            id: item.id,
            title: item.title || 'GIF',
            type: 'gif',
            thumbnail: item.images.fixed_height_small.url,
            src: item.images.fixed_height_small.url,
            url:item.url
          }))
        }
        if(! cancelled) {
          dispatch(setResults(data))
        } 
      }catch (err){
      if(!cancelled) {
         dispatch(setError(err.message))
      }
      }
    }
    getData()
    return ()=> { cancelled = true }
  },[query,activeTab,dispatch])

    if (error) {
  return (
    <div className="flex flex-col justify-center items-center h-[70vh] gap-4">
      
      <h1 className="text-red-500 text-4xl font-bold">
        Oops!
      </h1>

      <p className="text-gray-400 text-lg">
        Failed to fetch media
      </p>

    </div>
  )
}
    if (loading) {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <h1 className="text-3xl font-semibold text-gray-300 animate-pulse">
        Loading...
      </h1>
    </div>
  )
}
    if (!loading && results.length === 0) {
  return (
    <h1 className="text-center text-3xl text-gray-400 mt-20">
      No Results Found
    </h1>
  )
}

    return (
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10 py-6">

  {
    results.map((item) => {
      return (
        <div key={item.id}>
          <ResultCard item={item} />
        </div>
      )
    })
  }

</div>

  )
}
export default ResultGrid
