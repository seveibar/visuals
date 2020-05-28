import React, { useState, useReducer, useEffect } from "react"

export default (totalStages, stageDuration) => {
  const [stage, incStage] = useReducer((state) => (state + 1) % totalStages, 0)

  useEffect(() => {
    const interval = setInterval(() => incStage(), stageDuration)
    return () => clearInterval(interval)
  }, [incStage, stageDuration])

  return stage
}
