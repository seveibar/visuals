import React, { useState, useEffect } from "react"

export default (nextValue, initialValue) => {
  const [useNextValueOnly, setUseNextValueOnly] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setUseNextValueOnly(true)
    }, 50)
  }, [nextValue, setUseNextValueOnly])

  return useNextValueOnly ? nextValue : initialValue
}
