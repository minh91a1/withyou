import { useState, useEffect } from "react"

export function useDebouncing(query, onChanged) {
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    if (timer) {
      clearTimeout(timer)
      setTimer(null)
    }
    setTimer(
      setTimeout(() => {
        onChanged()
      }, 700)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])
}
