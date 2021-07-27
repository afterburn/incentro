import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import inverseClamp from '../utils/inverse-clamp'
import getImageUrl from '../utils/get-image-url'

const Carousel = styled(({ className, title, type, data }) => {
  const listRef = React.useRef()
  const itemsRef = React.useRef()

  const dragState = {
    lmbPressed: false
  }

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

  const handleDragStart = (e) => {
    e.preventDefault()
    dragState.lmbPressed = true
    dragState.start = {
      x: e.clientX || e.touches[0].clientX,
      y: e.clientY || e.touches[0].clientY
    }
    
    const items = itemsRef.current
    items.dataset.isDragged = true
  }

  const handleDrag = e => {
    if (dragState.lmbPressed) {
      const mouse = {
        x: e.clientX || e.touches[0].clientX,
        y: e.clientY || e.touches[0].clientY
      }
    
      const totalWidth = data.length * (200 + 16)
      if (totalWidth < window.innerWidth) {
        return
      }

      const min = 0
      const max = -totalWidth + window.innerWidth - 16

      const deltaX = dragState.start.x - mouse.x

      const items = itemsRef.current
      const currentOffset = Number(items.dataset.offset) || 0
      const newOffset = items.dataset.tmpOffset = inverseClamp(currentOffset - deltaX, min, max)
      items.style.transform = `translate3d(${newOffset}px, 0px, 0px)`
    }
  }

  const handleDragEnd = (e) => {
    if (dragState.lmbPressed) {
      const items = itemsRef.current
      items.dataset.offset = items.dataset.tmpOffset
      items.dataset.isDragged = false
      delete items.dataset.tmpOffset
      
      dragState.lmbPressed = false
    }
  }

  React.useEffect(() => {
    if (itemsRef.current && listRef.current) {
      const list = listRef.current

      list.addEventListener('wheel', handleScroll)
      list.addEventListener('dragstart', handleDragStart)
      list.addEventListener('touchstart', handleDragStart)
      window.addEventListener('mouseup', handleDragEnd)
      window.addEventListener('touchend', handleDragEnd)
      window.addEventListener('mousemove', handleDrag)
      window.addEventListener('touchmove', handleDrag)

      return () => {
        list.removeEventListener('wheel', handleScroll)
        list.removeEventListener('dragend', handleDragStart)
        list.removeEventListener('touchstart', handleDragStart)
        window.removeEventListener('mouseup', handleDragEnd)
        window.removeEventListener('touchend', handleDragEnd)
        window.removeEventListener('mousemove', handleDrag)
        window.removeEventListener('touchmove', handleDrag)
      }
    }
  }, [itemsRef.current, listRef.current])

  return <div className={className} ref={listRef}>
    <h2>{title}</h2>
    <div className='items' ref={itemsRef} draggable>
      {data.length > 0 && data.map((item, i) => 
        <CarouselItem
          key={i}
          data={item}
        />
      )}
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
  }
`

const CarouselItem = styled(({ className, data }) => {
  const history = useHistory()

  const { name } = data
  const imageUrl = getImageUrl(data.images)

  const handleMouseUp = e => {
    if (e.currentTarget.parentElement.dataset.isDragged !== 'true') {
      history.push(`/${data.type}/${data.id}`)
    }
  }

  return <div className={className} onMouseUp={handleMouseUp}>
    <div className='background' style={{ backgroundImage: `url('${imageUrl}')` }} />
    <div className='content'>
      <h3>{name}</h3>
    </div>
  </div>
})`
  width: 200px;
  height: 200px;
  display: inline-block;
  margin: 8px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  user-select: none;

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
`

export default Carousel