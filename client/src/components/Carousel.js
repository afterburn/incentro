import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import inverseClamp from '../utils/inverse-clamp'
import getImageUrl from '../utils/get-image-url'

const getXY = (e) => {
  if (e.touches && e.touches.length > 0) {
    return {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
  }
  return {
    x: e.clientX,
    y: e.clientY
  }
}

const Carousel = styled(({ className, title, data }) => {
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
    if (!e.touches) {
      e.preventDefault()
    }
    dragState.lmbPressed = true
    dragState.start = getXY(e)

    const items = itemsRef.current
    items.dataset.isDragged = true
  }

  const handleDrag = e => {
    if (dragState.lmbPressed) {
      const mouse = getXY(e)
      const items = itemsRef.current
      const firstChild = items.children[0]
      const firstChildRect = firstChild.getBoundingClientRect()

      const totalWidth = data.length * (firstChildRect.width + 16)
      if (totalWidth < window.innerWidth) {
        return
      }

      const min = 0
      const max = -totalWidth + window.innerWidth - 16
      const deltaX = dragState.start.x - mouse.x

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

  const handleResize = () => {
    const items = itemsRef.current
    items.dataset.offset = 0
    items.style.transform = `translate3d(0px, 0px, 0px)`
  }

  React.useEffect(() => {
    if (itemsRef.current && listRef.current) {
      const list = listRef.current

      list.addEventListener('wheel', handleScroll)
      list.addEventListener('dragstart', handleDragStart)
      list.addEventListener('touchstart', handleDragStart, { passive: true })
      window.addEventListener('mouseup', handleDragEnd)
      window.addEventListener('touchend', handleDragEnd)
      window.addEventListener('mousemove', handleDrag)
      window.addEventListener('touchmove', handleDrag)
      window.addEventListener('resize', handleResize)

      return () => {
        list.removeEventListener('wheel', handleScroll)
        list.removeEventListener('dragstart', handleDragStart)
        list.removeEventListener('touchstart', handleDragStart)
        window.removeEventListener('mouseup', handleDragEnd)
        window.removeEventListener('touchend', handleDragEnd)
        window.removeEventListener('mousemove', handleDrag)
        window.removeEventListener('touchmove', handleDrag)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [itemsRef.current, listRef.current])

  return <div className={className} ref={listRef}>
    <div className='header'>
      <h2>{title} ({data.length})</h2>
    </div>
    <div className='items' ref={itemsRef} draggable>
      {data.length > 0 && data.map((item, i) => 
        <CarouselItem
          key={i}
          data={item}
        />
      )}
      {data.length === 0 &&
        <div className='no-results'>
          <p>No results.</p>
        </div>
      }
    </div>
  </div>
})`
  width: 100%;
  user-select: none;
  overflow: hidden;
  margin: 12px 0;
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;

    h2 {
      display: block;
    }
  }
  
  .items {
    white-space: nowrap;
    width: 100%;
    will-change: transform;
    transform: translate3d(0px, 0px, 0px);

    .no-results {
      width: calc(100% - 16px);
      margin: 0 8px;
      height: 200px;
      background-color: rgba(0, 0, 0, .1);
      display: flex;
      justify-content: center;
      align-items: center;
      border-redius: var(--borderRadius);
    }
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
  width: var(--carouselItemSize);
  height: var(--carouselItemSize);

  @media only screen and (min-width: 768px) {
    width: calc(var(--carouselItemSize) * 2);
    height: calc(var(--carouselItemSize) * 2);
  }

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