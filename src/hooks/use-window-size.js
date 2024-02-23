import { useEffect, useState } from 'react'

export const useWindowSize = () => {
  const isSSR = typeof window !== 'undefined'
  
  const [windowSize, setWindowSize] = useState({
    width: isSSR ? 1400 : window.innerWidth,
    height: isSSR ? 1400 : window.innerHeight,
  })

  function changeWindowSize() {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
  }

  useEffect(() => {
    window.addEventListener("resize", changeWindowSize)

    return () => {
      window.removeEventListener("resize", changeWindowSize)
    }
  }, [])

  return windowSize
}

