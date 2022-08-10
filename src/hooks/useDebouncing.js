import { useState, useEffect } from "react"

export function useDebouncing(query, onChanged, time) {
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    if (timer) {
      clearTimeout(timer)
      setTimer(null)
    }
    setTimer(
      setTimeout(() => {
        onChanged()
      }, time)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])
}
