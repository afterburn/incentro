import React from "react"

export default () => {
  const [width, setWidth] = React.useState(window.innerWidth)

  const handleResize = () => {
    setWidth(window.innerWidth)
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return width <= 768
}