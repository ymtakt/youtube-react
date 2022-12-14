import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchSelectedData } from '../../apis/index'
import { Store } from '../../store/index'
import VideoPlay from '../VideoPlay/VideoPlay'
import Style from './VideoDetail.module.scss'
import ReactLinkify from 'react-linkify'

const VideoDetail = () => {
  const { globalState, setGlobalState } = useContext(Store)
  const location = useLocation()

  const setSelectedVideo = async () => {
    const searchParams = new URLSearchParams(location.search)
    const id = searchParams.get('v')
    // console.log('id', id)
    await fetchSelectedData(id).then((res) => {
      const item = res.data.items.shift()
      setGlobalState({ type: 'SET_SELECTED', payload: { selected: item } })
      // console.log('res', res)
    })
  }

  useEffect(() => {
    setSelectedVideo()
  }, [location.search])

  return globalState.selected.selected && globalState.selected.selected.id ? (
    <div className={Style.wrap}>
      <VideoPlay id={globalState.selected.selected.id} />
      <p>{globalState.selected.selected.snippet.title}</p>
      <hr />
      <ReactLinkify>
        <pre>{globalState.selected.selected.snippet.description}</pre>
      </ReactLinkify>
    </div>
  ) : (
    <span>no data</span>
  )
}

export default VideoDetail