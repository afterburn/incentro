import React from 'react'
import styled from 'styled-components'

import inverseClamp from '../utils/inverse-clamp'

const getImageUrl = (images) => {
  if (images.length === 0) {
    return '/not-found.webp'
  }
  return images[0].url
}

const Album = styled(({ className, data }) => {
  const { name } = data
  const imageUrl = getImageUrl(data.images)

  return <div className={className}>
    <div className='background' style={{ backgroundImage: `url('${imageUrl}')` }} />
    <div className='content'>
      <h3>{name}</h3>
    </div>
  </div>
})`
`

const Artist = styled(({ className, data }) => {
  const { name } = data
  const imageUrl = getImageUrl(data.images)

  return <div className={className}>
    <div className='background' style={{ backgroundImage: `url('${imageUrl}')` }} />
    <div className='content'>
      <h3>{name}</h3>
    </div>
  </div>
})``

const Track = styled(({ className, data }) => {
  const { name } = data
  const imageUrl = getImageUrl(data.album.images)

  return <div className={className}>
    <div className='background' style={{ backgroundImage: `url('${imageUrl}')` }} />
    <div className='content'>
      <h3>{name}</h3>
    </div>
  </div>
})``

const ItemTypes = {
  'album': Album,
  'artist': Artist,
  'track': Track
}

const List = styled(({ className, title, type, data }) => {
  const listRef = React.useRef()
  const itemsRef = React.useRef()

  const handleScroll = e => {
    if (e.deltaX === 0) {
      return
    }
    
    const totalWidth = data.length * (200 + 16)
    if (totalWidth < window.innerWidth) {
      return
    }

    const items = itemsRef.current
    const min = 0
    const max = -totalWidth + window.innerWidth - 16

    const currentOffset = Number(items.dataset.offset) || 0
    const newOffset = items.dataset.offset = inverseClamp(currentOffset - e.deltaX, min, max)
    items.style.transform = `translate3d(${newOffset}px, 0px, 0px)`
  }

  React.useEffect(() => {
    if (itemsRef.current && listRef.current) {
      const list = listRef.current
      list.addEventListener('wheel', handleScroll)
      return () => {
        list.removeEventListener('wheel', handleScroll)
      }
    }
  }, [itemsRef.current, listRef.current])

  return <div className={className} ref={listRef}>
    <h2>{title}</h2>
    <div className='items' ref={itemsRef}>
      {data.length > 0 && data.map((item, i) => {
        const ItemType = ItemTypes[item.type]
        return <ItemType
          key={i}
          data={item}
        />
      })}
      {data.length === 0 &&
        <p>No result(s).</p>
      }
    </div>
  </div>
})`
  width: 100%;
  user-select: none;
  overflow: hidden;
  
  h2 {
    display: block;
    padding: 8px;
  }

  .items {
    white-space: nowrap;
    width: 100%;
    will-change: transform;
    transform: translate3d(0px, 0px, 0px);
    
    > div {
      width: 200px;
      height: 200px;
      display: inline-block;
      margin: 8px;
      border-radius: 4px;
      overflow: hidden;
      position: relative;

      .background {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        width: 100%;
        height: 100%;
      }

      .content {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.75));
        padding: 12px;
        z-index: 10;
        visibility: hidden;
        opacity: 0;
        transition: opacity .2s ease-out,
          visibility 0s linear .2s;
      }

      &:hover {
        .content {
          visibility: visible;
          opacity: 1;
          transition: opacity .2s ease-in,
            visibility .2s linear;
        }
      }
    }
  }
`

export default List