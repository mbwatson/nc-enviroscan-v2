import { useLayoutEffect, useRef } from 'react'

export const useResizeObserver = callback => {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const element = ref?.current

    if (!element) {
      return
    }

    const observer = new ResizeObserver((entries) => {
      callback(element, entries[0])
    })

    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [callback, ref])

  return ref
}
