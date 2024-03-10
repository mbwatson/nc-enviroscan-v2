import { useCallback } from 'react'
import { useLocalStorage } from '@hooks'

export const useToggleLocalStorage = key => {
  const [value, setValue] = useLocalStorage(key, false)
  const toggleValue = useCallback(() => setValue(!value), [value])

  return {
    enabled: value,
    toggle: toggleValue,
  }
}

