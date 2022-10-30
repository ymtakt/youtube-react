import React, { useEffect, useContext } from 'react'
import Layout from '../components/Layout/Layout'
import { fetchPopularData } from '../apis/index'
import { Store } from '../store/index'
import VideoGrid from '../components/VideoGrid/VideoGrid'
import VideoGridItem from '../components/VideoGridItem/VideoGridItem'
import SideList from '../components/SideList/SideList'
import { useLocation } from 'react-router-dom'
import { fetchSelectedData, fetchRelatedData } from '../apis/index'

const Top = () => {


  const { globalState, setGlobalState } = useContext(Store)
  const location = useLocation()

  const setViedos = async () => {
    const searchParams = new URLSearchParams(location.hash.search)
    const id = searchParams.get('v')
    if (id) {
      const [selected, related] = await Promise.all([fetchSelectedData(id), fetchRelatedData(id)])
      setGlobalState({ type: 'SET_SELECTED', payload: { selected: selected.data.items.shift() } })
      setGlobalState({ type: 'SET_RELATED', payload: { related: related.data.items } })
    }
  }

  useEffect(() => {
    setViedos()
  }, [location.search])

  // console.log(globalState.popular)

  useEffect(() => {
    fetchPopularData().then((res) => {
      // console.log('data', res)
      setGlobalState({ type: 'SET_POPULAR', payload: { popular: res.data.items } })
    })
  }, [])

  return (
    <Layout>
      <VideoGrid>
        {
          globalState.popular.popular && globalState.popular.popular.map((popular) => {
            return (
              <VideoGridItem
                id={popular.id}
                key={popular.id}
                src={popular.snippet.thumbnails.default.url}
                title={popular.snippet.title}
              />
            )
          })
        }
      </VideoGrid>
      <SideList />
    </Layout>
  )
}

export default Top